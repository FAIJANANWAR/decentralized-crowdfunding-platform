// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Campaign is ReentrancyGuard {
    struct Milestone {
        string description;
        uint256 amount;
        uint256 approvalCount;
        bool isCompleted;
        bool isWithdrawn;
        mapping(address => bool) voters;
    }

    address public creator;
    string public title;
    string public description;
    uint256 public fundingGoal;
    uint256 public deadline;
    uint256 public totalRaised;
    uint256 public contributorsCount;

    mapping(address => uint256) public contributions;
    Milestone[] public milestones;

    event Donated(address indexed contributor, uint256 amount);
    event MilestoneCreated(string description, uint256 amount);
    event MilestoneVoted(uint256 milestoneIndex, address indexed voter);
    event MilestoneWithdrawn(uint256 milestoneIndex, uint256 amount);

    modifier onlyCreator() {
        require(msg.sender == creator, "Only creator can call this");
        _;
    }

    constructor(
        address _creator,
        string memory _title,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _duration
    ) {
        creator = _creator;
        title = _title;
        description = _description;
        fundingGoal = _fundingGoal;
        deadline = block.timestamp + _duration;
    }

    function donate() external payable nonReentrant {
        require(block.timestamp < deadline, "Campaign deadline passed");
        require(msg.value > 0, "Contribution must be greater than 0");

        if (contributions[msg.sender] == 0) {
            contributorsCount++;
        }

        contributions[msg.sender] += msg.value;
        totalRaised += msg.value;

        emit Donated(msg.sender, msg.value);
    }

    function createMilestone(string memory _description, uint256 _amount) external onlyCreator {
        require(_amount <= address(this).balance, "Amount exceeds balance");
        
        Milestone storage newMilestone = milestones.push();
        newMilestone.description = _description;
        newMilestone.amount = _amount;
        newMilestone.approvalCount = 0;
        newMilestone.isCompleted = false;
        newMilestone.isWithdrawn = false;

        emit MilestoneCreated(_description, _amount);
    }

    function voteOnMilestone(uint256 _index) external {
        require(contributions[msg.sender] > 0, "Only contributors can vote");
        Milestone storage milestone = milestones[_index];
        require(!milestone.voters[msg.sender], "Already voted");
        require(!milestone.isWithdrawn, "Milestone already withdrawn");

        milestone.voters[msg.sender] = true;
        milestone.approvalCount++;

        emit MilestoneVoted(_index, msg.sender);
    }

    function withdrawMilestone(uint256 _index) external onlyCreator nonReentrant {
        Milestone storage milestone = milestones[_index];
        require(!milestone.isWithdrawn, "Already withdrawn");
        require(milestone.approvalCount > contributorsCount / 2, "Not enough approvals");
        require(address(this).balance >= milestone.amount, "Insufficient balance");

        milestone.isWithdrawn = true;
        milestone.isCompleted = true;
        payable(creator).transfer(milestone.amount);

        emit MilestoneWithdrawn(_index, milestone.amount);
    }

    function getSummary() external view returns (
        address, string memory, string memory, uint256, uint256, uint256, uint256, uint256
    ) {
        return (
            creator,
            title,
            description,
            fundingGoal,
            deadline,
            totalRaised,
            contributorsCount,
            milestones.length
        );
    }

    function getMilestonesCount() external view returns (uint256) {
        return milestones.length;
    }
}

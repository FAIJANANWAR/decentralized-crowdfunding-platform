// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Campaign.sol";

contract CrowdFundFactory {
    address[] public deployedCampaigns;

    event CampaignCreated(address campaignAddress, address creator, string title);

    function createCampaign(
        string memory title,
        string memory description,
        uint256 fundingGoal,
        uint256 duration
    ) external {
        Campaign newCampaign = new Campaign(
            msg.sender,
            title,
            description,
            fundingGoal,
            duration
        );
        deployedCampaigns.push(address(newCampaign));
        emit CampaignCreated(address(newCampaign), msg.sender, title);
    }

    function getDeployedCampaigns() external view returns (address[] memory) {
        return deployedCampaigns;
    }
}

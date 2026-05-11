import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Seeding with account:", deployer.address);

  const Factory = await ethers.getContractFactory("CrowdFundFactory");
  const factory = await Factory.attach(process.env.NEXT_PUBLIC_FACTORY_ADDRESS!) as any;

  const campaigns = [
    {
      title: "SolarGrid: Decentralized Energy",
      description: "Building a p2p energy sharing platform for smart cities using blockchain technology.",
      goal: ethers.parseEther("10"),
      duration: 30 * 24 * 60 * 60
    },
    {
      title: "EcoWater AI",
      description: "Monitoring and optimizing water usage in agriculture with IoT and decentralized rewards.",
      goal: ethers.parseEther("5"),
      duration: 15 * 24 * 60 * 60
    }
  ];

  for (const camp of campaigns) {
    console.log(`Creating campaign: ${camp.title}`);
    const tx = await factory.createCampaign(
      camp.title,
      camp.description,
      camp.goal,
      camp.duration
    );
    await tx.wait();
  }

  console.log("Seeding complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import pkg from "hardhat";

const { ethers } = pkg;

async function main() {
  console.log("Deploying CrowdFundFactory...");

  const Factory = await ethers.getContractFactory("CrowdFundFactory");
  const factory = await Factory.deploy();

  await factory.waitForDeployment();

  const address = await factory.getAddress();
  console.log(`CrowdFundFactory deployed to: ${address}`);
  
  console.log("--- Deployment Summary ---");
  console.log(`Factory Address: ${address}`);
  console.log("--------------------------");
  console.log("Update your .env file with NEXT_PUBLIC_FACTORY_ADDRESS=" + address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

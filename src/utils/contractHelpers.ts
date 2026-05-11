import { ethers } from 'ethers';

// These will be available after hardhat compilation
import FactoryABI from '@/artifacts/contracts/CrowdFundFactory.sol/CrowdFundFactory.json';
import CampaignABI from '@/artifacts/contracts/Campaign.sol/Campaign.json';

export const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS || "";

export const getFactoryContract = (signerOrProvider: any) => {
  return new ethers.Contract(FACTORY_ADDRESS, FactoryABI.abi, signerOrProvider);
};

export const getCampaignContract = (address: string, signerOrProvider: any) => {
  return new ethers.Contract(address, CampaignABI.abi, signerOrProvider);
};

export const formatEth = (wei: any) => {
  if (!wei) return "0";
  return ethers.formatEther(wei);
};

export const parseEth = (ether: string) => {
  return ethers.parseEther(ether);
};

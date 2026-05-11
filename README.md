# FundChain - Decentralized Crowdfunding Platform

FundChain is a premium, transparent, milestone-based decentralized crowdfunding platform built on the Ethereum blockchain. It empowers creators to raise funds while providing backers with unprecedented security through a decentralized voting system for fund releases.

![Banner](https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000)

## Features

- **🚀 Transparent Campaigns**: Create and manage crowdfunding campaigns directly on the blockchain.
- **🛡️ Milestone-Based Release**: Funds are locked in smart contracts and released only when milestones are approved by backers.
- **🗳️ Decentralized Voting**: Backers have voting power proportional to their contribution to approve or reject fund withdrawals.
- **📊 Real-time Tracking**: Monitor funding progress, contributor counts, and campaign deadlines in real-time.
- **💎 Premium Dark UI**: A modern, responsive dashboard inspired by top-tier blockchain platforms like Vercel and Linear.
- **⚡ MetaMask Integration**: Seamless wallet connection and transaction management.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Smart Contracts**: Solidity, Hardhat, Ethers.js
- **Network**: Sepolia Testnet
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask extension
- Some Sepolia ETH (from a faucet)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd decentralized-crowdfunding-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   SEPOLIA_RPC_URL=your_sepolia_rpc_url
   PRIVATE_KEY=your_private_key
   NEXT_PUBLIC_FACTORY_ADDRESS=deployed_factory_address
   ```

### Smart Contract Deployment

1. Compile the contracts:
   ```bash
   npx hardhat compile
   ```

2. Deploy to Sepolia:
   ```bash
   npx hardhat run scripts/deploy.ts --network sepolia
   ```

### Running Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contract Architecture

- `CrowdFundFactory.sol`: Factory contract to deploy individual campaign contracts.
- `Campaign.sol`: Logic for donations, milestone creation, voting, and secure withdrawals.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

# 🚀 FundChain — Decentralized Crowdfunding Platform

A modern Web3 crowdfunding platform built with **Solidity, Hardhat, Next.js, TypeScript, and Ethers.js** that enables transparent blockchain-based fundraising with milestone-based fund release and decentralized contributor voting.

Designed with a premium dark UI inspired by modern SaaS and Web3 products like Vercel, Linear, and Rainbow Wallet.

---

## 🌐 Live Demo

🔗 https://decentralized-crowdfunding-platform-umber.vercel.app/

---

## 📦 GitHub Repository

🔗 https://github.com/FAIJANANWAR/decentralized-crowdfunding-platform

---

# ✨ Features

### 🔐 Web3 Authentication
- MetaMask wallet connection
- Secure blockchain interaction
- Wallet-based campaign ownership

### 💸 Decentralized Crowdfunding
- Create fundraising campaigns on-chain
- Donate ETH securely
- Transparent transaction flow

### 🗳️ Milestone-Based Voting
- Campaign creators request withdrawals
- Contributors vote approve/reject
- Funds released only after majority approval

### 📊 Real-Time Campaign Tracking
- Funding progress bars
- Goal completion percentage
- Campaign deadline tracking
- Contributor count

### 🎨 Premium UI/UX
- Futuristic dark theme
- Glassmorphism cards
- Smooth animations with Framer Motion
- Fully responsive mobile-first design

### ⚡ Smart Contract Security
- Reentrancy protection
- Secure ETH handling
- Transparent blockchain storage

---

# 🛠️ Tech Stack

## Frontend
- Next.js 16
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Ethers.js

## Blockchain
- Solidity
- Hardhat
- Sepolia Testnet
- MetaMask

## Deployment
- Vercel

---

# 🧠 Smart Contract Architecture

## `CrowdFundFactory.sol`
Factory contract used to deploy and manage crowdfunding campaigns.

## `Campaign.sol`
Handles:
- donations
- contributor tracking
- milestone requests
- voting logic
- secure fund withdrawals

---

# 📂 Project Structure

```bash
src/
 ├── app/
 ├── components/
 ├── context/
 ├── hooks/
 ├── lib/
 ├── utils/
 └── artifacts/

contracts/
 ├── Campaign.sol
 └── CrowdFundFactory.sol

scripts/
 ├── deploy.ts
 └── seed.ts
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/FAIJANANWAR/decentralized-crowdfunding-platform.git
```

---

## 2️⃣ Navigate to Project

```bash
cd decentralized-crowdfunding-platform
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
SEPOLIA_RPC_URL=your_alchemy_rpc_url

PRIVATE_KEY=your_wallet_private_key

NEXT_PUBLIC_FACTORY_ADDRESS=your_deployed_factory_address
```

---

# ⛓️ Smart Contract Deployment

## Compile Contracts

```bash
npx hardhat compile
```

## Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

---

# ▶️ Run Locally

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

# 🏗️ Production Build

```bash
npm run build
```

---

# 📸 Screenshots

## 🖥️ Homepage
_Add homepage screenshot here_

## 📊 Dashboard
_Add dashboard screenshot here_

## 💰 Campaign Details
_Add campaign details screenshot here_

## 📱 Mobile Responsive View
_Add mobile screenshot here_

---

# 🚀 Future Improvements

- IPFS image uploads
- DAO governance integration
- NFT contributor rewards
- Multi-wallet support
- Advanced analytics dashboard
- Real-time notifications
- Campaign categories & filters
- On-chain reputation system

---

# 📚 What I Learned

This project helped me gain hands-on experience with:

- Smart contract development
- Web3 wallet integration
- Blockchain architecture
- Full-stack decentralized applications
- Smart contract deployment workflows
- TypeScript production builds
- Vercel deployment

---

# 📄 License

MIT License

---

# 👨‍💻 Author

## Faijan Anwar

- MCA Student
- Full Stack Developer
- Web3 & Blockchain Enthusiast

### GitHub
https://github.com/FAIJANANWAR

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.

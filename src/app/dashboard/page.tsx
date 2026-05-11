"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '@/context/Web3Context';
import { getFactoryContract, getCampaignContract, formatEth } from '@/utils/contractHelpers';
import { CampaignCard } from '@/components/CampaignCard';
import { LayoutDashboard, Plus, Wallet as WalletIcon, History, PieChart } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { account, signer, provider, connectWallet } = useWeb3();
  const [myCampaigns, setMyCampaigns] = useState<any[]>([]);
  const [backedCampaigns, setBackedCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const fetchData = async () => {
      if (!account || !provider) return;

      try {
        setIsLoading(true);
        // Get balance
        const bal = await provider.getBalance(account);
        setBalance(formatEth(bal));

        // Get factory to find campaigns
        const factory = getFactoryContract(provider);
        const allCampaigns = await factory.getDeployedCampaigns();

        const myCamps = [];
        const backedCamps = [];

        for (const addr of allCampaigns) {
          try {
            const contract = getCampaignContract(addr, provider);
            const summary = await contract.getSummary();
            const creator = summary[0];
            const contribution = await contract.contributions(account);

            const campData = {
              id: addr,
              creator,
              title: summary[1],
              description: summary[2],
              goal: formatEth(summary[3]),
              deadline: Number(summary[4]),
              raised: formatEth(summary[5]),
              contributors: Number(summary[6]),
              daysLeft: Math.max(0, Math.ceil((Number(summary[4]) - Date.now() / 1000) / 86400))
            };

            if (creator.toLowerCase() === account.toLowerCase()) {
              myCamps.push(campData);
            }
            if (contribution > 0n) { // Ethers v6 returns BigInt
              backedCamps.push(campData);
            }
          } catch (e) {
            console.error("Error fetching campaign data for", addr, e);
          }
        }

        setMyCampaigns(myCamps);
        setBackedCampaigns(backedCamps);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [account, provider]);

  if (!account) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <LayoutDashboard className="w-10 h-10 text-brand-blue" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gradient">Welcome to your Dashboard</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">Connect your wallet to track your campaigns, contributions, and voting history.</p>
        <button onClick={connectWallet} className="blue-gradient px-8 py-4 rounded-2xl font-bold blue-glow transition-transform hover:scale-105">
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gradient">Dashboard</h1>
          <p className="text-gray-400">Manage your campaigns and track your impact.</p>
        </div>
        <Link href="/campaigns/create" className="blue-gradient px-6 py-3 rounded-xl font-bold flex items-center space-x-2 blue-glow w-fit">
          <Plus className="w-5 h-5" />
          <span>New Campaign</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-brand-blue">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Wallet Balance</span>
            <WalletIcon className="w-5 h-5 text-brand-blue" />
          </div>
          <div className="text-3xl font-bold">{parseFloat(balance).toFixed(4)} ETH</div>
        </div>
        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Active Campaigns</span>
            <PieChart className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold">{myCampaigns.length}</div>
        </div>
        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-green-500">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Backed</span>
            <History className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold">{backedCampaigns.length}</div>
        </div>
      </div>

      <div className="space-y-16">
        {/* My Campaigns */}
        <section>
          <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3">
            <div className="w-8 h-8 bg-brand-blue/10 rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-brand-blue" />
            </div>
            <span>My Campaigns</span>
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="glass-card h-80 animate-pulse bg-white/5 rounded-3xl" />)}
            </div>
          ) : myCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {myCampaigns.map((camp) => (
                <CampaignCard key={camp.id} {...camp} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center rounded-3xl border border-white/5">
              <p className="text-gray-500 mb-6">You haven't created any campaigns yet.</p>
              <Link href="/campaigns/create" className="text-brand-blue font-bold hover:underline">
                Start your first campaign →
              </Link>
            </div>
          )}
        </section>

        {/* Backed Campaigns */}
        <section>
          <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
              <History className="w-4 h-4 text-green-500" />
            </div>
            <span>Backed Campaigns</span>
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <div key={i} className="glass-card h-80 animate-pulse bg-white/5 rounded-3xl" />)}
            </div>
          ) : backedCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {backedCampaigns.map((camp) => (
                <CampaignCard key={camp.id} {...camp} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-12 text-center rounded-3xl border border-white/5">
              <p className="text-gray-500 mb-6">You haven't backed any campaigns yet.</p>
              <Link href="/campaigns" className="text-brand-blue font-bold hover:underline">
                Discover campaigns →
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '@/context/Web3Context';
import { getCampaignContract, formatEth, parseEth } from '@/utils/contractHelpers';
import { Users, Clock, Target, Shield, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CampaignDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { account, signer, provider } = useWeb3();
  const [campaign, setCampaign] = useState<any>(null);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [donationAmount, setDonationAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDonating, setIsDonating] = useState(false);

  const fetchCampaignData = async () => {
    if (!provider || !id) return;
    
    // Check if ID is a valid Ethereum address
    if (!/^0x[a-fA-F0-9]{40}$/.test(id)) {
      setIsLoading(false);
      setCampaign(null);
      return;
    }

    try {
      const contract = getCampaignContract(id as string, provider);
      const summary = await contract.getSummary();
      
      setCampaign({
        creator: summary[0],
        title: summary[1],
        description: summary[2],
        goal: formatEth(summary[3]),
        deadline: Number(summary[4]),
        raised: formatEth(summary[5]),
        contributors: Number(summary[6]),
        milestonesCount: Number(summary[7]),
        daysLeft: Math.max(0, Math.ceil((Number(summary[4]) - Date.now() / 1000) / 86400))
      });

      const mCount = Number(summary[7]);
      const mList = [];
      for (let i = 0; i < mCount; i++) {
        const m = await contract.milestones(i);
        mList.push({
          description: m[0],
          amount: formatEth(m[1]),
          approvals: Number(m[2]),
          isCompleted: m[3],
          isWithdrawn: m[4]
        });
      }
      setMilestones(mList);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaignData();
  }, [id, provider]);

  const handleDonate = async () => {
    if (!signer || !donationAmount) return;
    try {
      setIsDonating(true);
      const contract = getCampaignContract(id as string, signer);
      const tx = await contract.donate({ value: parseEth(donationAmount) });
      await tx.wait();
      setDonationAmount("");
      fetchCampaignData();
    } catch (err) {
      console.error(err);
      alert("Donation failed");
    } finally {
      setIsDonating(false);
    }
  };

  const handleVote = async (index: number) => {
    if (!signer) return;
    try {
      const contract = getCampaignContract(id as string, signer);
      const tx = await contract.voteOnMilestone(index);
      await tx.wait();
      fetchCampaignData();
    } catch (err) {
      console.error(err);
      alert("Voting failed. Make sure you are a contributor.");
    }
  };

  if (isLoading) return <div className="max-w-7xl mx-auto px-4 py-20 text-center">Loading...</div>;
  if (!campaign) return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-red-500">Campaign not found</div>;

  const progress = (parseFloat(campaign.raised) / parseFloat(campaign.goal)) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/campaigns" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8 group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Explore</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">{campaign.title}</h1>
            <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap">
              {campaign.description}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <Shield className="w-6 h-6 text-brand-blue" />
              <span>Project Milestones</span>
            </h2>
            <div className="space-y-6">
              {milestones.length > 0 ? milestones.map((m, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl relative overflow-hidden border border-white/5">
                  {m.isWithdrawn && (
                    <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                      Completed & Withdrawn
                    </div>
                  )}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg">{m.description}</h4>
                      <p className="text-gray-400 text-sm">Release Amount: <span className="text-white font-medium">{m.amount} ETH</span></p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 uppercase mb-1">Approvals</div>
                      <div className="text-xl font-bold text-brand-blue">{m.approvals} / {campaign.contributors}</div>
                    </div>
                  </div>
                  
                  {!m.isWithdrawn && account && (
                    <div className="mt-6 flex items-center justify-between">
                       <button 
                        onClick={() => handleVote(i)}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-xl text-sm font-bold transition-all"
                       >
                         Approve Release
                       </button>
                       {account.toLowerCase() === campaign.creator.toLowerCase() && m.approvals > campaign.contributors / 2 && (
                          <button className="blue-gradient px-6 py-2 rounded-xl text-sm font-bold">
                            Withdraw Funds
                          </button>
                       )}
                    </div>
                  )}
                </div>
              )) : (
                <div className="glass-card p-8 text-center text-gray-500 rounded-2xl border-dashed border-2 border-white/5">
                  No milestones added yet.
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-8 rounded-3xl sticky top-28 border-blue-500/20">
            <div className="space-y-6">
              <div>
                <div className="flex items-end justify-between mb-2">
                  <span className="text-3xl font-bold">{campaign.raised} ETH</span>
                  <span className="text-gray-400 text-sm">raised of {campaign.goal} ETH</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, progress)}%` }}
                    className="h-full blue-gradient shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl">
                  <Users className="w-5 h-5 text-brand-blue mb-2" />
                  <div className="text-xl font-bold">{campaign.contributors}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-tighter">Backers</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl">
                  <Clock className="w-5 h-5 text-purple-500 mb-2" />
                  <div className="text-xl font-bold">{campaign.daysLeft}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-tighter">Days Left</div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-400 block mb-2">Contribution Amount (ETH)</label>
                  <input 
                    type="number"
                    step="0.01"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue"
                    placeholder="0.1"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleDonate}
                  disabled={isDonating || !account}
                  className="w-full blue-gradient text-white py-4 rounded-2xl font-bold blue-glow disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isDonating ? "Processing..." : account ? "Back this project" : "Connect Wallet to Back"}
                </button>
              </div>

              <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Your funds are secured by smart contracts. You can vote on milestones to ensure proper fund allocation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

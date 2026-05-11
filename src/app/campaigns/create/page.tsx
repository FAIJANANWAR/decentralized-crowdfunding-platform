"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '@/context/Web3Context';
import { getFactoryContract, parseEth } from '@/utils/contractHelpers';
import { Rocket, Target, Calendar, Type, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateCampaign() {
  const { signer, account, connectWallet } = useWeb3();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    duration: '30', // days
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signer) return;

    try {
      setIsLoading(true);
      const factory = getFactoryContract(signer);
      const goalInWei = parseEth(formData.goal);
      const durationInSeconds = parseInt(formData.duration) * 24 * 60 * 60;

      const tx = await factory.createCampaign(
        formData.title,
        formData.description,
        goalInWei,
        durationInSeconds
      );

      await tx.wait();
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert("Failed to create campaign");
    } finally {
      setIsLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-6">Connect your wallet to start a campaign</h1>
        <button onClick={connectWallet} className="blue-gradient px-8 py-3 rounded-xl font-bold">
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-12"
      >
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 blue-gradient rounded-2xl flex items-center justify-center blue-glow">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Launch a Campaign</h1>
            <p className="text-gray-400">Bring your idea to life with decentralized funding.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
              <Type className="w-4 h-4 text-brand-blue" />
              <span>Campaign Title</span>
            </label>
            <input
              type="text"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors"
              placeholder="e.g. Project Solaris: Decentralized Energy"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-brand-blue" />
              <span>Description</span>
            </label>
            <textarea
              required
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors"
              placeholder="Describe your project, goals, and how the funds will be used..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <Target className="w-4 h-4 text-brand-blue" />
                <span>Funding Goal (ETH)</span>
              </label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors"
                placeholder="0.00"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-brand-blue" />
                <span>Duration (Days)</span>
              </label>
              <input
                type="number"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue transition-colors"
                placeholder="30"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full blue-gradient text-white py-4 rounded-xl font-bold text-lg mt-8 blue-glow disabled:opacity-50 transition-all active:scale-[0.98]"
          >
            {isLoading ? 'Processing Transaction...' : 'Deploy Campaign Contract'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

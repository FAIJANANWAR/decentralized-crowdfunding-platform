"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '@/context/Web3Context';
import { getFactoryContract, getCampaignContract, formatEth } from '@/utils/contractHelpers';
import { CampaignCard } from '@/components/CampaignCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export default function ExploreCampaigns() {
  const { provider } = useWeb3();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!provider) return;

      try {
        setIsLoading(true);
        const factory = getFactoryContract(provider);
        const addresses = await factory.getDeployedCampaigns();
        
        const camps = [];
        for (const addr of addresses) {
          try {
            const contract = getCampaignContract(addr, provider);
            const summary = await contract.getSummary();
            camps.push({
              id: addr,
              creator: summary[0],
              title: summary[1],
              description: summary[2],
              goal: formatEth(summary[3]),
              deadline: Number(summary[4]),
              raised: formatEth(summary[5]),
              contributors: Number(summary[6]),
              daysLeft: Math.max(0, Math.ceil((Number(summary[4]) - Date.now() / 1000) / 86400))
            });
          } catch (e) {
             console.error("Error fetching campaign", addr, e);
          }
        }
        setCampaigns(camps);
        setFilteredCampaigns(camps);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [provider]);

  useEffect(() => {
    const results = campaigns.filter(c => 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCampaigns(results);
  }, [searchTerm, campaigns]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gradient">Explore Campaigns</h1>
          <p className="text-gray-400">Support the next generation of decentralized innovation.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text"
              placeholder="Search projects..."
              className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-brand-blue w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-all">
            <SlidersHorizontal className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="glass-card h-96 animate-pulse bg-white/5 rounded-3xl border border-white/5" />
          ))}
        </div>
      ) : filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((camp) => (
            <CampaignCard key={camp.id} {...camp} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-card rounded-3xl border-dashed border-2 border-white/5">
          <p className="text-gray-500 text-lg">No campaigns found matching your search.</p>
        </div>
      )}
    </div>
  );
}

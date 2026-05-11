"use client";

import { motion } from 'framer-motion';
import { Users, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  raised: string;
  goal: string;
  contributors: number;
  daysLeft: number;
  imageUrl?: string;
  category?: string;
}

export const CampaignCard = ({
  id,
  title,
  description,
  raised,
  goal,
  contributors,
  daysLeft,
  imageUrl,
  category = "Technology"
}: CampaignCardProps) => {
  const percentage = Math.min(100, (parseFloat(raised) / parseFloat(goal)) * 100);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden group cursor-pointer"
    >
      <Link href={`/campaigns/${id}`}>
        <div className="h-48 bg-white/5 relative overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
               <span className="text-4xl font-bold text-white/10 uppercase">{title.slice(0, 2)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            {category}
          </div>
          <div className="absolute bottom-4 right-4 w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors line-clamp-1">{title}</h3>
          <p className="text-gray-400 text-sm md:text-base mb-8 line-clamp-2 leading-relaxed">
            {description}
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1">Raised</span>
                <span className="text-white text-lg font-black">{raised} ETH</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1">Goal</span>
                <span className="text-gray-400 text-lg font-bold">{goal} ETH</span>
              </div>
            </div>
            
            <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" 
              />
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-500/70" />
                <span className="font-medium text-gray-400">{contributors} Backers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-purple-500/70" />
                <span className="font-medium text-gray-400">{daysLeft} Days left</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

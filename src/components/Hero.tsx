"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-20">
      {/* Background glow elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      </div>

      <div className="max-container w-full relative">
        <div className="min-h-[70vh] flex items-center justify-center py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full mb-10 backdrop-blur-md">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,1)]" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Protocol Live on Sepolia</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-gradient">
              Fund the Future <br /> 
              <span className="text-white">With Trust.</span>
            </h1>
            
            <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-14 leading-relaxed font-medium">
              The first milestone-based crowdfunding platform where donors have absolute control over fund releases.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/campaigns" className="group w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg border border-white/10 transition-all flex items-center justify-center space-x-3 hover:border-blue-500/50">
                <span>Explore Projects</span>
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1 text-blue-500" />
              </Link>
              <Link href="/campaigns/create" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg border border-white/10 transition-all hover:border-purple-500/50">
                Launch Campaign
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Feature stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
          {[
            { icon: Shield, title: "Secure Voting", desc: "Backers have the power to approve or reject milestone fund releases." },
            { icon: Zap, title: "Instant Funding", desc: "Zero intermediaries. Funds go directly from contributors to the campaign contract." },
            { icon: BarChart3, title: "Real-time Tracking", desc: "Transparent progress tracking and transaction history on the blockchain." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass-card p-8 rounded-3xl hover:border-blue-500/50"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

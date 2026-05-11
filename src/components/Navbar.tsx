"use client";

import Link from 'next/link';
import { useWeb3 } from '@/context/Web3Context';
import { Wallet, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const { account, connectWallet, isConnecting } = useWeb3();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 transition-transform group-hover:scale-110">
                <span className="text-white font-black text-2xl">F</span>
              </div>
              <span className="text-white font-black text-2xl tracking-widest hidden sm:block ml-2">
                FUND<span className="text-blue-500">CHAIN</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-12">
              <Link href="/campaigns" className="text-gray-400 hover:text-white font-semibold transition-colors">Explore</Link>
              <Link href="/campaigns/create" className="text-gray-400 hover:text-white font-semibold transition-colors">Start a Campaign</Link>
              <Link href="/dashboard" className="text-gray-400 hover:text-white font-semibold transition-colors">Dashboard</Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {account ? (
              <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-mono text-gray-200">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="bg-white/5 hover:bg-white/10 text-white px-7 py-3 rounded-2xl font-bold border border-white/10 transition-all active:scale-95 disabled:opacity-50 flex items-center space-x-3"
              >
                <Wallet className="w-4 h-4 text-blue-500" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-nav absolute top-20 left-0 right-0 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/campaigns" className="block px-3 py-2 text-gray-300 hover:text-white">Explore</Link>
            <Link href="/campaigns/create" className="block px-3 py-2 text-gray-300 hover:text-white">Start a Campaign</Link>
            <Link href="/dashboard" className="block px-3 py-2 text-gray-300 hover:text-white">Dashboard</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

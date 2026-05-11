"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  chainId: number | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType>({
  account: null,
  provider: null,
  signer: null,
  chainId: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnecting: false,
  error: null,
});

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsConnecting(true);
        setError(null);
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await browserProvider.send("eth_requestAccounts", []);
        const network = await browserProvider.getNetwork();
        const browserSigner = await browserProvider.getSigner();

        setAccount(accounts[0]);
        setProvider(browserProvider);
        setSigner(browserSigner);
        setChainId(Number(network.chainId));

        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            setAccount(null);
          }
        });

        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });

      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to connect wallet");
      } finally {
        setIsConnecting(false);
      }
    } else {
      setError("Please install MetaMask");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const checkConnection = async () => {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await browserProvider.listAccounts();
        if (accounts.length > 0) {
          const network = await browserProvider.getNetwork();
          const browserSigner = await browserProvider.getSigner();
          setAccount(accounts[0].address);
          setProvider(browserProvider);
          setSigner(browserSigner);
          setChainId(Number(network.chainId));
        }
      };
      checkConnection();
    }
  }, []);

  return (
    <Web3Context.Provider value={{
      account,
      provider,
      signer,
      chainId,
      connectWallet,
      disconnectWallet,
      isConnecting,
      error,
    }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);

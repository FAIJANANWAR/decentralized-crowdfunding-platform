import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/context/Web3Context";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FundChain | Decentralized Crowdfunding",
  description: "A transparent milestone-based decentralized crowdfunding platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-brand-dark text-white min-h-screen flex flex-col`}>
        <Web3Provider>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <footer className="border-t border-white/5 py-12 bg-brand-dark mt-20">
            <div className="max-container text-center text-gray-500 text-sm">
              <p className="font-medium tracking-wide">&copy; 2026 FundChain Protocol. Built for a decentralized future.</p>
            </div>
          </footer>
        </Web3Provider>
      </body>
    </html>
  );
}

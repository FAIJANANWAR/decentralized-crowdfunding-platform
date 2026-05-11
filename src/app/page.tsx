import { Hero } from "@/components/Hero";
import { FeaturedCampaigns } from "@/components/FeaturedCampaigns";
import { Stats } from "@/components/Stats";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      <Hero />
      
      <section className="max-container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold mb-3 text-gradient">Featured Campaigns</h2>
            <p className="text-gray-400 text-lg">Discover the most promising decentralized projects.</p>
          </div>
          <Link href="/campaigns" className="text-blue-500 font-bold hover:text-blue-400 transition-colors flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <FeaturedCampaigns />
      </section>

      <section className="bg-white/[0.02] py-24 border-y border-white/5">
        <div className="max-container">
          <Stats />
        </div>
      </section>
    </div>
  );
}

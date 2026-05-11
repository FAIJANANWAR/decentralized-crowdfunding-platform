"use client";

import { CampaignCard } from './CampaignCard';

export const FeaturedCampaigns = () => {
  const dummyCampaigns = [
    {
      id: "0x1234567890123456789012345678901234567891",
      title: "SolarGrid: Decentralized Energy",
      description: "Building a p2p energy sharing platform for smart cities using blockchain technology.",
      raised: "45.5",
      goal: "100",
      contributors: 124,
      daysLeft: 12,
      category: "Sustainability",
      imageUrl: "/solar.png"
    },
    {
      id: "0x1234567890123456789012345678901234567892",
      title: "EcoWater AI",
      description: "Monitoring and optimizing water usage in agriculture with IoT and decentralized rewards.",
      raised: "12.8",
      goal: "50",
      contributors: 45,
      daysLeft: 24,
      category: "Environment"
    },
    {
      id: "0x1234567890123456789012345678901234567893",
      title: "MetaHealth Records",
      description: "A secure, patient-owned health record system built on Ethereum for global accessibility.",
      raised: "85.0",
      goal: "80",
      contributors: 312,
      daysLeft: 5,
      category: "Healthcare"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {dummyCampaigns.map((camp) => (
        <CampaignCard key={camp.id} {...camp} />
      ))}
    </div>
  );
};

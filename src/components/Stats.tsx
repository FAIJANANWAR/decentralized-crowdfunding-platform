"use client";

import { motion } from 'framer-motion';

export const Stats = () => {
  const stats = [
    { label: 'Total Funded', value: '$4.2M+' },
    { label: 'Campaigns', value: '150+' },
    { label: 'Backers', value: '12k+' },
    { label: 'Success Rate', value: '98%' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="text-center"
        >
          <div className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">{stat.value}</div>
          <div className="text-gray-500 text-xs uppercase tracking-widest font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

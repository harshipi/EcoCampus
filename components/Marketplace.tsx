
import React from 'react';
import { Zap, ArrowRight, Gift, Snowflake, Zap as PowerIcon } from 'lucide-react';
import { MarketplaceItem } from '../types';

const ITEMS: MarketplaceItem[] = [
  { id: '1', name: 'Cafeteria $5 Discount', description: 'Redeem for any meal at Main Cafeteria or The Union.', price: 500, category: 'cafeteria', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=400&auto=format&fit=crop' },
  { id: 'p1', name: 'Streak Freeze', description: 'Maintain your eco-streak even if you forget to log for 24 hours.', price: 300, category: 'powerup', image: 'https://images.unsplash.com/photo-1478144592103-258228227ec3?q=80&w=400&auto=format&fit=crop' },
  { id: '2', name: 'Plant 10 Real Trees', description: 'Certified planting via our partner GreenCampus NGO.', price: 2000, category: 'donation', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400&auto=format&fit=crop' },
  { id: 'p2', name: '2x XP Multiplier', description: 'Earn double XP for all eco-actions for the next 48 hours.', price: 600, category: 'powerup', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400&auto=format&fit=crop' },
  { id: '3', name: 'NFT: Earth Sentinel', description: 'Rare limited edition badge for your global profile.', price: 1200, category: 'nft', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&auto=format&fit=crop' },
  { id: '4', name: 'EcoPulse Tote Bag', description: 'Made from 100% recycled campus plastic waste.', price: 800, category: 'merch', image: 'https://images.unsplash.com/photo-1597484662317-9bd76add240a?q=80&w=400&auto=format&fit=crop' },
];

const Marketplace: React.FC<{ credits: number, onPurchase: (cost: number) => void }> = ({ credits, onPurchase }) => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto pb-24 md:pb-10 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter">Carbon Rewards</h2>
            <p className="text-white/40 font-medium">Redeem credits for sustainable perks & global impact</p>
          </div>
          <div className="glass-nav px-6 py-3 flex items-center gap-3 text-white border-white/20">
             <Zap size={24} className="fill-[#00ff88] text-[#00ff88]" />
             <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-wider opacity-60">Balance</span>
               <span className="text-xl font-bold">{credits} Credits</span>
             </div>
          </div>
        </div>

        {/* Featured Banner */}
        <div className="glass-panel rounded-[3rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
          <div className="z-10 flex-1 space-y-4 text-center md:text-left">
             <div className="bg-[#00ff88]/20 text-[#00ff88] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border border-[#00ff88]/30">
               FEATURED ITEM
             </div>
             <h3 className="text-4xl font-extrabold tracking-tighter leading-tight">Streak Freeze Bundle</h3>
             <p className="text-white/60 max-w-md font-medium">Never lose your 100+ day streak again. Grab this bundle and protect your progress through exams.</p>
             <button 
               onClick={() => onPurchase(750)}
               disabled={credits < 750}
               className="btn-primary flex items-center gap-2 mx-auto md:mx-0 disabled:opacity-50"
             >
                Redeem 750 <Snowflake size={18} />
             </button>
          </div>
          <div className="z-10 hidden lg:block w-72 h-48 bg-white/5 rounded-3xl border border-white/10 p-6 backdrop-blur-md group-hover:scale-105 transition-transform duration-500">
             <div className="flex justify-between items-center mb-4 text-[#00ff88]">
               <Snowflake size={24} />
               <span className="text-[10px] font-black uppercase tracking-widest text-white/40">3x Shields</span>
             </div>
             <p className="text-sm font-medium text-white/80">"The ultimate safety net for active warriors."</p>
          </div>
          <div className="absolute right-[-10%] bottom-[-20%] w-96 h-96 bg-[#00ff88]/10 rounded-full blur-[100px] group-hover:bg-[#00ff88]/20 transition-all duration-1000" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ITEMS.map((item) => (
            <div key={item.id} className="glass-panel rounded-[2.5rem] overflow-hidden flex flex-col hover:bg-white/10 transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[#00ff88] tracking-widest border border-white/10">
                  {item.category.toUpperCase()}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold truncate">{item.name}</h3>
                  <p className="text-xs text-white/40 font-medium line-clamp-2 leading-relaxed">{item.description}</p>
                </div>
                <button 
                  onClick={() => credits >= item.price && onPurchase(item.price)}
                  disabled={credits < item.price}
                  className={`w-full py-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                    credits >= item.price 
                      ? 'bg-[#00ff88] text-black shadow-lg hover:scale-105 active:scale-95' 
                      : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                  }`}
                >
                  <Zap size={14} fill={credits >= item.price ? "black" : "none"} /> {item.price} CREDITS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;

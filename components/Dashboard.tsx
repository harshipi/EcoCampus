
import React, { useEffect, useState } from 'react';
import { TrendingDown, TreePine, Zap, Award, Share2, Flame, Sparkles, Clock, ArrowDownCircle, ShieldCheck } from 'lucide-react';
import { UserStats } from '../types';
import { getPredictiveInsights } from '../services/geminiService';

const Dashboard: React.FC<{ stats: UserStats, onStartScan?: () => void }> = ({ stats, onStartScan }) => {
  const [predictions, setPredictions] = useState<any>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const p = await getPredictiveInsights(stats);
        setPredictions(p);
      } catch (e) {
        console.error("Failed to load AI predictions", e);
      }
    };
    fetchPredictions();
  }, [stats]);

  return (
    <div className="flex flex-col min-h-full justify-between py-6 md:py-10 lg:py-16 gap-10 md:gap-16 animate-in fade-in duration-1000">
      
      <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 lg:gap-24">
        <div className="flex-1 space-y-8 lg:space-y-12 text-center lg:text-left">
          <h1 className="hero-text">
            Action <br />
            <span className="text-white/40 italic">That Drives</span> <br />
            Growth
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <button 
              onClick={onStartScan}
              className="btn-primary w-full sm:w-auto flex items-center gap-3"
            >
              Start Tracking <Flame size={20} />
            </button>
            <button 
              className="btn-secondary w-full sm:w-auto flex items-center gap-3"
            >
              Explore Impact
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center lg:items-end gap-8">
          <p className="sub-hero-text text-center lg:text-right">
            Turn your daily campus habits into meaningful eco-impact that scales. 
            Our AI approach blends community, trust, and real-time innovation—helping 
            students make better planetary decisions, faster.
          </p>
          
          <div className="hidden sm:flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            <div className="w-12 h-[1px] bg-white/20" /> Discover Stats <ArrowDownCircle size={16} className="animate-bounce" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <FeatureCard 
          title="Campus Sustainability" 
          description="Scale your carbon offset with precision and confidence across all university facilities." 
          icon={<ShieldCheck className="text-[#00ff88]" size={28} />}
        />
        <FeatureCard 
          title="Dynamic Streaks" 
          description="Protecting the planet while driving personal innovation in your daily routine." 
          icon={<Zap className="text-[#00ff88]" size={28} />}
        />
        <FeatureCard 
          title="Predictive AI" 
          description="Real-time predictions for your most efficient campus life based on habit data." 
          icon={<Sparkles className="text-[#00ff88]" size={28} />}
        />
        <FeatureCard 
          title="Community Power" 
          description="Join 5,000+ students in a collective push for zero campus waste." 
          icon={<Award className="text-[#00ff88]" size={28} />}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-20 py-8 border-t border-white/10">
        <StatRow label="Active Streak" value={`${stats.streak} Days`} />
        <StatRow label="Carbon Offset" value={`${stats.co2Saved}kg`} />
        <StatRow label="Global Rank" value={`#${stats.level}`} />
        <StatRow label="Eco Credits" value={stats.carbonCredits} />
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }: any) => (
  <div className="glass-panel p-8 lg:p-10 rounded-[2.5rem] space-y-6 hover:bg-white/10 transition-all cursor-default group border-white/10">
    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold tracking-tight">{title}</h3>
    <p className="text-[13px] text-white/60 leading-relaxed font-medium">
      {description}
    </p>
  </div>
);

const StatRow = ({ label, value }: any) => (
  <div className="space-y-1">
    <p className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.25em] text-white/30">{label}</p>
    <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tighter whitespace-nowrap">{value}</p>
  </div>
);

export default Dashboard;

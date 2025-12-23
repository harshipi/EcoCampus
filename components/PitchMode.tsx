
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Sparkles, Zap, Trophy, Leaf, Smartphone, Globe, BarChart3, Users, ShoppingBag } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: "Eco Campus",
    subtitle: "The Future of Collegiate Sustainability",
    content: "Empowering 50,000+ students to turn daily habits into planetary progress through Gemini-powered visual intelligence and circular economy mechanics.",
    icon: <Leaf className="text-[#00ff88]" size={48} />,
    color: "from-emerald-900/40 to-transparent"
  },
  {
    id: 2,
    title: "The Problem",
    subtitle: "The Invisibility of Campus Waste",
    content: "University dorms and facilities produce metric tons of preventable waste yearly. Students lack immediate data on their impact, leading to sustainability fatigue.",
    icon: <Globe className="text-red-400" size={48} />,
    color: "from-red-900/20 to-transparent"
  },
  {
    id: 3,
    title: "The Solution",
    subtitle: "A Unified Gamified Ecosystem",
    content: "We transition green living from a chore to a culture by gamifying real-world actions. Scan, Act, Earn, and Compete in one seamless mobile-first experience.",
    icon: <Smartphone className="text-[#00ff88]" size={48} />,
    color: "from-[#00ff88]/10 to-transparent"
  },
  {
    id: 4,
    title: "AI Visual Intelligence",
    subtitle: "The Eco-Scanner (Gemini 3 Flash)",
    content: "Snap a photo of any item—from a coffee cup to a textbook. Our AI provides instant carbon footprint data and hyper-local campus recycling instructions.",
    icon: <Sparkles className="text-blue-400" size={48} />,
    color: "from-blue-900/20 to-transparent"
  },
  {
    id: 5,
    title: "Social Gamification",
    subtitle: "Dorm Cups & Friend Streaks",
    content: "Residence halls compete for the 'Green Cup.' Snapchat-style streaks incentivize daily eco-habits like carpooling, plant-based dining, and digital textbooks.",
    icon: <Trophy className="text-yellow-400" size={48} />,
    color: "from-yellow-900/20 to-transparent"
  },
  {
    id: 6,
    title: "The Carbon Economy",
    subtitle: "Eco Credits & Marketplace",
    content: "Bridging the gap between planet-positive behavior and financial value. Credits are redeemed for cafeteria discounts, bookstore perks, or real-world tree planting.",
    icon: <Zap className="text-[#00ff88]" size={48} />,
    color: "from-[#00ff88]/20 to-transparent"
  },
  {
    id: 7,
    title: "Circular Campus",
    subtitle: "Eco Exchange & AI Listings",
    content: "A peer-to-peer marketplace that encourages reuse. Our AI listing assistant writes descriptions and calculates 'Planet Savings' for every second-hand trade.",
    icon: <ShoppingBag className="text-purple-400" size={48} />,
    color: "from-purple-900/20 to-transparent"
  },
  {
    id: 8,
    title: "Personalized Guidance",
    subtitle: "24/7 Eco Coach",
    content: "A context-aware AI mentor providing actionable advice. Ask: 'Where can I recycle my laptop battery?' or 'Suggest a low-carbon lunch option on campus.'",
    icon: <Users className="text-cyan-400" size={48} />,
    color: "from-cyan-900/20 to-transparent"
  },
  {
    id: 9,
    title: "Predictive Analytics",
    subtitle: "Smart Efficiency (Gemini 3 Pro)",
    content: "Forecasting optimal windows for library usage to save energy and coordinating group carpools based on real-time campus activity patterns.",
    icon: <BarChart3 className="text-indigo-400" size={48} />,
    color: "from-indigo-900/20 to-transparent"
  },
  {
    id: 10,
    title: "Impact & Scalability",
    subtitle: "From Individual to Global",
    content: "Eco Campus isn't just an app; it's a culture shifter. Scalable to any university globaly to move from 'Neutral' to 'Net Positive' status by 2030.",
    icon: <Globe className="text-[#00ff88]" size={48} />,
    color: "from-[#00ff88]/30 to-transparent"
  }
];

const PitchMode: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prev = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const slide = SLIDES[currentSlide];

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-6 md:p-12 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
      
      <div className={`relative w-full max-w-6xl aspect-[16/9] glass-panel rounded-[4rem] overflow-hidden border-white/20 shadow-2xl flex flex-col bg-gradient-to-br ${slide.color}`}>
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 flex">
          {SLIDES.map((_, i) => (
            <div 
              key={i} 
              className={`flex-1 h-full transition-all duration-500 ${i <= currentSlide ? 'bg-[#00ff88]' : 'bg-transparent'}`} 
            />
          ))}
        </div>

        <button 
          onClick={onClose} 
          className="absolute top-8 right-10 text-white/40 hover:text-white transition-all z-20 p-2 hover:bg-white/10 rounded-full"
        >
          <X size={32} />
        </button>

        <div className="flex-1 flex flex-col justify-center px-12 md:px-24 space-y-8 md:space-y-12">
          <div className="space-y-4">
             <div className="flex items-center gap-6">
                <div className="p-4 bg-white/5 rounded-3xl border border-white/10 shadow-2xl">
                   {slide.icon}
                </div>
                <span className="text-[14px] font-black uppercase tracking-[0.4em] text-[#00ff88]">
                  Slide {slide.id} / {SLIDES.length}
                </span>
             </div>
             <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
                {slide.title}
             </h2>
             <h3 className="text-2xl md:text-4xl font-bold text-white/40 tracking-tight">
                {slide.subtitle}
             </h3>
          </div>
          
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-4xl font-medium">
            {slide.content}
          </p>
        </div>

        <div className="p-12 md:px-24 flex justify-between items-center">
          <div className="flex gap-4">
            <button onClick={prev} className="w-16 h-16 glass-nav flex items-center justify-center hover:bg-[#00ff88] hover:text-black transition-all">
              <ChevronLeft size={32} />
            </button>
            <button onClick={next} className="w-16 h-16 glass-nav flex items-center justify-center hover:bg-[#00ff88] hover:text-black transition-all">
              <ChevronRight size={32} />
            </button>
          </div>
          
          <div className="hidden md:block">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
              Presented by ecocampus core team
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex gap-3">
        {SLIDES.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? 'bg-[#00ff88] w-12' : 'bg-white/20 hover:bg-white/40'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default PitchMode;

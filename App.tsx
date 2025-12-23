
import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Camera, 
  Trophy, 
  MessageSquare, 
  Leaf, 
  ShoppingBag,
  Menu,
  Activity
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Scanner from './components/Scanner';
import Leaderboard from './components/Leaderboard';
import Marketplace from './components/Marketplace';
import Coach from './components/Coach';
import MapView from './components/Map';
import EcoExchange from './components/EcoExchange';
import { ViewState } from './types';
import { useStore } from './useStore';

const ECO_BACKGROUNDS = [
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1448375240581-0020413030ee?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1466611653911-954ffec136ce?q=80&w=2560&auto=format&fit=crop'
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewState>('dashboard');
  const store = useStore();

  useEffect(() => {
    const randomBg = ECO_BACKGROUNDS[Math.floor(Math.random() * ECO_BACKGROUNDS.length)];
    document.body.style.backgroundImage = `url('${randomBg}')`;
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard stats={store.stats} onStartScan={() => setActiveTab('scanner')} />;
      case 'scanner': return <Scanner 
        onReward={(credits) => {
          store.addCredits(credits);
          store.addXP(credits * 2);
          store.addCo2Saved(0.5);
        }} 
      />;
      case 'leaderboard': return <Leaderboard />;
      case 'marketplace': return <Marketplace 
        credits={store.stats.carbonCredits} 
        onPurchase={(cost) => {
          const ok = store.spendCredits(cost);
          if (ok) {
            store.addXP(cost / 10);
            return true;
          }
          return false;
        }} 
      />;
      case 'exchange': return <EcoExchange 
        items={store.exchangeItems} 
        onPost={store.postExchangeItem} 
      />;
      case 'coach': return <Coach 
        history={store.chatHistory} 
        onSaveMessage={store.saveChatMessage} 
      />;
      case 'map': return <MapView />;
      default: return <Dashboard stats={store.stats} onStartScan={() => setActiveTab('scanner')} />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Home' },
    { id: 'scanner', label: 'Scan' },
    { id: 'exchange', label: 'Market' },
    { id: 'leaderboard', label: 'Social' },
    { id: 'marketplace', label: 'Perks' },
    { id: 'coach', label: 'Coach' },
  ];

  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden bg-transparent selection:bg-[#00ff88] selection:text-black">
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80 pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-emerald-900/10 pointer-events-none -z-10" />

      <header className="fixed top-0 left-0 w-full p-6 md:p-8 lg:px-12 z-[100] flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 flex items-center justify-center text-[#00ff88] transition-transform group-hover:rotate-12">
            <Leaf size={32} strokeWidth={2.5} />
          </div>
          <span className="font-extrabold text-2xl lg:text-3xl tracking-tighter text-white">ecocampus</span>
        </div>

        <nav className="hidden md:flex glass-nav px-6 lg:px-10 py-3 gap-6 lg:gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ViewState)}
              className={`text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-1 ${
                activeTab === item.id ? 'text-[#00ff88]' : 'text-white/50 hover:text-white'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#00ff88] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex glass-nav px-6 py-3 items-center gap-2">
            <Activity className="text-[#00ff88]" size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/80">LVL {store.stats.level}</span>
            <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#00ff88]" 
                style={{ width: `${(store.stats.xp % 1000) / 10}%` }} 
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 relative overflow-y-auto no-scrollbar pt-28 pb-32 md:pb-12 lg:pt-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 h-full">
          {renderContent()}
        </div>
      </main>

      <nav className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] glass-nav px-6 py-5 flex justify-between items-center z-[100] shadow-2xl shadow-black/50 border-white/20">
        <NavButton active={activeTab === 'dashboard'} icon={<Home size={22} />} onClick={() => setActiveTab('dashboard')} />
        <NavButton active={activeTab === 'scanner'} icon={<Camera size={22} />} onClick={() => setActiveTab('scanner')} />
        <NavButton active={activeTab === 'exchange'} icon={<ShoppingBag size={22} />} onClick={() => setActiveTab('exchange')} />
        <NavButton active={activeTab === 'leaderboard'} icon={<Trophy size={22} />} onClick={() => setActiveTab('leaderboard')} />
        <NavButton active={activeTab === 'coach'} icon={<MessageSquare size={22} />} onClick={() => setActiveTab('coach')} />
      </nav>
    </div>
  );
};

const NavButton = ({ active, icon, onClick }: any) => (
  <button onClick={onClick} className={`p-3 rounded-full transition-all ${active ? 'bg-[#00ff88] text-black scale-110 shadow-lg' : 'text-white/50 hover:text-white'}`}>
    {icon}
  </button>
);

export default App;

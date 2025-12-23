
import React, { useState } from 'react';
import { Trophy, Users, ArrowUpRight, Target, Flame, Sparkles, Clock, Hourglass } from 'lucide-react';
import { DormTeam, FriendStreak } from '../types';

const MOCK_TEAMS: DormTeam[] = [
  { id: '1', name: 'West Oaks Dorm', memberCount: 124, totalCo2Saved: 1250, rank: 1 },
  { id: '2', name: 'Engineering Hall', memberCount: 89, totalCo2Saved: 980, rank: 2 },
  { id: '3', name: 'South Hall Resid.', memberCount: 156, totalCo2Saved: 850, rank: 3 },
  { id: '4', name: 'Green Residence', memberCount: 45, totalCo2Saved: 620, rank: 4 },
  { id: '5', name: 'Arts Collective', memberCount: 67, totalCo2Saved: 590, rank: 5 },
  { id: '6', name: 'North Campus Hub', memberCount: 204, totalCo2Saved: 540, rank: 6 },
];

const MOCK_FRIENDS: FriendStreak[] = [
  { id: 'f1', name: 'Jessica Miller', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop', streakDays: 45, activeToday: true, isExpiring: false },
  { id: 'f2', name: 'Ryan Park', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop', streakDays: 32, activeToday: false, isExpiring: true },
  { id: 'f3', name: 'Sam Taylor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop', streakDays: 12, activeToday: true, isExpiring: false },
  { id: 'f4', name: 'Elena Gilbert', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop', streakDays: 8, activeToday: false, isExpiring: true },
  { id: 'f5', name: 'Marcus Wong', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop', streakDays: 5, activeToday: true, isExpiring: false },
];

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dorm' | 'friends'>('dorm');

  return (
    <div className="h-full overflow-y-auto no-scrollbar py-12">
      <div className="p-6 md:p-10 space-y-12 max-w-6xl mx-auto pb-24 md:pb-10 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tighter">Campus Community</h2>
            <p className="text-white/40 font-medium mt-2">Dorm Cups, Global Streaks & Real-world Impact</p>
          </div>
          <div className="glass-nav p-1 flex gap-1 border-white/10">
            <button 
              onClick={() => setActiveTab('dorm')}
              className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${activeTab === 'dorm' ? 'bg-[#00ff88] text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
            >
              Dorm Cup
            </button>
            <button 
              onClick={() => setActiveTab('friends')}
              className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${activeTab === 'friends' ? 'bg-[#00ff88] text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
            >
              Streaks
            </button>
          </div>
        </div>

        {activeTab === 'dorm' ? (
          <div className="space-y-16">
            {/* Podium */}
            <div className="flex justify-center items-end gap-4 md:gap-12 pt-16">
              <PodiumItem rank={2} name="Engineering" save="980kg" img="https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=200&auto=format&fit=crop" color="border-white/20" height="h-32 md:h-44" />
              <PodiumItem rank={1} name="West Oaks" save="1,250kg" img="https://images.unsplash.com/photo-1555854816-809d28af3932?q=80&w=250&auto=format&fit=crop" color="border-[#00ff88]" height="h-44 md:h-64" isCenter />
              <PodiumItem rank={3} name="South Hall" save="850kg" img="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=200&auto=format&fit=crop" color="border-orange-500/50" height="h-28 md:h-36" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="glass-panel p-8 rounded-[3rem] space-y-4">
                  <div className="flex items-center gap-3 text-[#00ff88]">
                    <Target size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">Global Milestone</span>
                  </div>
                  <h3 className="text-2xl font-bold">University Forest Project</h3>
                  <p className="text-white/60 text-sm leading-relaxed">Collectively save 5,000kg to unlock a mini-forest on South Quad.</p>
                  <div className="h-4 w-full bg-white/5 rounded-full border border-white/10 overflow-hidden mt-4">
                    <div className="h-full bg-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.5)]" style={{ width: '62%' }} />
                  </div>
                  <p className="text-[10px] font-black text-[#00ff88] text-right">3,100 / 5,000 KG SAVED</p>
               </div>
               
               <div className="space-y-4">
                  {MOCK_TEAMS.slice(3).map((team) => (
                    <div key={team.id} className="glass-panel p-6 rounded-[2rem] flex items-center justify-between group hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-6">
                        <span className="text-xl font-black text-white/20 italic">#{team.rank}</span>
                        <div>
                          <h4 className="font-bold text-white">{team.name}</h4>
                          <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">{team.memberCount} Warriors</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black text-[#00ff88]">{team.totalCo2Saved}kg</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_FRIENDS.map((friend) => (
              <div key={friend.id} className={`glass-panel p-8 rounded-[3rem] flex items-center justify-between group hover:bg-white/10 transition-all ${friend.isExpiring ? 'border-orange-500/40 bg-orange-500/5' : ''}`}>
                 <div className="flex items-center gap-6">
                    <div className={`relative p-1 rounded-full border-2 ${friend.activeToday ? 'border-[#00ff88]' : friend.isExpiring ? 'border-orange-500' : 'border-white/10'}`}>
                       <img src={friend.avatar} className="w-16 h-16 rounded-full grayscale group-hover:grayscale-0 transition-all" alt={friend.name} />
                       {friend.activeToday && (
                         <div className="absolute -bottom-1 -right-1 bg-[#00ff88] p-1 rounded-full shadow-lg">
                           <Sparkles size={12} className="text-black" />
                         </div>
                       )}
                    </div>
                    <div>
                       <h4 className="font-bold text-white group-hover:text-[#00ff88] transition-colors">{friend.name}</h4>
                       <p className={`text-[10px] font-black uppercase tracking-widest ${friend.isExpiring ? 'text-orange-500' : 'text-white/40'}`}>
                         {friend.isExpiring ? 'Expiring soon' : friend.activeToday ? 'Shared Impact' : 'Inactive Today'}
                       </p>
                    </div>
                 </div>
                 <div className="flex flex-col items-center">
                    <Flame size={32} className={`${friend.activeToday ? 'text-[#00ff88] fill-[#00ff88]' : friend.isExpiring ? 'text-orange-500 fill-orange-500' : 'text-white/10'} transition-all`} />
                    <span className="text-xs font-black text-white mt-1">{friend.streakDays}D</span>
                 </div>
              </div>
            ))}
            <button className="border-2 border-dashed border-white/10 rounded-[3rem] p-8 flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-all group">
               <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users size={24} className="text-[#00ff88]" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Invite Warrior</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const PodiumItem = ({ rank, name, save, img, color, height, isCenter }: any) => (
  <div className={`flex flex-col items-center shrink-0 ${isCenter ? 'scale-110 z-10' : ''}`}>
     <div className="relative">
        <div className={`w-24 md:w-32 h-24 md:h-32 rounded-3xl overflow-hidden border-4 ${color} shadow-2xl`}>
           <img src={img} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" alt={name} />
        </div>
        <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-2xl flex items-center justify-center text-black font-black text-sm border-4 border-black/40 ${rank === 1 ? 'bg-[#00ff88]' : rank === 2 ? 'bg-slate-300' : 'bg-orange-300'}`}>
           {rank}
        </div>
     </div>
     <div className={`glass-panel w-28 md:w-40 rounded-t-3xl mt-8 flex flex-col items-center justify-center ${height} border-b-0`}>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{name}</span>
        <span className="text-lg font-black text-white">{save}</span>
     </div>
  </div>
);

export default Leaderboard;

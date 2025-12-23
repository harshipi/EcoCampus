
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, Calendar, ThermometerSun, Info } from 'lucide-react';
import { getSustainabilityCoachResponse } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface Props {
  history: any[];
  onSaveMessage: (role: 'user' | 'model', text: string) => void;
}

const Coach: React.FC<Props> = ({ history, onSaveMessage }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (history.length > 0) {
      return history.map(h => ({ role: h.role, text: h.parts[0].text }));
    }
    return [
      { role: 'model', text: "Hello! I'm your Eco Campus Coach. How can I help you live more sustainably today?" }
    ];
  });
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    const newMsgs = [...messages, { role: 'user', text: userMsg } as Message];
    setMessages(newMsgs);
    onSaveMessage('user', userMsg);
    setLoading(true);

    try {
      const response = await getSustainabilityCoachResponse(userMsg, history);
      const botMsg = response || "Keep making green choices!";
      setMessages(prev => [...prev, { role: 'model', text: botMsg }]);
      onSaveMessage('model', botMsg);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Connection issues. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden animate-in fade-in duration-700">
      <div className="px-6 py-4 flex gap-4 items-center overflow-x-auto no-scrollbar shrink-0">
         <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] whitespace-nowrap">
           <Info size={14} /> Global Feed:
         </div>
         <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-400 rounded-full text-[10px] font-black uppercase tracking-wider border border-orange-500/20">
            <ThermometerSun size={14} /> Refill Station at Union Hub is ACTIVE
         </div>
         <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-[#00ff88]/10 text-[#00ff88] rounded-full text-[10px] font-black uppercase tracking-wider border border-[#00ff88]/20">
            <Calendar size={14} /> Dorm duel starts in 3h!
         </div>
      </div>

      <div className="flex-1 overflow-hidden relative flex flex-col">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 lg:p-12 space-y-6 max-w-4xl mx-auto w-full no-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] md:max-w-[70%] p-6 rounded-[2rem] text-sm md:text-base leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-[#00ff88] text-black rounded-tr-none' 
                  : 'glass-panel text-white/90 rounded-tl-none border-white/10'
              }`}>
                <div className="flex items-center gap-2 mb-2 opacity-40">
                  {msg.role === 'model' && <Sparkles size={14} />}
                  <span className={`text-[10px] font-black uppercase tracking-widest`}>
                    {msg.role === 'user' ? 'Warrior' : 'Coach'}
                  </span>
                </div>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
               <div className="glass-panel p-6 rounded-[2rem] rounded-tl-none flex items-center gap-3 border-white/10">
                  <Loader2 size={20} className="text-[#00ff88] animate-spin" />
                  <span className="text-xs text-white/40 font-black tracking-widest uppercase">Thinking...</span>
               </div>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8 shrink-0">
          <div className="max-w-4xl mx-auto glass-nav p-2 flex gap-2 border-white/20">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for your personalized eco-plan..."
              className="flex-1 bg-transparent border-none rounded-3xl px-6 py-4 text-sm focus:ring-0 outline-none placeholder:text-white/20 text-white"
            />
            <button 
              onClick={handleSend}
              className="bg-[#00ff88] text-black p-4 rounded-full active:scale-95 transition-all shadow-lg shadow-[#00ff88]/20 flex items-center justify-center aspect-square"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coach;

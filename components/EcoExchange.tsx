
import React, { useState } from 'react';
import { 
  Plus, 
  MapPin, 
  Sparkles, 
  X, 
  Loader2, 
  ChevronRight,
  Package,
  HelpCircle,
  DollarSign
} from 'lucide-react';
import { EcoExchangeItem } from '../types';
import { generateEcoListing } from '../services/geminiService';

const MOCK_FALLBACK: EcoExchangeItem[] = [
  { 
    id: 'e1', 
    title: 'Vintage Denim Jacket', 
    description: 'A classic Levi jacket, fits medium. Barely worn!', 
    price: 25, 
    category: 'clothing', 
    condition: 'Good', 
    sellerName: 'Sarah J.', 
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop', 
    image: 'https://images.unsplash.com/photo-1576905341935-420780f2c41e?q=80&w=800&auto=format&fit=crop', 
    location: 'West Oaks Dorm' 
  }
];

interface Props {
  items: EcoExchangeItem[];
  onPost: (item: EcoExchangeItem) => void;
}

const EcoExchange: React.FC<Props> = ({ items, onPost }) => {
  const [activeSubTab, setActiveSubTab] = useState<'browse' | 'sell-guide'>('browse');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const displayItems = items.length > 0 ? items : MOCK_FALLBACK;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'clothing' as any,
    condition: 'Good' as any,
    location: ''
  });

  const handleAiRefine = async () => {
    if (!formData.title) return;
    setIsGenerating(true);
    try {
      const result = await generateEcoListing(formData.title, formData.category);
      setFormData(prev => ({ ...prev, description: result.description }));
    } catch (e) {
      console.error("AI Generation failed", e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: EcoExchangeItem = {
      id: `e${Date.now()}`,
      title: formData.title,
      description: formData.description,
      price: formData.price === '0' || formData.price === '' ? 'Free' : parseInt(formData.price),
      category: formData.category,
      condition: formData.condition,
      sellerName: 'You',
      sellerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop', 
      location: formData.location || 'Campus Center'
    };

    onPost(newItem);
    setIsPostModalOpen(false);
    setFormData({ title: '', description: '', price: '', category: 'clothing', condition: 'Good', location: '' });
  };

  return (
    <div className="flex flex-col gap-10 md:gap-16 py-6 md:py-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter">Eco Exchange</h2>
          <div className="flex gap-2 glass-nav p-1.5 w-fit">
            <SubTab active={activeSubTab === 'browse'} label="Browse Store" onClick={() => setActiveSubTab('browse')} />
            <SubTab active={activeSubTab === 'sell-guide'} label="AI Assistant" onClick={() => setActiveSubTab('sell-guide')} />
          </div>
        </div>
        <button 
          onClick={() => setIsPostModalOpen(true)}
          className="btn-primary flex items-center gap-3 w-full md:w-auto text-sm"
        >
          <Plus size={22} /> Post New Listing
        </button>
      </div>

      {activeSubTab === 'browse' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {displayItems.map(item => (
            <div key={item.id} className="glass-panel p-5 md:p-6 rounded-[2.5rem] space-y-5 group transition-all hover:bg-white/[0.12] border-white/10">
              <div className="h-64 sm:h-72 rounded-[2rem] overflow-hidden bg-slate-800 relative">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.title} />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-[#00ff88] tracking-widest border border-white/10 uppercase">
                  {item.category}
                </div>
              </div>
              <div className="px-2 pb-2 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight">{item.title}</h3>
                  <span className="text-[#00ff88] text-xl font-black">{item.price === 'Free' ? 'FREE' : `$${item.price}`}</span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed line-clamp-2 font-medium">{item.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#00ff88]" /> {item.location}</span>
                    <span className="flex items-center gap-1.5"><Package size={14} className="text-[#00ff88]" /> {item.condition}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 lg:p-20 rounded-[3rem] text-center space-y-8 max-w-4xl mx-auto w-full border-white/10">
          <div className="w-20 h-20 bg-[#00ff88]/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#00ff88]/10">
            <HelpCircle size={40} className="text-[#00ff88]" />
          </div>
          <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">AI Selling Assistant</h3>
          <p className="text-white/60 text-base md:text-lg max-w-lg mx-auto font-medium">Get real-time advice on the best places to recycle or sell items on campus.</p>
        </div>
      )}

      {isPostModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={() => setIsPostModalOpen(false)} />
          <div className="glass-panel w-full md:max-w-2xl lg:max-w-3xl max-h-[85vh] overflow-y-auto rounded-[3rem] z-10 p-10 md:p-14 relative border-white/20">
            <button onClick={() => setIsPostModalOpen(false)} className="absolute top-10 right-10 text-white/40 hover:text-white transition-all"><X size={28} /></button>
            <div className="space-y-10">
              <h2 className="text-4xl font-black tracking-tighter">New Listing</h2>
              <form onSubmit={handlePost} className="space-y-8">
                <FormGroup label="Item Title">
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Blue Denim Jacket" className="form-input" />
                </FormGroup>
                <FormGroup label="Price">
                   <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="0.00" className="form-input" />
                </FormGroup>
                <div className="relative group">
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Description..." className="form-input min-h-[160px]" />
                  <button type="button" onClick={handleAiRefine} disabled={isGenerating || !formData.title} className="absolute bottom-5 right-5 bg-white/5 text-[#00ff88] px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase flex items-center gap-2.5">
                    {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />} Refine
                  </button>
                </div>
                <button type="submit" className="btn-primary w-full py-6 text-[13px] uppercase tracking-[0.3em]">Post Listing</button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`.form-input { width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1.5rem; padding: 1.125rem 1.5rem; color: white; font-size: 0.95rem; outline: none; transition: all 0.3s; }`}</style>
    </div>
  );
};

const FormGroup = ({ label, children }: any) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">{label}</label>
    {children}
  </div>
);

const SubTab = ({ active, label, onClick }: any) => (
  <button onClick={onClick} className={`text-[10px] lg:text-[11px] font-black uppercase tracking-widest px-6 lg:px-8 py-3 rounded-full transition-all ${active ? 'bg-[#00ff88] text-black shadow-lg' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>
    {label}
  </button>
);

export default EcoExchange;

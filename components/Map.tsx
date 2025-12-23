
import React, { useState } from 'react';
import { Search, MapPin, Bike, Droplets, Trash2, BatteryCharging, Navigation, Info } from 'lucide-react';

const RESOURCES = [
  { id: 1, name: 'Bike Share Hub A', type: 'bike', location: 'Near Library', active: true, count: 12 },
  { id: 2, name: 'Water Refill Station', type: 'water', location: 'Student Union Floor 1', active: true, count: null },
  { id: 3, name: 'Compost Point', type: 'waste', location: 'Cafeteria Courtyard', active: false, count: null },
  { id: 4, name: 'Solar Phone Charger', type: 'solar', location: 'The Quad', active: true, count: 4 },
  { id: 5, name: 'Water Refill Station', type: 'water', location: 'Science Building', active: true, count: null },
  { id: 6, name: 'EV Charging Point', type: 'solar', location: 'North Parking', active: true, count: 2 },
];

const MapView: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(1);

  const getIcon = (type: string) => {
    switch (type) {
      case 'bike': return <Bike size={20} />;
      case 'water': return <Droplets size={20} />;
      case 'waste': return <Trash2 size={20} />;
      case 'solar': return <BatteryCharging size={20} />;
      default: return <MapPin size={20} />;
    }
  };

  const getColorClass = (type: string) => {
    switch (type) {
      case 'bike': return 'bg-blue-100 text-blue-600';
      case 'water': return 'bg-cyan-100 text-cyan-600';
      case 'waste': return 'bg-orange-100 text-orange-600';
      case 'solar': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const selectedResource = RESOURCES.find(r => r.id === selectedId);

  return (
    <div className="h-full flex flex-col lg:flex-row bg-white overflow-hidden">
      
      {/* Search & List Side - Visible as panel on Desktop, stacked on Mobile */}
      <div className="w-full lg:w-96 border-r border-slate-100 flex flex-col shrink-0 h-1/2 lg:h-full">
        <div className="p-6 md:p-8 space-y-6 flex-1 overflow-y-auto no-scrollbar">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Resource Finder</h2>
            <p className="text-sm text-slate-500 font-medium">Sustainable hubs near you</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              placeholder="Search hubs, stations..."
              className="w-full bg-slate-50 border border-slate-100 rounded-[1.5rem] pl-12 pr-4 py-4 text-sm focus:ring-4 focus:ring-emerald-50 outline-none transition-all shadow-inner"
            />
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-4">Nearby Stations</h3>
            {RESOURCES.map((res) => (
              <button 
                key={res.id} 
                onClick={() => setSelectedId(res.id)}
                className={`w-full p-4 rounded-3xl border transition-all flex items-center gap-4 text-left ${
                  selectedId === res.id 
                    ? 'bg-white border-emerald-500 shadow-xl shadow-emerald-50' 
                    : 'bg-slate-50 border-transparent hover:border-slate-200'
                }`}
              >
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${getColorClass(res.type)}`}>
                    {getIcon(res.type)}
                 </div>
                 <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-sm truncate">{res.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{res.location}</p>
                 </div>
                 <div className={`w-2 h-2 rounded-full shrink-0 ${res.active ? 'bg-emerald-500' : 'bg-red-400'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Map Area - Large Viewport */}
      <div className="flex-1 relative bg-slate-100 h-1/2 lg:h-full">
         <img 
            src="https://picsum.photos/seed/campus-map-hd/1200/900" 
            className="w-full h-full object-cover grayscale-[0.3] opacity-70" 
            alt="Campus Map"
         />
         
         {/* Map Overlay Pins */}
         <MapPinPoint top="25%" left="35%" type="bike" isSelected={selectedId === 1} onClick={() => setSelectedId(1)} />
         <MapPinPoint top="45%" left="65%" type="water" isSelected={selectedId === 2} onClick={() => setSelectedId(2)} />
         <MapPinPoint top="70%" left="45%" type="solar" isSelected={selectedId === 4} onClick={() => setSelectedId(4)} />
         <MapPinPoint top="60%" left="25%" type="waste" isSelected={selectedId === 3} onClick={() => setSelectedId(3)} />

         {/* Selection Detail Overlay */}
         {selectedResource && (
           <div className="absolute bottom-8 left-8 right-8 lg:left-12 lg:w-96 animate-in slide-in-from-bottom-6 duration-500">
              <div className="glass p-6 rounded-[2.5rem] shadow-2xl border border-white/40 space-y-4">
                 <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${getColorClass(selectedResource.type)}`}>
                       {getIcon(selectedResource.type)}
                    </div>
                    <div>
                       <h4 className="text-xl font-black text-slate-800">{selectedResource.name}</h4>
                       <p className="text-xs text-slate-500 font-bold uppercase">{selectedResource.location}</p>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-2">
                    <div className="bg-white/60 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2">
                       <Info size={14} /> 
                       {selectedResource.active ? 'Station Online' : 'Temporary Closed'}
                    </div>
                    {selectedResource.count !== null && (
                      <div className="bg-emerald-500 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg shadow-emerald-200">
                        {selectedResource.count} Available
                      </div>
                    )}
                 </div>

                 <div className="grid grid-cols-2 gap-3 pt-2">
                    <button className="py-3.5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-xl">
                       <Navigation size={18} /> Route
                    </button>
                    <button className="py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                       Report Issue
                    </button>
                 </div>
              </div>
           </div>
         )}
      </div>
    </div>
  );
};

const MapPinPoint = ({ top, left, type, isSelected, onClick }: any) => {
  const color = type === 'bike' ? 'bg-blue-500' : type === 'water' ? 'bg-cyan-500' : type === 'solar' ? 'bg-yellow-500' : 'bg-orange-500';
  const icon = type === 'bike' ? <Bike size={14} /> : type === 'water' ? <Droplets size={14} /> : type === 'solar' ? <BatteryCharging size={14} /> : <Trash2 size={14} />;
  
  return (
    <div 
      onClick={onClick}
      style={{ top, left }} 
      className={`absolute w-10 h-10 ${color} text-white rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white cursor-pointer transition-all duration-300 hover:scale-125 z-20 ${isSelected ? 'scale-125 ring-8 ring-white/30' : 'animate-bounce'}`}
    >
      {icon}
    </div>
  );
}

export default MapView;

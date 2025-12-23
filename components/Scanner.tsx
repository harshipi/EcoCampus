
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Scan, X, CheckCircle2, Loader2, Sparkles, Smartphone } from 'lucide-react';
import { analyzeSustainabilityItem } from '../services/geminiService';

const Scanner: React.FC<{ onReward: (credits: number) => void }> = ({ onReward }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setIsScanning(true);
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      setIsScanning(false);
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setLoading(true);
    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    const base64Image = canvasRef.current.toDataURL('image/jpeg').split(',')[1];
    
    try {
      const analysis = await analyzeSustainabilityItem(base64Image);
      setResult(analysis);
      onReward(50); 
    } catch (err) {
      setResult("Oops! Something went wrong with the AI analysis.");
    } finally {
      setLoading(false);
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(t => t.stop());
    }
  };

  const closeScanner = () => {
    setIsScanning(false);
    setResult(null);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(t => t.stop());
    }
  };

  return (
    <div className="h-full flex flex-col justify-center max-w-4xl mx-auto py-12 animate-in fade-in duration-700">
      {!isScanning && !result ? (
        <div className="glass-panel p-12 rounded-[3rem] text-center space-y-8">
          <div className="w-24 h-24 bg-[#00ff88]/10 text-[#00ff88] rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-[#00ff88]/10">
            <Scan size={48} />
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl font-black tracking-tighter">AI Visual Analysis</h2>
            <p className="text-white/60 font-medium leading-relaxed max-w-md mx-auto">
              Scan campus items to instantly see their carbon footprint and recycling potential.
            </p>
          </div>
          <button 
            onClick={startCamera}
            className="btn-primary w-full max-w-sm mx-auto"
          >
            Launch Camera
          </button>
        </div>
      ) : isScanning && !result ? (
        <div className="relative flex-1 rounded-[3rem] overflow-hidden glass-panel">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 border-4 border-dashed border-[#00ff88]/40 rounded-[2rem] animate-pulse" />
          </div>
          <div className="absolute bottom-12 left-0 w-full flex justify-center gap-8">
            <button onClick={closeScanner} className="p-4 glass-nav bg-red-500/20 text-red-400"><X size={24} /></button>
            <button onClick={captureAndAnalyze} className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              {loading ? <Loader2 className="animate-spin text-black" /> : <div className="w-16 h-16 border-4 border-black rounded-full" />}
            </button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-[3rem] space-y-8">
           <div className="flex justify-between items-center">
             <h2 className="text-3xl font-black tracking-tighter">AI Insight</h2>
             <button onClick={() => setResult(null)} className="text-white/40 hover:text-white"><X /></button>
           </div>
           <div className="p-8 bg-white/5 rounded-3xl border border-white/10 text-lg leading-relaxed text-white/80">
             {result}
           </div>
           <button onClick={() => {setResult(null); startCamera();}} className="btn-primary w-full">Scan Another</button>
        </div>
      )}
    </div>
  );
};

export default Scanner;

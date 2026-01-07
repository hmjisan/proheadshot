import React, { useState } from 'react';
import { Download, AlertCircle, RefreshCw, Eye, EyeOff, History } from 'lucide-react';
import { HistoryItem } from '../types';

interface ResultViewerProps {
  resultImage: string | null;
  originalImage: string | null;
  error: string | null;
  onReset: () => void;
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
}

export const ResultViewer: React.FC<ResultViewerProps> = ({ 
  resultImage, 
  originalImage, 
  error, 
  onReset,
  history,
  onSelectHistory
}) => {
  const [isComparing, setIsComparing] = useState(false);

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `pro-headshot-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-retro-dark-card rounded-xl border-2 border-black dark:border-white shadow-hard dark:shadow-hard-white flex flex-col items-center justify-center p-8 text-center transition-colors">
          <div className="p-4 bg-retro-accent-3 border-2 border-black dark:border-white rounded-full mb-6">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-display uppercase">Error</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-8 font-medium">{error}</p>
          <button 
            onClick={onReset}
            className="px-6 py-2 bg-white dark:bg-retro-dark-card border-2 border-black dark:border-white rounded-lg text-sm font-bold shadow-hard dark:shadow-hard-white hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-black dark:text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (resultImage) {
    return (
      <div className="w-full h-full flex flex-col">
        
        {/* Main Image Area - Polaroid Style */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] mb-6">
          <div className="relative group w-full max-w-sm bg-white p-3 pb-12 border-2 border-black shadow-hard-lg transform rotate-1 transition-transform hover:rotate-0">
            {/* Note: The polaroid aesthetic usually stays white even in dark mode for the 'paper' feel, 
                so we keep bg-white and border-black for the internal photo frame to maintain the 'printed' look. */}
            <div className="relative aspect-[3/4] border-2 border-black overflow-hidden bg-gray-100">
              <img 
                src={isComparing && originalImage ? originalImage : resultImage} 
                alt="Headshot" 
                className="w-full h-full object-cover"
              />
               {/* Compare Button Overlay */}
                <button
                    onMouseDown={() => setIsComparing(true)}
                    onMouseUp={() => setIsComparing(false)}
                    onMouseLeave={() => setIsComparing(false)}
                    onTouchStart={() => setIsComparing(true)}
                    onTouchEnd={() => setIsComparing(false)}
                    className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full hover:scale-110 transition-transform z-10"
                    title="Hold to compare"
                >
                    {isComparing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            </div>
            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                 <p className="font-handwriting text-gray-500 text-sm font-bold opacity-60 transform -rotate-1">
                    {new Date().toLocaleDateString()}
                 </p>
            </div>
            
            {/* Tag */}
            <div className="absolute -top-3 -right-3 bg-retro-accent-1 border-2 border-black px-2 py-1 transform rotate-6 shadow-sm">
                <span className="text-xs font-bold uppercase text-black">Pro Studio</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 py-3 px-6 bg-white dark:bg-retro-dark-card border-2 border-black dark:border-white rounded-lg text-black dark:text-white font-bold shadow-hard dark:shadow-hard-white hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            RESET
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-3 px-6 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white rounded-lg font-bold shadow-hard dark:shadow-hard-white hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <Download className="w-4 h-4" />
            DOWNLOAD
          </button>
        </div>

        {/* History Strip */}
        {history.length > 0 && (
          <div className="w-full border-t-2 border-black dark:border-white pt-4 bg-white/50 dark:bg-zinc-900/50 p-4 rounded-xl border-2 border-dashed">
            <h4 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
               <History className="w-3 h-3" /> Recent Snaps
            </h4>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectHistory(item)}
                  className={`relative w-14 h-14 shrink-0 rounded border-2 transition-all ${
                    item.result === resultImage 
                    ? 'border-black dark:border-white ring-2 ring-retro-accent-1 ring-offset-2 dark:ring-offset-zinc-900' 
                    : 'border-black dark:border-white opacity-70 hover:opacity-100 hover:scale-105 bg-white'
                  }`}
                >
                  <img src={item.result} className="w-full h-full object-cover" alt="History" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Placeholder State
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-retro-dark-card border-2 border-black dark:border-white rounded-xl border-dashed p-8 transition-colors">
        <div className="w-24 h-24 bg-gray-100 dark:bg-zinc-800 border-2 border-black dark:border-white rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">✨</span>
        </div>
        <h3 className="text-lg font-bold font-display uppercase mb-1 text-black dark:text-white">Waiting for Input</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Result will appear here</p>
    </div>
  );
};
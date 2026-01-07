import React from 'react';
import { StyleOption, Tab, StyleAdjustments } from '../types';
import { Briefcase, Building, Sun, Monitor, Palette, Wand2, Sparkles, Sliders, Zap, Aperture, Thermometer, Droplet } from 'lucide-react';

interface StyleSelectorProps {
  styles: StyleOption[];
  selectedTab: Tab;
  onTabChange: (tab: Tab) => void;
  selectedStyleId: string | null;
  onStyleSelect: (style: StyleOption) => void;
  customPrompt: string;
  onCustomPromptChange: (prompt: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  hasImage: boolean;
  adjustments: StyleAdjustments;
  onAdjustmentsChange: (adjustments: StyleAdjustments) => void;
}

const IconMap: Record<string, React.ReactNode> = {
  briefcase: <Briefcase className="w-5 h-5" />,
  monitor: <Monitor className="w-5 h-5" />,
  sun: <Sun className="w-5 h-5" />,
  palette: <Palette className="w-5 h-5" />,
};

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  styles,
  selectedTab,
  onTabChange,
  selectedStyleId,
  onStyleSelect,
  customPrompt,
  onCustomPromptChange,
  isGenerating,
  onGenerate,
  hasImage,
  adjustments,
  onAdjustmentsChange
}) => {

  const handleAdjustmentChange = (key: keyof StyleAdjustments, value: string) => {
    onAdjustmentsChange({
      ...adjustments,
      [key]: value
    });
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-retro-dark-card border-2 border-black dark:border-white rounded-xl shadow-hard dark:shadow-hard-white overflow-hidden transition-colors">
      {/* Tabs */}
      <div className="flex border-b-2 border-black dark:border-white bg-gray-100 dark:bg-zinc-800">
        <button
          type="button"
          onClick={() => onTabChange('presets')}
          className={`flex-1 py-4 text-sm font-bold border-r-2 border-black dark:border-white transition-all flex items-center justify-center gap-2 uppercase tracking-wide ${
            selectedTab === 'presets' 
              ? 'bg-retro-accent-2 text-black shadow-inner' 
              : 'text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-zinc-700'
          }`}
        >
          <Building className="w-4 h-4" />
          Styles
        </button>
        <button
          type="button"
          onClick={() => onTabChange('custom')}
          className={`flex-1 py-4 text-sm font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wide ${
            selectedTab === 'custom' 
              ? 'bg-retro-accent-2 text-black shadow-inner' 
              : 'text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-zinc-700'
          }`}
        >
          <Wand2 className="w-4 h-4" />
          Custom
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col min-h-0 overflow-y-auto custom-scrollbar">
        {selectedTab === 'presets' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {styles.map((style) => (
                <button
                  type="button"
                  key={style.id}
                  onClick={() => onStyleSelect(style)}
                  className={`flex items-start p-3 rounded-lg border-2 transition-all duration-200 text-left w-full ${
                    selectedStyleId === style.id
                      ? 'border-black dark:border-white bg-white dark:bg-retro-dark-card shadow-hard dark:shadow-hard-white translate-x-[-2px] translate-y-[-2px] z-10'
                      : 'border-black dark:border-white bg-gray-50 dark:bg-zinc-800 hover:bg-white dark:hover:bg-zinc-700 hover:shadow-hard-sm dark:hover:shadow-hard-white-sm'
                  }`}
                >
                  <div className={`p-2 rounded border-2 border-black dark:border-white mr-3 shrink-0 ${
                    selectedStyleId === style.id 
                      ? 'bg-retro-accent-1' 
                      : 'bg-white dark:bg-retro-dark-card'
                  }`}>
                    <div className="text-black dark:text-white">
                       {IconMap[style.icon] || <Sparkles className="w-5 h-5" />}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-black dark:text-white font-display uppercase">
                      {style.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-snug">{style.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {selectedStyleId && (
              <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-300 dark:border-gray-700">
                 <h4 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                   <Sliders className="w-4 h-4" /> Fine Tune
                 </h4>
                 
                 <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Lighting', icon: Zap, key: 'lighting', options: ['Default', 'Soft', 'Dramatic', 'Natural'] },
                      { label: 'Blur', icon: Aperture, key: 'blur', options: ['Default', 'Subtle', 'Strong'] },
                      { label: 'Warmth', icon: Thermometer, key: 'temperature', options: ['Default', 'Warm', 'Cool'] },
                      { label: 'Tint', icon: Droplet, key: 'tint', options: ['None', 'Blue', 'Gold', 'Sepia', 'BW'] }
                    ].map((adj) => (
                      <div key={adj.key} className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase flex items-center gap-1">
                          <adj.icon className="w-3 h-3" /> {adj.label}
                        </label>
                        <select 
                          value={adjustments[adj.key as keyof StyleAdjustments]}
                          onChange={(e) => handleAdjustmentChange(adj.key as keyof StyleAdjustments, e.target.value)}
                          className="w-full text-xs font-bold border-2 border-black dark:border-white rounded-md bg-white dark:bg-retro-dark-card text-black dark:text-white py-2 px-2 focus:ring-0 focus:shadow-hard-sm dark:focus:shadow-hard-white-sm outline-none"
                        >
                          {adj.options.map(opt => (
                            <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full">
             <div className="mb-4 p-3 bg-retro-accent-1/20 border-2 border-black dark:border-white rounded-lg">
               <h3 className="text-sm font-bold text-black dark:text-white flex items-center gap-2 mb-1">
                 <Sparkles className="w-4 h-4" />
                 Prompt Mode
               </h3>
               <p className="text-xs text-black dark:text-white">
                 Be specific. "A cyberpunk portrait with neon lights"
               </p>
             </div>
            <textarea
              value={customPrompt}
              onChange={(e) => onCustomPromptChange(e.target.value)}
              placeholder="Type your instructions here..."
              className="flex-1 w-full p-4 rounded-lg border-2 border-black dark:border-white focus:ring-0 focus:shadow-hard dark:focus:shadow-hard-white resize-none text-sm font-medium bg-white dark:bg-retro-dark-card text-black dark:text-white placeholder-gray-400"
            />
          </div>
        )}

        <div className="mt-4 pt-4 border-t-2 border-black dark:border-white">
          <button
            type="button"
            onClick={onGenerate}
            disabled={!hasImage || isGenerating || (selectedTab === 'presets' && !selectedStyleId) || (selectedTab === 'custom' && !customPrompt.trim())}
            className={`w-full py-4 px-4 rounded-lg font-bold text-white border-2 border-black dark:border-white transition-all flex items-center justify-center gap-2 uppercase tracking-wide ${
              !hasImage || isGenerating || (selectedTab === 'presets' && !selectedStyleId) || (selectedTab === 'custom' && !customPrompt.trim())
                ? 'bg-gray-300 dark:bg-zinc-800 cursor-not-allowed text-gray-500 border-gray-400 dark:border-zinc-700'
                : 'bg-retro-accent-3 shadow-hard dark:shadow-hard-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Working...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
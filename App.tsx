import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { ResultViewer } from './components/ResultViewer';
import { generateEditedImage } from './services/geminiService';
import { StyleOption, Tab, StyleAdjustments, HistoryItem } from './types';
import { STYLES } from './constants';
import { ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [sourceMimeType, setSourceMimeType] = useState<string>('image/jpeg');
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>('presets');
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(STYLES[0]);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const [adjustments, setAdjustments] = useState<StyleAdjustments>({
    lighting: 'default',
    blur: 'default',
    temperature: 'default',
    tint: 'none'
  });

  // Handlers
  const handleImageUpload = (base64: string, mimeType: string) => {
    setSourceImage(base64);
    setSourceMimeType(mimeType);
    setGeneratedImage(null);
    setError(null);
  };

  const handleClearImage = () => {
    setSourceImage(null);
    setGeneratedImage(null);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!sourceImage) return;

    let finalPrompt = '';

    if (activeTab === 'presets') {
      if (!selectedStyle) return;
      finalPrompt = selectedStyle.prompt;

      // Append adjustments to the prompt
      const adjustmentParts = [];
      
      if (adjustments.lighting !== 'default') {
        const lightingMap: Record<string, string> = {
          soft: 'Use soft, diffused studio lighting.',
          dramatic: 'Use dramatic, high-contrast rim lighting.',
          natural: 'Use bright, natural window light.'
        };
        if (lightingMap[adjustments.lighting]) adjustmentParts.push(lightingMap[adjustments.lighting]);
      }

      if (adjustments.blur !== 'default') {
         const blurMap: Record<string, string> = {
          subtle: 'The background should have a subtle depth of field.',
          strong: 'The background should be heavily blurred with strong bokeh.'
        };
        if (blurMap[adjustments.blur]) adjustmentParts.push(blurMap[adjustments.blur]);
      }

      if (adjustments.temperature !== 'default') {
        const tempMap: Record<string, string> = {
          warm: 'Ensure the color temperature is warm.',
          cool: 'Ensure the color temperature is cool.'
        };
        if (tempMap[adjustments.temperature]) adjustmentParts.push(tempMap[adjustments.temperature]);
      }

      if (adjustments.tint !== 'none') {
        const tintMap: Record<string, string> = {
          blue: 'Apply a cinematic blue tint.',
          gold: 'Apply a golden tint.',
          sepia: 'Apply a sepia tone.',
          bw: 'Render in black and white.'
        };
        if (tintMap[adjustments.tint]) adjustmentParts.push(tintMap[adjustments.tint]);
      }

      if (adjustmentParts.length > 0) {
        finalPrompt += " " + adjustmentParts.join(" ") + "";
      }

    } else {
      if (!customPrompt.trim()) return;
      finalPrompt = customPrompt.trim();
    }

    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateEditedImage(sourceImage, sourceMimeType, finalPrompt);
      setGeneratedImage(result);

      // Add to history
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        original: sourceImage,
        result: result,
        styleId: selectedStyle?.id || 'custom',
        timestamp: Date.now()
      };
      setHistory(prev => [newItem, ...prev]);

    } catch (err: any) {
      setError(err.message || 'Something went wrong while generating the image.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleResetResult = () => {
    setGeneratedImage(null);
    setError(null);
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setSourceImage(item.original);
    setGeneratedImage(item.result);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-retro-bg dark:bg-retro-dark-bg transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="text-center mb-12">
           <div className="inline-block bg-retro-accent-1 border-2 border-black dark:border-white px-4 py-1 rounded-full shadow-hard-sm dark:shadow-hard-white-sm mb-4 transform -rotate-2">
              <span className="text-xs font-bold uppercase tracking-wider text-black">Beta Version 1.0</span>
           </div>
          <h2 className="text-5xl md:text-6xl font-black text-black dark:text-white mb-4 uppercase tracking-tighter leading-none font-display">
            Create Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-retro-accent-3 to-retro-accent-1" style={{ WebkitTextStroke: darkMode ? '1px white' : '2px black' }}>Alter Ego</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto">
            Upload a casual photo. Get a professional headshot. <br/>
            Powered by next-gen AI, styled with retro charm.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Step 1: Upload */}
          <div className="lg:col-span-4 flex flex-col gap-6">
             <div className="relative">
                <div className="absolute -top-4 -left-2 bg-retro-accent-1 border-2 border-black dark:border-white px-3 py-1 shadow-hard-sm dark:shadow-hard-white-sm z-10 transform -rotate-3">
                   <span className="font-bold text-sm font-display text-black">STEP 01</span>
                </div>
                <div className="bg-white dark:bg-retro-dark-card p-6 rounded-xl border-2 border-black dark:border-white shadow-hard dark:shadow-hard-white transition-colors">
                  <h3 className="text-xl font-bold mb-4 font-display border-b-2 border-black dark:border-white pb-2 text-black dark:text-white">SOURCE</h3>
                  <ImageUploader 
                    currentImage={sourceImage}
                    onImageUpload={handleImageUpload}
                    onClear={handleClearImage}
                  />
                </div>
             </div>

             <div className="relative">
                <div className="absolute -top-4 -left-2 bg-retro-accent-2 border-2 border-black dark:border-white px-3 py-1 shadow-hard-sm dark:shadow-hard-white-sm z-10 transform rotate-2">
                   <span className="font-bold text-sm font-display text-black">STEP 02</span>
                </div>
                 <div className="bg-white dark:bg-retro-dark-card p-6 pb-0 rounded-xl border-2 border-black dark:border-white shadow-hard dark:shadow-hard-white min-h-[400px] flex flex-col transition-colors">
                   <h3 className="text-xl font-bold mb-4 font-display border-b-2 border-black dark:border-white pb-2 text-black dark:text-white">CONFIGURE</h3>
                   <div className="flex-1 overflow-hidden -mx-2 px-2">
                      <StyleSelector 
                          styles={STYLES}
                          selectedTab={activeTab}
                          onTabChange={setActiveTab}
                          selectedStyleId={selectedStyle?.id || null}
                          onStyleSelect={setSelectedStyle}
                          customPrompt={customPrompt}
                          onCustomPromptChange={setCustomPrompt}
                          isGenerating={isGenerating}
                          onGenerate={handleGenerate}
                          hasImage={!!sourceImage}
                          adjustments={adjustments}
                          onAdjustmentsChange={setAdjustments}
                      />
                   </div>
                </div>
             </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center h-full pt-48">
             <ArrowRight className="w-12 h-12 text-black dark:text-white" />
          </div>

          {/* Step 3: Result */}
          <div className="lg:col-span-7">
             <div className="relative h-full">
                <div className="absolute -top-4 -right-2 bg-retro-accent-3 border-2 border-black dark:border-white px-3 py-1 shadow-hard-sm dark:shadow-hard-white-sm z-10 transform rotate-3">
                   <span className="font-bold text-sm text-white font-display">STEP 03</span>
                </div>
                <div className="bg-white dark:bg-retro-dark-card p-8 rounded-xl border-2 border-black dark:border-white shadow-hard dark:shadow-hard-white h-full min-h-[600px] flex flex-col transition-colors">
                  <h3 className="text-xl font-bold mb-6 font-display border-b-2 border-black dark:border-white pb-2 text-black dark:text-white">OUTPUT</h3>
                  <div className="flex-1">
                     <ResultViewer 
                       resultImage={generatedImage}
                       originalImage={sourceImage}
                       error={error} 
                       onReset={handleResetResult}
                       history={history}
                       onSelectHistory={handleSelectHistory}
                     />
                  </div>
                </div>
             </div>
          </div>

        </div>
      </main>

      <footer className="w-full border-t-2 border-black dark:border-white bg-white dark:bg-retro-dark-card py-8 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-bold text-black dark:text-white flex items-center justify-center gap-2">
            <span className="w-3 h-3 bg-retro-accent-1 border border-black dark:border-white rounded-full"></span>
            ProHeadshot AI © {new Date().getFullYear()}
            <span className="w-3 h-3 bg-retro-accent-2 border border-black dark:border-white rounded-full"></span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
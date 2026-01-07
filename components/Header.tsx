import React from 'react';
import { Camera, Sparkles, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-retro-card dark:bg-retro-dark-card border-b-2 border-black dark:border-white sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-retro-accent-1 border-2 border-black dark:border-white p-2 shadow-hard-sm dark:shadow-hard-white-sm rounded-lg transition-colors">
            <Camera className="w-6 h-6 text-black" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white uppercase transition-colors">
            ProHeadshot<span className="text-retro-accent-3">.AI</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleDarkMode}
            className={`flex items-center justify-center w-12 h-12 rounded-lg border-2 border-black dark:border-white shadow-hard-sm dark:shadow-hard-white-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none ${
              darkMode ? 'bg-retro-dark-bg text-white' : 'bg-retro-bg text-black'
            }`}
          >
            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          
          <div className="hidden sm:flex items-center space-x-2 text-sm font-bold bg-retro-accent-2/20 dark:bg-retro-accent-2/10 px-4 py-2 rounded-full border-2 border-black dark:border-white shadow-hard-sm dark:shadow-hard-white-sm transition-colors">
            <Sparkles className="w-4 h-4 text-black dark:text-white" />
            <span className="text-black dark:text-white">Gemini Vision</span>
          </div>
        </div>
      </div>
    </header>
  );
};
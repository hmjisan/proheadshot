import React, { useCallback, useState } from 'react';
import { Upload, X, ScanFace } from 'lucide-react';

interface ImageUploaderProps {
  currentImage: string | null;
  onImageUpload: (base64: string, mimeType: string) => void;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImage, onImageUpload, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    processFile(file);
  }, [onImageUpload]);

  const processFile = (file: File | undefined) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onImageUpload(result, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  if (currentImage) {
    return (
      <div className="relative group rounded-xl overflow-hidden border-2 border-black dark:border-white shadow-hard dark:shadow-hard-white bg-white dark:bg-retro-dark-card aspect-[3/4] w-full mx-auto transition-all">
        <img 
          src={currentImage} 
          alt="Original Upload" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={onClear}
            className="bg-retro-accent-3 border-2 border-black dark:border-white text-white px-6 py-3 rounded-lg font-bold shadow-hard dark:shadow-hard-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center gap-2"
          >
            <X className="w-5 h-5" /> Remove
          </button>
        </div>
        <div className="absolute top-3 left-3 bg-white dark:bg-retro-dark-card border-2 border-black dark:border-white text-black dark:text-white text-xs font-bold px-3 py-1 rounded shadow-hard-sm dark:shadow-hard-white-sm">
          ORIGINAL
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto aspect-[3/4] relative">
      <label 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full h-full border-2 rounded-xl cursor-pointer transition-all duration-200 ${
          isDragging 
            ? 'border-black dark:border-white bg-retro-accent-2/20 border-dashed shadow-inner' 
            : 'border-black dark:border-white border-dashed bg-white dark:bg-retro-dark-card hover:bg-gray-50 dark:hover:bg-zinc-800'
        }`}
      >
        <div className="flex flex-col items-center justify-center text-center px-6">
          <div className={`mb-4 p-4 rounded-xl border-2 border-black dark:border-white shadow-hard dark:shadow-hard-white transition-transform duration-200 ${
             isDragging ? 'bg-retro-accent-2 rotate-3' : 'bg-retro-accent-1 rotate-0 group-hover:rotate-6'
          }`}>
            <Upload className="w-8 h-8 text-black" />
          </div>
          
          <h4 className="text-xl font-bold text-black dark:text-white mb-2 font-display">
            UPLOAD SELFIE
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-6">
            Drag & drop or click to browse
          </p>
          
          <div className="flex gap-2">
             <span className="px-2 py-1 rounded border-2 border-black dark:border-white bg-gray-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">
                JPG
             </span>
             <span className="px-2 py-1 rounded border-2 border-black dark:border-white bg-gray-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">
                PNG
             </span>
             <span className="px-2 py-1 rounded border-2 border-black dark:border-white bg-gray-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">
                WEBP
             </span>
          </div>
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
      
      {/* Decorative corners */}
      <div className="absolute -top-1 -left-1 w-3 h-3 bg-black dark:bg-white transition-colors"></div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-black dark:bg-white transition-colors"></div>
      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-black dark:bg-white transition-colors"></div>
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-black dark:bg-white transition-colors"></div>
    </div>
  );
};
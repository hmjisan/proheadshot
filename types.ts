export interface StyleOption {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: string;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  resultImage: string | null;
}

export type Tab = 'presets' | 'custom';

export interface StyleAdjustments {
  lighting: string;
  blur: string;
  temperature: string;
  tint: string;
}

export interface HistoryItem {
  id: string;
  original: string;
  result: string;
  styleId: string | null;
  timestamp: number;
}
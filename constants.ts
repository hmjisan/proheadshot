import { StyleOption } from './types';

export const STYLES: StyleOption[] = [
  {
    id: 'corporate',
    name: 'Corporate Executive',
    description: 'Professional grey backdrop, business suit, studio lighting.',
    prompt: 'Transform this image into a professional corporate headshot. The person is wearing a sharp navy blue business suit. The background is a clean, neutral dark grey studio backdrop. High quality, photorealistic, 4k, professional lighting.',
    icon: 'briefcase'
  },
  {
    id: 'tech',
    name: 'Modern Tech',
    description: 'Casual yet professional, bright modern office background.',
    prompt: 'Transform this image into a modern tech industry headshot. The person is wearing smart casual business attire (a clean shirt or polo). The background is a blurred, bright modern office with glass and plants. Natural lighting, approachable, high resolution.',
    icon: 'monitor'
  },
  {
    id: 'outdoor',
    name: 'Outdoor Natural',
    description: 'Soft natural light, blurred park or city background.',
    prompt: 'Transform this image into an outdoor professional portrait. The person is wearing business casual attire. The background is a beautifully blurred city park with golden hour lighting. Soft, warm, natural look, high quality.',
    icon: 'sun'
  },
  {
    id: 'studio',
    name: 'Classic Studio',
    description: 'Black and white, dramatic lighting, artistic.',
    prompt: 'Transform this image into a classic black and white studio portrait. Dramatic rim lighting, high contrast, black background. The person looks dignified and artistic. 8k resolution, detailed texture.',
    icon: 'palette'
  }
];
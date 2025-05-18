export interface Sticker {
    id: string;
    imageUrl: string;
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night' | 'anytime';
  }
import { StaticImageData } from "next/image";

export interface Destination {
    id: string;
    name: string;
    country: string;
    region: 'Asia' | 'Europe' | 'Africa' | 'North America' | 'South America' | 'Oceania';
    emoji: string;
    description: string;
    imageUrl: StaticImageData;
    longDescription: string;
    popularActivities: string[];
  }
  
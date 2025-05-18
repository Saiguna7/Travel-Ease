import { Destination } from '@/types/destination';
import First from '@/public/1.png'
import Second from '@/public/2.png'
import Third from '@/public/3.png'
import Fourth from '@/public/4.png'
import Fith from '@/public/5.png'
import Sixth from '@/public/6.png'
import Seventh from '@/public/7.jpg'
export const destinations: Destination[] = [
  {
    id: 'd1',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    emoji: '🇬🇷',
    description: 'Famous for stunning sunsets, white-washed buildings, and blue domes overlooking the Aegean Sea.',
    imageUrl: First,
    popularActivities: ['Island hopping', 'Wine tasting', 'Beach relaxation', 'Cliff diving'],
    longDescription: ''
  },
  {
    id: 'd2',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    emoji: '🇯🇵',
    description: 'Ancient capital with over 1,600 Buddhist temples, hundreds of Shinto shrines, and imperial palaces.',
    imageUrl: Second,
    popularActivities: ['Temple visits', 'Cherry blossom viewing', 'Traditional tea ceremony', 'Geisha district tours'],
    longDescription: ''
  },
  {
    id: 'd3',
    name: 'Machu Picchu',
    country: 'Peru',
    region: 'South America',
    emoji: '🇵🇪',
    description: 'Iconic 15th-century Inca citadel set high in the Andes Mountains, above the Sacred Valley.',
    imageUrl: Third,
    popularActivities: ['Inca Trail hiking', 'Archaeological tours', 'Mountain climbing', 'Cultural experiences'],
    longDescription: ''
  },
  {
    id: 'd4',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    emoji: '🇿🇦',
    description: 'Stunning coastal city at the foot of Table Mountain with diverse cultural influences and landscapes.',
    imageUrl: Fourth,
    popularActivities: ['Table Mountain cable car', 'Vineyard tours', 'Penguin watching', 'Safari day trips'],
    longDescription: ''
  },
  {
    id: 'd5',
    name: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    emoji: '🇦🇺',
    description: 'Vibrant harbor city known for its iconic Opera House, Harbour Bridge, and beautiful beaches.',
    imageUrl: Fith,
    popularActivities: ['Opera House tours', 'Bondi Beach', 'Harbour cruises', 'Royal Botanic Garden'],
    longDescription: ''
  },
  {
    id: 'd6',
    name: 'New York City',
    country: 'United States',
    region: 'North America',
    emoji: '🇺🇸',
    description: 'The Big Apple offers world-class dining, shopping, and entertainment with iconic skyscrapers.',
    imageUrl: Sixth,
    popularActivities: ['Central Park walking', 'Museum visits', 'Broadway shows', 'Statue of Liberty tours'],
        longDescription: ''
  },
  {
    id: 'd7',
    name: 'Barcelona',
    country: 'Spain',
    region: 'Europe',
    emoji: '🇪🇸',
    description: 'Cosmopolitan city known for Gaudí`s architecture, Mediterranean beaches, and vibrant street life.',
    imageUrl: Seventh,
    popularActivities: ['Sagrada Familia tours', 'La Rambla shopping', 'Tapas hopping', 'Beach relaxation'],
        longDescription: ''
  },
];
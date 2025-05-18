'use client';
import { destinations } from '@/data/destination';
import dynamic from 'next/dynamic';
const DestinationCard = dynamic(
  () => import('@/components/ui/destination').then(mod => mod.DestinationCard),
  {
    loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-md"></div>,
    ssr: false
  }
);

export default function DestinationsPage() {
  return (
    <div className="pt-20">
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Explore Destinations
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the world&paos;s most breathtaking places and start planning your
            next unforgettable journey.
          </p>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <DestinationCard 
                key={destination.id} 
                destination={destination} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
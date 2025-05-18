import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { DestinationCard } from '@/components/features/destinations/DestinationCard';
import { destinations } from '@/data/mockDestination';
import Link from 'next/link';
import React from 'react';

const MemoizedDestinationCard = React.memo(DestinationCard);

export const FeaturedDestinations: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  useEffect(() => {
    if (!inView || !gridRef.current) return;
    
    const cards = gridRef.current.querySelectorAll('.destination-card');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { 
          opacity: 0, 
          y: 30 
        },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.08,
          duration: 0.6, 
          ease: 'power2.out' 
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [inView]);
  
  const featuredDestinations = destinations.slice(0, 5);
  
  return (
    <div ref={(el) => {
      gridRef.current = el;
      if (typeof ref === 'function') ref(el);
    }} className="grid grid-cols-1 md:grid-cols-12 gap-6 will-change-transform">

      <div className="md:col-span-8 md:row-span-2 destination-card">
        <MemoizedDestinationCard 
          destination={featuredDestinations[0]} 
          variant="large"
        />
      </div>

      {featuredDestinations.slice(1, 3).map((destination,index) => (
        <div key={destination.id} className="md:col-span-4 destination-card">
          <MemoizedDestinationCard 
            key={index}
            destination={destination} 
            variant="medium"
          />
        </div>
      ))}
      

      {featuredDestinations.slice(3, 5).map((destination, index) => (
        <div key={destination.id} className="md:col-span-4 destination-card">
          <MemoizedDestinationCard 
            key={index}
            destination={destination} 
            variant="small"
          />
        </div>
      ))}

      <div className="md:col-span-4 destination-card">
        <div className="bg-tertiary/10 rounded-sm h-full flex items-center justify-center p-6">
          <div className="text-center">
            <p className="font-serif text-lg mb-4">Looking for more?</p>
            <Link href="/destinations" className="border border-primary text-primary px-6 py-2 rounded-sm hover:bg-primary hover:text-white dark:hover:text-black transition-colors inline-block">
              View All Destinations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
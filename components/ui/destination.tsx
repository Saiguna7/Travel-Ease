

import { useState, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import gsap from 'gsap';
import { Dialog } from '@/components/ui/dialog';

interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  emoji: string;
  description: string;
  imageUrl: StaticImageData; 
  longDescription: string;
  highlights: string[];
}
interface DestinationCardProps {
  destination: Destination;
  index: number;
}



export function DestinationCard({ destination, index }: DestinationCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // GSAP hover animations
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(card.querySelector('.card-image'), {
        scale: 1.05,
        duration: 0.8,
        ease: 'power2.out',
      });
      
      gsap.to(card.querySelector('.card-overlay'), {
        opacity: 0.6,
        duration: 0.5,
      });
      
      gsap.to(card.querySelector('.card-content'), {
        y: -10,
        duration: 0.5,
      });
      
      gsap.to(card.querySelector('.read-more'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.1,
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card.querySelector('.card-image'), {
        scale: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      });
      
      gsap.to(card.querySelector('.card-overlay'), {
        opacity: 0.4,
        duration: 0.5,
      });
      
      gsap.to(card.querySelector('.card-content'), {
        y: 0,
        duration: 0.5,
      });
      
      gsap.to(card.querySelector('.read-more'), {
        opacity: 0,
        y: 10,
        duration: 0.3,
      });
    };
    
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        delay: 0.1 * index,
        ease: 'power3.out'
      }
    );
  }, [index]);

  return (
    <>
      <div
        ref={cardRef}
        className={`relative overflow-hidden rounded-sm shadow-md cursor-pointer h-[240px]`}
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="card-image absolute inset-0 w-full h-full">
           <Image
                   src={destination.imageUrl}
                   alt={destination.name}
                   fill
                   placeholder="blur"
                   className="object-cover"
                   />
          <div className="card-overlay absolute inset-0 bg-black opacity-40 transition-opacity"></div>
        </div>
        
        <div className="card-content absolute inset-0 flex flex-col justify-end p-6 text-white z-10 transition-transform">
          <div>
            <div className="inline-block px-3 py-1 mb-3 text-xs font-medium bg-primary rounded-sm">
              <span className="mr-1">{destination.emoji}</span>
              {destination.region}
            </div>
            <h3 className={`font-serif text-3xl mb-2`}>
              {destination.name}
            </h3>
            <p className="text-sm text-white/90 mb-4">
              {destination.country}
            </p>
            
            <div className="flex items-center text-sm font-medium">
              <span>Explore Destination</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        isOpen={isDialogOpen}
        onCloseAction={() => setIsDialogOpen(false)}
        title={`${destination.name}, ${destination.country}`}
        imageUrl={destination.imageUrl}
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">{destination.longDescription}</p>
          
          <h3 className="text-lg font-bold mt-4">Highlights</h3>
          <ul className="list-disc pl-5 space-y-1">
            {destination.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
          
          <div className="pt-4">
            <button 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors neon:glow-button"
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
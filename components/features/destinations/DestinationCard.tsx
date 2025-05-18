import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Destination } from '@/types/destination';
import { Dialog } from '@/components/ui/dialog';
import React from 'react';

interface DestinationCardProps {
  destination: Destination;
  variant: 'large' | 'medium' | 'small';
  onSelect?: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  variant,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.Context | null>(null);

  const getHeight = useCallback(() => {
    switch (variant) {
      case 'large': return 'h-[500px]';
      case 'medium': return 'h-[240px]';
      case 'small': return 'h-[200px]';
      default: return 'h-[240px]';
    }
  }, [variant]);

  const getTitleSize = useCallback(() => {
    switch (variant) {
      case 'large': return 'text-3xl';
      case 'medium': return 'text-xl';
      case 'small': return 'text-lg';
      default: return 'text-xl';
    }
  }, [variant]);

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;

    if (!animationRef.current) {
      animationRef.current = gsap.context(() => {}, cardRef);
    }
    
    const ctx = animationRef.current;
    
    ctx.add(() => {
      gsap.to('.card-image', {
        scale: 1.05,
        duration: 0.5, 
        ease: 'power2.out',
      });
      
      gsap.to('.card-overlay', {
        opacity: 0.6,
        duration: 0.4, 
      });
      
      gsap.to('.card-content', {
        y: -10,
        duration: 0.4, 
      });
      
      gsap.to('.read-more', {
        opacity: 1,
        y: 0,
        duration: 0.4, 
        delay: 0.1,
      });
    });
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || !animationRef.current) return;
    
    const ctx = animationRef.current;
    
    ctx.add(() => {
      gsap.to('.card-image', {
        scale: 1,
        duration: 0.5, 
        ease: 'power2.out',
      });
      
      gsap.to('.card-overlay', {
        opacity: 0.4,
        duration: 0.4,
      });
      
      gsap.to('.card-content', {
        y: 0,
        duration: 0.4, 
      });
      
      gsap.to('.read-more', {
        opacity: 0,
        y: 10,
        duration: 0.3,
      });
    });
  }, []);

  React.useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.revert();
        animationRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        className={`relative overflow-hidden rounded-sm shadow-md cursor-pointer ${getHeight()} will-change-transform`}
        onClick={() => setIsDialogOpen(true)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-image absolute inset-0 w-full h-full will-change-transform">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            width={700}
            height={475}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur" 
            loading={variant === 'large' ? 'eager' : 'lazy'} 
            className="w-full h-full object-cover"
          />
          <div className="card-overlay absolute inset-0 bg-black opacity-40 transition-opacity"></div>
        </div>
        
        <div className="card-content absolute inset-0 flex flex-col justify-end p-6 text-white z-10 will-change-transform">
          <div>
            <div className="inline-block px-3 py-1 mb-3 text-xs font-medium bg-secondary/80 rounded-sm text-primary">
              {destination.region}
            </div>
            <h3 className={`font-serif ${getTitleSize()} mb-2`}>
              {destination.name}
            </h3>
            <p className="text-sm text-white/90 mb-4">
              {destination.country}
            </p>
            
            <div className="read-more opacity-0 transform translate-y-4">
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
      </div>
      
      <Dialog
        isOpen={isDialogOpen}
        onCloseAction={() => setIsDialogOpen(false)}
        title={`${destination.name}, ${destination.country}`}
        imageUrl={destination.imageUrl}
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">{destination.longDescription}</p>              
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
};
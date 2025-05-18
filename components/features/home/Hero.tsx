import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import awesomeVideo from '@/videos/bg.mp4.json'
import BackgroundVideo from 'next-video/background-video'
import Link from 'next/link';
import Blur from '@/public/bg-blur.png'
import { useAnimationContext } from '@/components/animation/animation-provider';
import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle: string;
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { isWelcomeComplete } = useAnimationContext();
  const [showVideo, setShowVideo] = useState(false);
  
  useEffect(() => {
    if (isWelcomeComplete) {

      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isWelcomeComplete]);
  

  useEffect(() => {
    if (!heroRef.current || !showVideo) return;
    
    const tl = gsap.timeline();
    
    tl.from(heroRef.current.querySelector('.hero-image'), {
      scale: 1.1,
      duration: 2,
      ease: 'power2.out',
    })
    .from(
      heroRef.current.querySelector('.hero-content'),
      {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      },
      '-=1.5'
    )
    .from(
      heroRef.current.querySelectorAll('.fade-in'),
      {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.5'
    );
  }, [showVideo]);
  
  return (
    <div 
      ref={heroRef}
      className="relative h-[85vh] min-h-[600px] overflow-hidden"
    >
      <div className="hero-image absolute inset-0">
        {showVideo ? (
          <BackgroundVideo
            src={awesomeVideo as unknown as string}
            autoPlay
            muted
            loop
            poster={Blur}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-primary/60">
            <Image 
              src={Blur.src} 
              alt="Background placeholder" 
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="hero-content relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <div className="max-w-3xl">
            <div className="fade-in mb-6">
              <div className="w-20 h-[2px] bg-secondary mb-8"></div>
              <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
                {title}
              </h1>
            </div>
            
            <p className="fade-in text-xl md:text-2xl font-light mb-8 max-w-xl">
              {subtitle}
            </p>
            
            <div className="fade-in flex gap-4">
              <Link href="/planner" className="custom-pointer bg-secondary text-primary dark:text-white px-8 py-3 rounded-sm hover:bg-secondary/90 transition-colors">
                Plan Your Trip
              </Link>
              <Link href="/destinations" className="custom-pointer bg-transparent border border-white border-solid text-white px-8 py-3 rounded-sm hover:bg-white/10 transition-colors">
                Explore Destinations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
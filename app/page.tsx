// app/page.tsx
"use client"
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '@/components/features/home/Hero';
import { FeaturedDestinations } from '@/components/features/destinations/FeaturedDestinations';
import { TravelPlanner } from '@/components/features/planner/TravelPanner';
import { TripInspiration } from '@/components/features/inspiration/TripInspiration';
import { TravelTips } from '@/components/features/tips/TravelTips';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!pageRef.current) return;
    
    const sections = pageRef.current.querySelectorAll('.section');
    
    gsap.fromTo(
      sections,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      }
    );
  }, []);
  
  return (
    <div ref={pageRef} className="min-h-screen">
      <Hero 
        title="Your Journey Begins Here"
        subtitle="Discover, plan, and experience the world's most breathtaking destinations"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <section className="section mb-24">
          <div className="flex items-center mb-12">
            <div className="w-16 h-[1px] bg-primary mr-4"></div>
            <h2 className="font-serif text-3xl">Featured Destinations</h2>
          </div>
          <FeaturedDestinations />
        </section>
        
        <section className="section mb-24">
          <div className="flex items-center mb-12">
            <div className="w-16 h-[1px] bg-primary mr-4"></div>
            <h2 className="font-serif text-3xl">Plan Your Next Adventure</h2>
          </div>
          <TravelPlanner />
        </section>
        
        <section className="section mb-24">
          <div className="flex items-center mb-12">
            <div className="w-16 h-[1px] bg-primary mr-4"></div>
            <h2 className="font-serif text-3xl">Travel Inspiration</h2>
          </div>
          <TripInspiration />
        </section>
        
        <section className="section mb-24">
          <div className="flex items-center mb-12">
            <div className="w-16 h-[1px] bg-primary mr-4"></div>
            <h2 className="font-serif text-3xl">Expert Travel Tips</h2>
          </div>
          <TravelTips />
        </section>
      </div>
    </div>
  );
}
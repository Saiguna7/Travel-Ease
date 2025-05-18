"use client"
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '@/components/features/home/Hero';
import dynamic from 'next/dynamic';

const FeaturedDestinations = dynamic(
  () => import('@/components/features/destinations/FeaturedDestinations').then(mod => mod.FeaturedDestinations),
  {
    loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-md"></div>,
    ssr: false
  }
);

const TravelPlanner = dynamic(
  () => import('@/components/features/planner/TravelPanner').then(mod => mod.TravelPlanner),
  {
    loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-md"></div>,
    ssr: false
  }
);

const TripInspiration = dynamic(
  () => import('@/components/features/inspiration/TripInspiration').then(mod => mod.TripInspiration),
  {
    loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-md"></div>,
    ssr: false
  }
);

const TravelTips = dynamic(
  () => import('@/components/features/tips/TravelTips'),
  {
    loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-md"></div>,
    ssr: false
  }
);

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!pageRef.current) return;
    
    const sections = pageRef.current.querySelectorAll('.section');
    
    // Use more efficient animations with IntersectionObserver instead
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out'
            });
            // Stop observing after animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Set initial state and observe each section
    sections.forEach(section => {
      gsap.set(section, { opacity: 0, y: 50 });
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
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
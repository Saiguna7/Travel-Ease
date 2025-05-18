import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';
import gsap from 'gsap';
import { destinations } from '@/data/mockDestination';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView, IntersectionObserverProps } from 'react-intersection-observer';
import React from 'react';

interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  emoji: string;
  description: string;
  imageUrl: StaticImageData;
  longDescription: string;
}

interface TravelCategory {
  name: string;
  icon: string;
  color: string;
}

interface TravelQuote {
  quote: string;
  author: string;
}

// Props for memoized components
interface QuoteCardProps {
  quote: string;
  author: string;
  index: number;
}

interface CategoryItemProps {
  category: TravelCategory;
}

interface InspirationCardProps {
  destination: Destination;
  index: number;
}

const QuoteCard: React.FC<QuoteCardProps> = React.memo(({ quote, author, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="quote-card bg-secondary dark:bg-card text-white dark:text-white p-6 rounded-sm shadow-md border-l-4 border-tertiary"
  >
    <p className="font-serif text-lg italic mb-4">
      &quot;{quote}&quot;
    </p>
    <p className="text-right text-gray-600 dark:text-gray-400">
      — {author}
    </p>
  </motion.div>
));

QuoteCard.displayName = 'QuoteCard';

const CategoryItem: React.FC<CategoryItemProps> = React.memo(({ category }) => (
  <div 
    className={`category-item ${category.color} text-black rounded-sm p-5 text-center cursor-pointer hover:shadow-md transition-shadow will-change-transform`}
  >
    <div className="text-4xl mb-3">{category.icon}</div>
    <h4 className="font-medium">{category.name}</h4>
  </div>
));

CategoryItem.displayName = 'CategoryItem';

const InspirationCard: React.FC<InspirationCardProps> = React.memo(({ destination, index }) => (
  <div 
    className={`inspiration-card relative overflow-hidden rounded-sm ${
      index === 0 ? 'md:col-span-2 md:row-span-2' : ''
    }`}
    style={{ height: index === 0 ? '480px' : '240px' }}
  >
    <Image
      src={destination.imageUrl}
      alt={destination.name}
      fill
      sizes={index === 0 
        ? "(max-width: 768px) 100vw, 66vw" 
        : "(max-width: 768px) 100vw, 33vw"}
      placeholder="blur"
      loading={index < 3 ? "eager" : "lazy"}
      className="object-cover"
    />
    
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
    
    <div className="absolute bottom-0 left-0 p-6 text-white">
      <div className="inline-flex items-center px-2 py-1 mb-2 bg-primary/80 backdrop-blur-sm rounded-sm text-xs">
        <span className="mr-1 dark:text-black">{destination.emoji}</span>
        <span className='dark:text-black'>{destination.region}</span>
      </div>
      <h4 className="font-serif text-xl md:text-2xl mb-1">
        {destination.name}
      </h4>
      <p className="text-white/80 text-sm md:text-base">
        {destination.country}
      </p>
    </div>
  </div>
));

InspirationCard.displayName = 'InspirationCard';

export const TripInspiration: React.FC = () => {

  const [visibleQuotes, setVisibleQuotes] = useState<number>(3);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  

  const inspirationRef = useRef<HTMLDivElement | null>(null);
  
  const inViewOptions: IntersectionObserverProps = {
    triggerOnce: true,
    threshold: 0.1,
    children: function (): React.ReactNode {
      throw new Error('Function not implemented.');
    }
  };
  

  const [headerRef, headerInView] = useInView(inViewOptions);
  const [cardsRef, cardsInView] = useInView(inViewOptions);
  const [categoriesRef, categoriesInView] = useInView(inViewOptions);
  
  const featuredDestinations = useMemo<Destination[]>(() => 
    destinations.slice(0, 6), 
    []
  );
    
  const travelCategories = useMemo<TravelCategory[]>(() => [
    { name: 'Beach Getaways', icon: '🏖️', color: 'bg-blue-100' },
    { name: 'Mountain Retreats', icon: '⛰️', color: 'bg-green-100' },
    { name: 'Cultural Explorations', icon: '🏛️', color: 'bg-yellow-100' },
    { name: 'Food Adventures', icon: '🍽️', color: 'bg-red-100' },
    { name: 'Island Hopping', icon: '🏝️', color: 'bg-teal-100' },
    { name: 'Wildlife Safaris', icon: '🦁', color: 'bg-amber-100' },
  ], []);
  
  const travelQuotes = useMemo<TravelQuote[]>(() => [
    {
      quote: "The world is a book and those who do not travel read only one page.",
      author: "St. Augustine",
    },
    {
      quote: "Travel isn't always pretty. It isn't always comfortable. But that's okay. The journey changes you; it should change you.",
      author: "Anthony Bourdain",
    },
    {
      quote: "Travel makes one modest. You see what a tiny place you occupy in the world.",
      author: "Gustave Flaubert",
    },
    {
      quote: "To travel is to discover that everyone is wrong about other countries.",
      author: "Aldous Huxley"
    },
    {
      quote: "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.",
      author: "Marcel Proust"
    },
    {
      quote: "Once a year, go someplace you've never been before.",
      author: "Dalai Lama"
    },
    {
      quote: "Remember that happiness is a way of travel, not a destination.",
      author: "Roy M. Goodman"
    },
    {
      quote: "Travel far, travel wide, travel deep.",
      author: "Anais Nin"
    },
    {
      quote: "Traveling – it leaves you speechless, then turns you into a storyteller.",
      author: "Ibn Battuta"
    }
  ], []);


  const visibleQuotesData = useMemo<TravelQuote[]>(() => 
    travelQuotes.slice(0, visibleQuotes), 
    [travelQuotes, visibleQuotes]
  );


  const handleLoadMore = useCallback((): void => {
    if (visibleQuotes < travelQuotes.length) {
      setVisibleQuotes(Math.min(visibleQuotes + 3, travelQuotes.length));
      setIsExpanded(true);
    } else {
      setVisibleQuotes(3);
      setIsExpanded(false);
    }
  }, [visibleQuotes, travelQuotes.length]);

  // Header animations with intersection observer
  useEffect(() => {
    if (!headerInView) return;
    
    const headers = document.querySelectorAll<HTMLElement>('.section-header');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headers,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out'
        }
      );
    });
    
    return () => ctx.revert();
  }, [headerInView]);

  // Card animations with intersection observer
  useEffect(() => {
    if (!cardsInView) return;
    
    const cards = document.querySelectorAll<HTMLElement>('.inspiration-card');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out'
        }
      );
    });
    
    return () => ctx.revert();
  }, [cardsInView]);

  // Category animations with intersection observer
  useEffect(() => {
    if (!categoriesInView) return;
    
    const items = document.querySelectorAll<HTMLElement>('.category-item');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(1.2)'
        }
      );
    });
    
    return () => ctx.revert();
  }, [categoriesInView]);
  useEffect(() => {
    // Create an observer for each animation type
    const observerHeaders = createAnimationObserver('.section-header', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
    
    const observerCards = createAnimationObserver('.inspiration-card', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
    
    const observerCategories = createAnimationObserver('.category-item', 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }
    );
    
    // Helper function to create observers
    function createAnimationObserver(selector: string, fromVars: gsap.TweenVars, toVars: gsap.TweenVars) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {

              gsap.to(entry.target, {
                ...toVars,
                delay: index * 0.05,
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {

        gsap.set(el, fromVars);
        observer.observe(el);
      });
      
      return {
        cleanup: () => elements.forEach(el => observer.unobserve(el))
      };
    }
    
    // Cleanup function
    return () => {
      observerHeaders.cleanup();
      observerCards.cleanup();
      observerCategories.cleanup();
    };
  }, []);
  return (
    <div ref={inspirationRef} className="space-y-12">
      <section>
        <h3 ref={headerRef} className="section-header font-serif text-2xl mb-6">
          Inspire Your Next Adventure
        </h3>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDestinations.map((destination, index) => (
            <InspirationCard 
              key={destination.id}
              destination={destination}
              index={index}
            />
          ))}
        </div>
      </section>
      
      {/* Travel categories section */}
      <section className="categories-section">
        <h3 className="section-header font-serif text-2xl mb-6">
          Explore by Travel Style
        </h3>
        
        <div ref={categoriesRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {travelCategories.map((category) => (
            <CategoryItem 
              key={category.name}
              category={category}
            />
          ))}
        </div>
      </section>
      
      {/* Editorial content section */}
      <section className="quotes-section">
        <h3 className="section-header font-serif text-2xl mb-6">
          Words to Travel By
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {visibleQuotesData.map((quoteItem, index) => (
              <QuoteCard 
                key={index}
                quote={quoteItem.quote}
                author={quoteItem.author}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="custom-pointer border border-primary text-primary px-6 py-3 rounded-sm hover:bg-primary hover:text-black transition-colors"
          >
            {isExpanded ? 'Show Less' : 'Discover More Inspiration'}
          </button>
        </div>
      </section>
    </div>
  );
};
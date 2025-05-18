import { useState, useRef, useCallback, useMemo } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { SubscriptionForm } from '@/components/newsletter/subscription-form';
import First from '@/public/trip/1.png';
import Second from '@/public/trip/2.png';
import Third from '@/public/trip/3.png'; 
import Fourth from '@/public/trip/4.png'; 
import Fifth from '@/public/trip/5.png'; 
import Sixth from '@/public/trip/6.png';
import React from 'react';


type TipCategory = 'packing' | 'safety' | 'budgeting' | 'photography' | 'etiquette' | 'general';


interface TravelTip {
  id: string;
  title: string;
  content: string;
  category: TipCategory;
  imageUrl: StaticImageData;
  author: string;
  datePublished: string;
}


interface TipCardProps {
  tip: TravelTip;
  index: number;
}


interface CategoryButtonProps {
  category: string | TipCategory;
  selectedCategory: string;
  onClick: (category: string) => void;
  isAllCategory?: boolean;
}


const TipCard: React.FC<TipCardProps> = React.memo(({ tip, index }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [cardRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

 
  const handleImageLoad = useCallback((): void => {
    setIsLoaded(true);
  }, []);


  const getCategoryIcon = (category: TipCategory): string => {
    const iconMap: Record<TipCategory, string> = {
      packing: '🧳',
      safety: '🛡️',
      budgeting: '💰',
      photography: '📸',
      etiquette: '🤝',
      general: '✈️',
    };
    
    return iconMap[category] || '📌';
  };


  React.useEffect(() => {
    if (inView) {
      gsap.fromTo(
        `#tip-card-${tip.id}`,
        { 
          opacity: 0, 
          y: 20,
          scale: 0.98
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.4,
          delay: index * 0.05, 
          ease: 'power2.out'
        }
      );
    }
  }, [inView, index, tip.id]);

  return (
    <div
      id={`tip-card-${tip.id}`}
      ref={cardRef}
      className="tip-card bg-white dark:bg-card dark:text-white text-black rounded-sm shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg will-change-transform"
    >
      <div className="relative h-48">
        <Image
          src={tip.imageUrl}
          alt={tip.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          placeholder="blur"
          priority={index < 3}
          onLoad={handleImageLoad}
        />
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-sm">
          <span className="text-sm flex items-center text-black">
            <span className="mr-1">{getCategoryIcon(tip.category)}</span>
            <span className="capitalize">{tip.category}</span>
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="font-serif text-xl mb-3">
          {tip.title}
        </h4>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {tip.content}
        </p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>By {tip.author}</span>
          <span>{tip.datePublished}</span>
        </div>
      </div>
    </div>
  );
});

TipCard.displayName = 'TipCard';

const CategoryButton: React.FC<CategoryButtonProps> = React.memo(({ 
  category, 
  selectedCategory, 
  onClick, 
  isAllCategory = false 
}) => {

  const getCategoryIcon = (category: string): string => {
    const iconMap: Record<string, string> = {
      packing: '🧳',
      safety: '🛡️',
      budgeting: '💰',
      photography: '📸',
      etiquette: '🤝',
      general: '✈️',
    };
    
    return iconMap[category] || '📌';
  };


  const isSelected = selectedCategory === category;
  
  return (
    <button
      className={`category-button px-4 py-2 rounded-sm transition-colors will-change-transform ${
        isSelected
          ? 'bg-primary dark:bg-gray-800 dark:text-white text-white'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
      }`}
      onClick={() => onClick(category)}
    >
      {isAllCategory ? (
        "All Tips"
      ) : (
        <>
          <span className="mr-2">{getCategoryIcon(category)}</span>
          <span className="capitalize">{category}</span>
        </>
      )}
    </button>
  );
});

CategoryButton.displayName = 'CategoryButton';

const TravelTips: React.FC = () => {

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  

  const tipsRef = useRef<HTMLDivElement>(null);
  

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  
  // Create category buttons IntersectionObserver
  const [buttonsRef, buttonsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });


  const travelTips = useMemo<ReadonlyArray<TravelTip>>(() => [
    {
      id: 'tip-1',
      title: 'How to Pack Like a Minimalist',
      content: 'Choose versatile clothing items that can be mixed and matched. Roll clothes instead of folding to save space and reduce wrinkles. Use packing cubes to organize your suitcase by category for easy access.',
      category: 'packing',
      imageUrl: First,
      author: 'Emma Wilson',
      datePublished: 'May 2, 2025',
    },
    {
      id: 'tip-2',
      title: 'Stay Safe While Exploring New Cities',
      content: 'Research common scams in your destination before arriving. Keep digital copies of important documents. Share your itinerary with a trusted friend or family member and check in regularly.',
      category: 'safety',
      imageUrl: Second,
      author: 'Michael Chen',
      datePublished: 'April 15, 2025',
    },
    {
      id: 'tip-3',
      title: 'Stretch Your Travel Budget',
      content: 'Travel during shoulder seasons to enjoy lower prices and fewer crowds. Use flight price alerts to catch deals. Consider vacation rentals instead of hotels for longer stays. Eat where locals eat for better value.',
      category: 'budgeting',
      imageUrl: Third,
      author: 'Sophia Rodriguez',
      datePublished: 'April 28, 2025',
    },
    {
      id: 'tip-4',
      title: 'Capture Better Travel Photos',
      content: 'Wake up early to capture landmarks without crowds and in the best light. Include people in your photos to add scale and storytelling. Learn basic composition techniques like the rule of thirds.',
      category: 'photography',
      imageUrl: Fourth,
      author: 'David Kim',
      datePublished: 'May 5, 2025',
    },
    {
      id: 'tip-5',
      title: 'Navigate Cultural Differences with Grace',
      content: 'Learn basic phrases in the local language. Research cultural taboos and customs before your trip. Observe how locals behave in social situations and follow their lead. Ask permission before taking photos of people.',
      category: 'etiquette',
      imageUrl: Fifth,
      author: 'Amara Johnson',
      datePublished: 'April 10, 2025',
    },
    {
      id: 'tip-6',
      title: 'Overcome Jet Lag Quickly',
      content: 'Adjust your sleep schedule a few days before departure. Stay hydrated during your flight and avoid alcohol. Upon arrival, spend time outdoors to help your body adjust to the new time zone.',
      category: 'general',
      imageUrl: Sixth,
      author: 'James Peterson',
      datePublished: 'May 8, 2025',
    },
  ], []);
  

  const uniqueCategories = useMemo<Array<TipCategory>>(() => {
    const categoriesSet = new Set(travelTips.map(tip => tip.category));
    return Array.from(categoriesSet) as Array<TipCategory>;
  }, [travelTips]);
  

  const filteredTips = useMemo<ReadonlyArray<TravelTip>>(() => 
    selectedCategory === 'all' 
      ? travelTips 
      : travelTips.filter(tip => tip.category === selectedCategory)
  , [selectedCategory, travelTips]);
  
  // Handler for category selection
  const handleCategorySelect = useCallback((category: string): void => {
    
    setSelectedCategory(category);
  }, []);

  React.useEffect(() => {
    if (headerInView) {
      gsap.fromTo(
        '.section-header',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [headerInView]);
React.useEffect(() => {
  if (buttonsInView) {
    // Use a selector instead of trying to access .current
    gsap.fromTo(
      '.category-button',
      { opacity: 0, y: 10 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.05, 
        duration: 0.4, 
        ease: 'power2.out' 
      }
    );
  }
}, [buttonsInView]);
  
  return (
    <div ref={tipsRef} className="space-y-8 will-change-transform">
      <h3 
        ref={headerRef} 
        className="section-header font-serif text-2xl mb-6"
      >
        Expert Travel Tips & Advice
      </h3>
      
      <div ref={buttonsRef} className="flex flex-wrap gap-2 mb-8">
        <CategoryButton
          category="all"
          selectedCategory={selectedCategory}
          onClick={handleCategorySelect}
          isAllCategory={true}
        />
        
        {uniqueCategories.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            selectedCategory={selectedCategory}
            onClick={handleCategorySelect}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map((tip, index) => (
          <TipCard 
            key={tip.id} 
            tip={tip} 
            index={index} 
          />
        ))}
      </div>
      
      <SubscriptionForm />
    </div>
  );
};

export default React.memo(TravelTips);
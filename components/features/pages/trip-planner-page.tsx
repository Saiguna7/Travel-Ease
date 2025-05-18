
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TravelPlanner } from '@/components/features/planner/TravelPanner';
import { MapIcon, CalendarIcon, CheckSquareIcon } from 'lucide-react';

export function TripPlannerPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    
    const tl = gsap.timeline();
    
    tl.fromTo(
      '.page-header',
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    );
    
    tl.fromTo(
      '.page-description',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4' 
    );
    
    tl.fromTo(
      '.feature-item',
      { opacity: 0, x: -20 },
      { 
        opacity: 1, 
        x: 0, 
        stagger: 0.15, 
        duration: 0.5, 
        ease: 'power3.out' 
      },
      '-=0.3'
    );
    

    tl.fromTo(
      '.planner-content',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen">

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="page-header text-4xl md:text-5xl font-serif font-bold mb-6">
              Plan Your Perfect Trip
            </h1>
            <p className="page-description text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Organize your travel itinerary, manage activities, and keep track of your adventure 
              from departure to return with our intuitive planning tools.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <div className="feature-item flex flex-col items-center p-4 bg-background rounded-lg shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Day-by-Day Planning</h3>
                <p className="text-muted-foreground text-center">
                  Create detailed itineraries for each day of your trip
                </p>
              </div>
              
              <div className="feature-item flex flex-col items-center p-4 bg-background rounded-lg shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <CheckSquareIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Activity Management</h3>
                <p className="text-muted-foreground text-center">
                  Add, organize and prioritize activities for each day
                </p>
              </div>
              
              <div className="feature-item flex flex-col items-center p-4 bg-background rounded-lg shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <MapIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Trip Overview</h3>
                <p className="text-muted-foreground text-center">
                  Get a clear overview of your entire journey in one place
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="planner-content">
            <TravelPlanner />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              Trip Planning Tips
            </h2>
            
            <div className="bg-background rounded-lg shadow-md p-6 md:p-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="text-primary mr-3 mt-1">•</div>
                  <p>
                    <span className="font-medium">Plan Your Must-See Attractions:</span>{' '}
                    Research and prioritize the key attractions in your destination. Schedule these across 
                    your trip to avoid missing out on experiences that require advance booking.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-3 mt-1">•</div>
                  <p>
                    <span className="font-medium">Balance Your Days:</span>{' '}
                    Avoid overloading each day with activities. Build in rest periods and free time to 
                    explore at your own pace or discover unexpected treasures.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-3 mt-1">•</div>
                  <p>
                    <span className="font-medium">Consider Travel Times:</span>{' '}
                    Factor in travel times between locations when planning your daily activities. 
                    Group activities by geographic proximity to minimize transit time.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-3 mt-1">•</div>
                  <p>
                    <span className="font-medium">Check Opening Hours and Special Events:</span>{' '}
                    Verify the opening hours of attractions and check for any local events or holidays 
                    that might affect your plans.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="text-primary mr-3 mt-1">•</div>
                  <p>
                    <span className="font-medium">Plan for Weather Contingencies:</span>{' '}
                    Have indoor and outdoor options for each day to adapt to unexpected weather changes.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
// components/features/planner/TravelPlanner.tsx
import { useState } from 'react';
import { gsap } from 'gsap';
import { TripCountdown } from './TripCountdwon'; // Fixed typo
import { DailyPlanner } from './DailyPlanner';

// Define shared types
interface Activity {
  id: string;
  title: string;
  time: string;
  description: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
}

interface TripDay {
  date: Date;
  notes: string;
  activities: Activity[];
}

export const TravelPlanner: React.FC = () => {
  const [tripDate, setTripDate] = useState<Date>(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)); 
  const [destination, setDestination] = useState<string>('Santorini');

  const tripDuration = 7; 
  const generateTripDays = (): TripDay[] => {
    const days: TripDay[] = [];
    const startDate = new Date(tripDate);
    
    for (let i = 0; i < tripDuration; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      days.push({
        date: currentDate,
        notes: '',
        activities: [] as Activity[],
      });
    }
    
    return days;
  };
  
  const [tripDays, setTripDays] = useState<TripDay[]>(generateTripDays());
  
  const updateTripInfo = (newDate: Date, newDestination: string) => {
    const tl = gsap.timeline();
    
    tl.to('.trip-content', {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        setTripDate(newDate);
        setDestination(newDestination);
        setTripDays(generateTripDays());
        
        // Animate the content back in
        gsap.to('.trip-content', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      },
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-5">
        <div className="trip-content">
          <TripCountdown 
            tripDate={tripDate} 
            destination={destination} 
          />
          
          <div className="mt-8 dark:bg-gray-800 bg-primary text-white  p-6 rounded-sm shadow-md">
            <h3 className="font-serif text-xl mb-4">Trip Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block dark:text-gray-400 mb-2" htmlFor="tripDate">
                  Departure Date
                </label>
                <input
                  id="tripDate"
                  type="date"
                  value={tripDate.toISOString().split('T')[0]}
                  onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    updateTripInfo(newDate, destination);
                  }}
                  className="w-full p-3 border   border-gray-300 border-solid rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block dark:text-gray mb-2" htmlFor="destination">
                  Destination
                </label>
                <input
                  id="destination"
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    updateTripInfo(tripDate, e.target.value);
                  }}
                  className="w-full p-3 border border-gray-300 border-solid rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block dark:text-gray mb-2" htmlFor="duration">
                  Duration (days)
                </label>
                <div className="flex items-center">
                  <input
                    id="duration"
                    type="number"
                    min="1"
                    max="30"
                    value={tripDuration}
                    readOnly
                    className="w-full p-3 border border-gray-300 border-solid rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                  <div className="ml-4 text-xs dark:text-gray text-white">
                    (Set to {tripDuration} days for demo)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-7">
        <div className="trip-content">
          <DailyPlanner 
            tripDays={tripDays} 
            onUpdateTripDays={setTripDays} 
          />
        </div>
      </div>
    </div>
  );
};
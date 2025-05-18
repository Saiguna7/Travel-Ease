import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

interface TripCountdownProps {
  tripDate: Date;
  destination: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const TripCountdown: React.FC<TripCountdownProps> = ({
  tripDate,
  destination,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  const daysRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);
  
  // Calculate time left
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +tripDate - +new Date();
      let newTimeLeft: TimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      
      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      
      setTimeLeft(newTimeLeft);
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [tripDate]);
  
  // Animate countdown
  useEffect(() => {
    // Fixed function - Either use the value or remove it as a parameter
    const animateNumber = (ref: React.RefObject<HTMLDivElement| null>) => {
      if (!ref.current) return;
      
      gsap.fromTo(
        ref.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    };
    
    // Now just pass the refs without the values
    animateNumber(daysRef);
    animateNumber(hoursRef);
    animateNumber(minutesRef);
    animateNumber(secondsRef);
  }, [timeLeft]);
  
  return (
    <div className="bg-primary text-white dark:text-white  dark:bg-gray-800 p-8 rounded-sm">
      <h3 className="font-serif text-2xl mb-2 dark:font-bold">
        Your Trip to {destination}
      </h3>
      <p className="text-white/80 mb-8">
        {tripDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div
            ref={daysRef}
            className="bg-white/20 rounded-sm p-4 font-serif text-4xl mb-2"
          >
            {timeLeft.days}
          </div>
          <span className="text-sm uppercase tracking-wider">Days</span>
        </div>
        
        <div className="text-center">
          <div
            ref={hoursRef}
            className="bg-white/20 rounded-sm p-4 font-serif text-4xl mb-2"
          >
            {timeLeft.hours}
          </div>
          <span className="text-sm uppercase tracking-wider">Hours</span>
        </div>
        
        <div className="text-center">
          <div
            ref={minutesRef}
            className="bg-white/20 rounded-sm p-4 font-serif text-4xl mb-2"
          >
            {timeLeft.minutes}
          </div>
          <span className="text-sm uppercase tracking-wider">Minutes</span>
        </div>
        
        <div className="text-center">
          <div
            ref={secondsRef}
            className="bg-white/20 rounded-sm p-4 font-serif text-4xl mb-2"
          >
            {timeLeft.seconds}
          </div>
          <span className="text-sm uppercase tracking-wider">Seconds</span>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link href={`/planner`} className="bg-secondary dark:bg-gray-500   text-primary px-8 py-3 rounded-sm hover:bg-white/90 transition-colors">
          View Itinerary
        </Link>
      </div>
    </div>
  );
};
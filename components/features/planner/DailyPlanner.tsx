import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import gsap from 'gsap';

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

interface DailyPlannerProps {
  tripDays: TripDay[];
  onUpdateTripDays: Dispatch<SetStateAction<TripDay[]>>;
}

export const DailyPlanner: React.FC<DailyPlannerProps> = ({
  tripDays,
  onUpdateTripDays,
}) => {
  const [activeDay, setActiveDay] = useState<number>(0);
  const plannerRef = useRef<HTMLDivElement>(null);
  
  const addActivity = () => {
    const updatedDays = [...tripDays];
    const newActivity: Activity = {
      id: `activity-${Date.now()}`,
      title: 'New Activity',
      time: '12:00',
      description: 'Add description here',
      location: '',
      priority: 'medium',
    };
    
    updatedDays[activeDay].activities.push(newActivity);
    onUpdateTripDays(updatedDays);
    setTimeout(() => {
      const newElement = document.getElementById(newActivity.id);
      
      if (newElement) {
        gsap.from(newElement, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    }, 0);
  };
  

  const updateNotes = (notes: string) => {
    const updatedDays = [...tripDays];
    updatedDays[activeDay].notes = notes;
    onUpdateTripDays(updatedDays);
  };
  
  const updateActivity = (activityId: string, field: keyof Activity, value: string) => {
    const updatedDays = [...tripDays];
    const activityIndex = updatedDays[activeDay].activities.findIndex(
      (activity) => activity.id === activityId
    );
    
    if (activityIndex !== -1) {
      updatedDays[activeDay].activities[activityIndex] = {
        ...updatedDays[activeDay].activities[activityIndex],
        [field]: value,
      };
      
      onUpdateTripDays(updatedDays);
    }
  };
  

  const deleteActivity = (activityId: string) => {
    const element = document.getElementById(activityId);
    
    if (element) {
      gsap.to(element, {
        opacity: 0,
        height: 0,
        padding: 0,
        marginBottom: 0,
        duration: 0.3,
        onComplete: () => {
          const updatedDays = [...tripDays];
          updatedDays[activeDay].activities = updatedDays[activeDay].activities.filter(
            (activity) => activity.id !== activityId
          );
          
          onUpdateTripDays(updatedDays);
        },
      });
    }
  };

  useEffect(() => {
    if (!plannerRef.current) return;
    
    const element = plannerRef.current.querySelector('.day-content');
    if (!element) return;
    
    const tl = gsap.timeline();
    
    tl.to(element, {
      opacity: 0,
      y: 20,
      duration: 0.3,
    }).then(() => {
      if (plannerRef.current) {
        const updatedElement = plannerRef.current.querySelector('.day-content');
        if (updatedElement) {
          gsap.to(updatedElement, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          });
        }
      }
    });
  }, [activeDay]);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div ref={plannerRef} className="bg-primary dark:bg-gray-800 rounded-sm shadow-md p-6">
      <h3 className="font-serif text-2xl mb-6 text-white font-bold">Daily Planner</h3>
      
      <div className="flex overflow-x-auto pb-4 mb-6 space-x-2">
        {tripDays.map((day, index) => (
          <button
            key={index}
            onClick={() => setActiveDay(index)}
            className={`whitespace-nowrap px-4 py-2 rounded-sm transition-colors ${
              activeDay === index
                ? 'bg-secondary text-primary'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {formatDate(day.date)}
          </button>
        ))}
      </div>
      <div className="day-content">
        <div className="flex justify-between dark:text-primary/80 text-white items-center mb-6">
          <h4 className="font-serif text-xl">
            {formatDate(tripDays[activeDay].date)}
          </h4>
          
          <button
            onClick={addActivity}
            className="bg-secondary custom-pointer  text-primary px-4 py-2 rounded-sm hover:bg-secondary/90 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add Activity</span>
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block dark:text-primary/80 text-white mb-2" htmlFor="dayNotes">
            Day Notes
          </label>
          <textarea
            id="dayNotes"
            value={tripDays[activeDay].notes}
            onChange={(e) => updateNotes(e.target.value)}
            placeholder="Add notes for this day..."
            className="w-full p-3 border text-white border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary min-h-[100px]"
          />
        </div>

        <div>
          <h5 className="font-serif text-lg mb-4 text-white dark:text-primary/80">Activities</h5>
          
          {tripDays[activeDay].activities.length === 0 ? (
            <div className="text-center   py-8 bg-gray-50 rounded-sm border border-dashed border-gray-300">
              <p className="text-gray-500">No activities planned for this day.</p>
              <button
                onClick={addActivity}
                className="custom-pointer mt-4 text-primary dark:text-black hover:underline"
              >
                Add an activity
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {tripDays[activeDay].activities.map((activity) => (
                <div
                  id={activity.id}
                  key={activity.id}
                  className="border border-gray-200 rounded-sm p-4"
                >
                  <div className="flex justify-between items-start mb-4 text-white">
                    <div className="flex-grow">
                      <input
                        type="text"
                        value={activity.title}
                        onChange={(e) => updateActivity(activity.id, 'title', e.target.value)}
                        className="w-full text-lg font-medium border-b border-transparent focus:border-gray-300 focus:outline-none pb-1"
                        placeholder="Activity title"
                      />
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <select
                        value={activity.priority}
                        onChange={(e) => updateActivity(
                          activity.id, 
                          'priority', 
                          e.target.value as 'high' | 'medium' | 'low'
                        )}
                        className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(activity.priority)}`}
                      >
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                      </select>
                      
                      <button
                        onClick={() => deleteActivity(activity.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        value={activity.time}
                        onChange={(e) => updateActivity(activity.id, 'time', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={activity.location}
                        onChange={(e) => updateActivity(activity.id, 'location', e.target.value)}
                        placeholder="Enter location"
                        className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Description
                    </label>
                    <textarea
                      value={activity.description}
                      onChange={(e) => updateActivity(activity.id, 'description', e.target.value)}
                      placeholder="Describe this activity..."
                      className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary min-h-[60px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
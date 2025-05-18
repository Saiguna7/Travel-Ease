// components/features/moodboard/MoodboardBuilder.tsx
import { useState, useRef, useEffect, Key } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import { mockStickers } from '@/data/mockStickers';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Sticker } from '@/types/sticker';

gsap.registerPlugin(Draggable);

interface PlacedSticker {
  id: string;
  imageUrl: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  zIndex: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night' | 'anytime';
}

export const MoodboardBuilder: React.FC = () => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night' | 'anytime'>('anytime');
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [selectedBackground, setSelectedBackground] = useState('/images/backgrounds/beach.jpg');
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const stickersRef = useRef<HTMLDivElement>(null);
  
  // Filter stickers by time of day
  const filteredStickers = mockStickers.filter(
    (sticker) => sticker.timeOfDay === timeOfDay || sticker.timeOfDay === 'anytime'
  );
  
  // Initialize Draggable for placed stickers
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const stickerElements = canvasRef.current.querySelectorAll('.placed-sticker');
    
    stickerElements.forEach((element) => {
      Draggable.create(element, {
        type: 'x,y',
        bounds: canvasRef.current,
        onDragEnd: function() {
          const id = this.target.getAttribute('data-id');
          setPlacedStickers((prev) =>
            prev.map((sticker) =>
              sticker.id === id
                ? { ...sticker, x: this.x, y: this.y }
                : sticker
            )
          );
        },
      });
    });
  }, [placedStickers]);
  
  // Handle sticker selection
  const handleStickerClick = (sticker: typeof mockStickers[0]) => {
    // Generate a random position within canvas bounds
    const canvasBounds = canvasRef.current?.getBoundingClientRect();
    
    if (canvasBounds) {
      const newSticker: PlacedSticker = {
        id: `sticker-${Date.now()}`,
        imageUrl: sticker.imageUrl,
        x: Math.random() * (canvasBounds.width - 100),
        y: Math.random() * (canvasBounds.height - 100),
        rotation: Math.random() * 30 - 15, // Random rotation between -15 and 15 degrees
        scale: 1,
        zIndex: placedStickers.length + 1,
        timeOfDay: sticker.timeOfDay,
      };
      
      setPlacedStickers((prev) => [...prev, newSticker]);
      
      // Animate the new sticker
      setTimeout(() => {
        const newElement = document.getElementById(newSticker.id);
        
        if (newElement) {
          gsap.from(newElement, {
            scale: 0.5,
            opacity: 0,
            rotation: newSticker.rotation - 10,
            duration: 0.5,
            ease: 'back.out(1.7)',
          });
        }
      }, 0);
    }
  };
  
  // Handle sticker rotation
  const handleRotateSticker = (id: string, direction: 'left' | 'right') => {
    setPlacedStickers((prev) =>
      prev.map((sticker) => {
        if (sticker.id === id) {
          const newRotation = sticker.rotation + (direction === 'left' ? -15 : 15);
          
          gsap.to(`#${id}`, {
            rotation: newRotation,
            duration: 0.3,
            ease: 'power2.out',
          });
          
          return { ...sticker, rotation: newRotation };
        }
        return sticker;
      })
    );
  };
  
  // Handle sticker scale
  const handleScaleSticker = (id: string, direction: 'up' | 'down') => {
    setPlacedStickers((prev) =>
      prev.map((sticker) => {
        if (sticker.id === id) {
          const newScale = sticker.scale + (direction === 'up' ? 0.1 : -0.1);
          
          gsap.to(`#${id}`, {
            scale: newScale,
            duration: 0.3,
            ease: 'power2.out',
          });
          
          return { ...sticker, scale: newScale };
        }
        return sticker;
      })
    );
  };
  
  // Handle sticker deletion
  const handleDeleteSticker = (id: string) => {
    // Animate deletion
    gsap.to(`#${id}`, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setPlacedStickers((prev) => prev.filter((sticker) => sticker.id !== id));
      },
    });
  };
  
  // Handle time of day change
  const handleTimeOfDayChange = (newTime: typeof timeOfDay) => {
    // Animate the sticker panel
    gsap.to(stickersRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        setTimeOfDay(newTime);
        
        gsap.to(stickersRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      },
    });
  };
  
  // Handle background change
  const handleBackgroundChange = (backgroundUrl: string) => {
    gsap.to(canvasRef.current, {
      opacity: 0.7,
      duration: 0.3,
      onComplete: () => {
        setSelectedBackground(backgroundUrl);
        
        gsap.to(canvasRef.current, {
          opacity: 1,
          duration: 0.5,
        });
      },
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Sidebar with stickers and options */}
      <div className="md:col-span-3">
        <div className="bg-white rounded-sm shadow-md p-6 mb-6">
          <h3 className="font-serif text-xl mb-4">Time of Day</h3>
          <div className="space-y-2">
            {['morning', 'afternoon', 'evening', 'night', 'anytime'].map((time) => (
              <button
                key={time}
                className={`w-full py-2 px-4 rounded-sm text-left capitalize ${
                  timeOfDay === time
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 transition-colors'
                }`}
                onClick={() => handleTimeOfDayChange(time as typeof timeOfDay)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-sm shadow-md p-6 mb-6">
          <h3 className="font-serif text-xl mb-4">Backgrounds</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              '/images/backgrounds/beach.jpg',
              '/images/backgrounds/mountains.jpg',
              '/images/backgrounds/city.jpg',
              '/images/backgrounds/forest.jpg',
            ].map((bg) => (
              <button
                key={bg}
                className={`relative h-20 rounded-sm overflow-hidden ${
                  selectedBackground === bg ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleBackgroundChange(bg)}
              >
                <Image
                  src={bg}
                  alt="Background"
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        <div ref={stickersRef} className="bg-white rounded-sm shadow-md p-6">
          <h3 className="font-serif text-xl mb-4">Stickers</h3>
          <div className="grid grid-cols-3 gap-2">
            {filteredStickers.map((sticker: { id: Key | null | undefined; imageUrl: string | StaticImport; }) => (
              <button
                key={sticker.id}
                className="p-2 bg-gray-50 rounded-sm hover:bg-gray-100 transition-colors"
                onClick={() => handleStickerClick(sticker as Sticker)}
              >
                <div className="relative h-16">
                  <Image
                    src={sticker.imageUrl}
                    alt="Sticker"
                    fill
                    className="object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main canvas area */}
      <div className="md:col-span-9">
        <div className="bg-white rounded-sm shadow-md p-4">
          <div
            ref={canvasRef}
            className="relative w-full h-[600px] rounded-sm overflow-hidden"
            style={{
              backgroundImage: `url(${selectedBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {placedStickers.map((sticker) => (
              <div
                id={sticker.id}
                key={sticker.id}
                data-id={sticker.id}
                className="placed-sticker absolute cursor-move"
                style={{
                  left: `${sticker.x}px`,
                  top: `${sticker.y}px`,
                  transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
                  zIndex: sticker.zIndex,
                }}
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={sticker.imageUrl}
                    alt="Sticker"
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRotateSticker(sticker.id, 'left');
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRotateSticker(sticker.id, 'right');
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScaleSticker(sticker.id, 'up');
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScaleSticker(sticker.id, 'down');
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 12H6"
                      />
                    </svg>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSticker(sticker.id);
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-100 text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setPlacedStickers([])}
              className="px-4 py-2 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
            
            <button className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors">
              Save Moodboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
'use client';
import { useRef, useEffect } from 'react';
import { XIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import gsap from 'gsap';
import { createPortal } from 'react-dom';

interface DialogProps {
  isOpen: boolean;
  onCloseAction: () => void;
  title: string;
  imageUrl: StaticImageData ;  
  children: React.ReactNode;
}

export function Dialog({ isOpen, onCloseAction, title, imageUrl, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCloseAction();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCloseAction]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && dialogRef.current && contentRef.current) {
      gsap.fromTo(
        dialogRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.inOut' }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    if (dialogRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        y: 50, 
        opacity: 0, 
        duration: 0.3, 
        ease: 'power2.in'
      });
      
      gsap.to(dialogRef.current, {
        opacity: 0, 
        duration: 0.3, 
        ease: 'power2.in',
        onComplete: onCloseAction
      });
    } else {
      onCloseAction();
    }
  };

  if (!isOpen) return null;
  return createPortal(
    <div 
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div 
        ref={contentRef}
        className="w-full max-w-2xl bg-card rounded-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-48 md:h-64">
          <Image
            src={imageUrl}
            alt={title}
            fill
            placeholder="blur"
            className="object-cover"
          />
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close dialog"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <h2 id="dialog-title" className="text-2xl font-serif font-bold mb-4">{title}</h2>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
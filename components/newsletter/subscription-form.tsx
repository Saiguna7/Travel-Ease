// src/components/newsletter/subscription-form.tsx
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { SendIcon, CheckIcon, AlertCircle } from 'lucide-react';
import ReactConfetti from 'react-confetti';
import { validateEmail } from '@/schema/ValidateEmail';

export function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.form-element',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
      );
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('submitting');

    try {
      // Make a real API call to our subscribe endpoint
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      setStatus('success');
      setShowConfetti(true);
      setEmail('');

      setTimeout(() => {
        setShowConfetti(false);
      }, 7000);
      
      setTimeout(() => {
        setStatus('idle');
      }, 8000);
      
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    }
  };

  const animateSuccess = useCallback(() => {
    if (status === 'success' && formRef.current) {
      gsap.fromTo(
        '.success-message',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  },[status])

  useEffect(() => {
    animateSuccess();
  }, [animateSuccess, status]);

  return (
    <div 
      ref={formRef} 
      className="w-full max-w-2xl mx-auto bg-card border border-border p-8 rounded-lg shadow-lg neon:glow-box relative overflow-hidden"
    >
      {showConfetti && (
        <div className="absolute inset-0 z-50 overflow-hidden">
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={800}
            gravity={0.15}
            initialVelocityY={20}
            tweenDuration={5000}
            colors={['#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4']}
          />
        </div>
      )}
      
      <div className="text-center mb-8">
        <h2 className="form-element text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground neon:glow-text">
          Get Travel Inspiration
        </h2>
        <p className="form-element text-muted-foreground text-lg">
          Subscribe to our newsletter for travel tips, destination guides, and exclusive deals.
        </p>
      </div>

      {status === 'success' ? (
        <div className="success-message text-center py-6">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            You&apos;ve been subscribed to our newsletter. Check your inbox for travel inspiration soon!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-element relative">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') {
                  setStatus('idle');
                  setErrorMessage('');
                }
              }}
              className={`w-full px-4 py-3 rounded-md bg-background border text-white ${
                status === 'error' ? 'border-destructive' : 'border-border'
              } focus:outline-none focus:ring-2 focus:ring-primary/50`}
              disabled={status === 'submitting'}
              aria-invalid={status === 'error'}
              aria-describedby={status === 'error' ? "email-error" : undefined}
            />
            {status === 'error' && (
              <div className="flex items-center text-destructive text-sm mt-1" id="email-error">
                <AlertCircle className="h-4 w-4 mr-1" />
                <p>{errorMessage}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'submitting' || email.trim() === ''}
            className={`form-element w-full rounded-md px-4 py-3 font-medium flex items-center justify-center transition-colors ${
              email.trim() === '' 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90 neon:glow-button'
            }`}
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </>
            ) : (
              <>
                <SendIcon className="mr-2 h-4 w-4" />
                Subscribe
              </>
            )}
          </button>

          <p className="form-element text-center text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      )}
    </div>
  );
}
"use client";

import { useCallback, useEffect, useRef } from "react";
import { useAnimationContext } from "./animation-provider";
import gsap from "gsap";
import BG from '@/videos/3.mp4.json'
import BackgroundVideo from 'next-video/background-video'

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.7)"
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1
  },
  textContainer: {
    textAlign: "center",
    color: "white",
    zIndex: 10
  },
  heading: {
    fontSize: "4rem", 
    fontWeight: "bold",
    margin: 0,
    textShadow: "2px 2px 8px rgba(0,0,0,0.7)"
  }
};

export function WelcomeAnimation() {
  const { setIsWelcomeComplete } = useAnimationContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoLoaded = useRef<boolean>(false);
  const animationStarted = useRef<boolean>(false);

  const handleVideoLoaded = () => {
    console.log("Welcome video loaded successfully");
    videoLoaded.current = true;
    if (!animationStarted.current) {
      startAnimation();
    }
  };

  const startAnimation = useCallback(() => {
    if (animationStarted.current) return;
    
    animationStarted.current = true;
    console.log("Starting welcome animation sequence");
    
    const tl = gsap.timeline({
      onComplete: () => {
        console.log("Welcome animation timeline completed");
  
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          onComplete: () => {
            console.log("Welcome animation complete, transitioning to main content");
            setIsWelcomeComplete(true);
          }
        });
      }
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    )
    .to(textRef.current, { 
      scale: 1.2,
      duration: 2.5, 
      ease: "power1.inOut" 
    })
    .to(textRef.current, { 
      opacity: 0, 
      y: -30, 
      duration: 1, 
      ease: "power3.out" 
    });
  }, [setIsWelcomeComplete]);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!videoLoaded.current && !animationStarted.current) {
        console.log("Fallback timer triggered - starting animation");
        startAnimation();
      }
    }, 3000); 

    return () => clearTimeout(fallbackTimer);
  }, [startAnimation]);

  return (
    <div ref={containerRef} style={styles.container as React.CSSProperties}>
      <div className="absolute inset-0 -z-2">
        <div className="absolute inset-0  bg-[##102C54] opacity-[0.8]" />
      </div>
      <BackgroundVideo
        src={BG as unknown as string}
        autoPlay
        muted
        style={styles.video as React.CSSProperties}
        onLoadedData={handleVideoLoaded}
      />
      
      <div ref={textRef} style={styles.textContainer as React.CSSProperties}>
        <h1 style={styles.heading as React.CSSProperties}>
          Welcome to Travel Explorer
        </h1>
      </div>
    </div>
  );
}
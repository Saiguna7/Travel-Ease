"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { WelcomeAnimation } from "./welcome-animation";

interface AnimationContextType {
  isFirstVisit: boolean;
  isWelcomeComplete: boolean;
  setIsWelcomeComplete: (value: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function useAnimationContext() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimationContext must be used within an AnimationProvider");
  }
  return context;
}

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  const [isWelcomeComplete, setIsWelcomeComplete] = useState<boolean>(true); // Set to true initially
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    
    const visited = localStorage.getItem("visited-travel-explorer");
    
    if (visited) {
      setIsFirstVisit(false);
      setIsWelcomeComplete(true);
      console.log("Returning visitor - skipping welcome animation");
    } else {
      localStorage.setItem("visited-travel-explorer", "true");
      setIsFirstVisit(true);
      setIsWelcomeComplete(false);
      console.log("First-time visitor - showing welcome animation");
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <AnimationContext.Provider value={{ isFirstVisit, isWelcomeComplete, setIsWelcomeComplete }}>
      {isFirstVisit && !isWelcomeComplete && <WelcomeAnimation />}
      <div className={`opacity-[${(isFirstVisit && !isWelcomeComplete) ? 0 : 1}] visible-${(isFirstVisit && !isWelcomeComplete) ?"hidden" : "visible"} transition-opacity duration-800 ease-in-out`}>
        {children}
      </div>
    </AnimationContext.Provider>
  );
}
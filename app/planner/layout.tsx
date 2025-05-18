import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'Trip Planner | TravelEase',
    description: 'Plan your perfect trip itinerary with day-by-day activities, countdown timer, and helpful travel tools.',
  };
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
     {children} 
    </>
  )
}

export default layout

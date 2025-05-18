import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: "Destinations - Travel Explorer",
    description: "Explore the world's most breathtaking places and start planning your next unforgettable journey.",
  };
const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
      {children}
    </>
  )
}

export default layout

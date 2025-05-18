

'use client';
import dynamic from 'next/dynamic';

const TripPlannerPage = dynamic(() => import('@/components/features/pages/trip-planner-page').then((mod)=>mod.TripPlannerPage), { ssr: false });

export default function PlannerPage() {
  return <TripPlannerPage />;
}
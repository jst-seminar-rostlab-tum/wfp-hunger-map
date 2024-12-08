'use client';

import dynamic from 'next/dynamic';

import MapLegendSkeleton from '@/components/Legend/MapLegendSkeleton';

const LazyMapLegendLoader = dynamic(() => import('@/components/Legend/MapLegend'), {
  ssr: false,
  loading: () => <MapLegendSkeleton />,
});

export default function HungerAlertLoader() {
  return <LazyMapLegendLoader />;
}

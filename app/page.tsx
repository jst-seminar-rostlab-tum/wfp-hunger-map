'use client';

import dynamic from 'next/dynamic';

import MapSkeleton from '@/components/Map/MapSkeleton';

const LazyMap = dynamic(() => import('@/components/Map/Map'), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

export default async function Home() {
  return <LazyMap />;
}

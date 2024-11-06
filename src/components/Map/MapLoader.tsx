'use client';

import dynamic from 'next/dynamic';

import MapSkeleton from '@/components/Map/MapSkeleton';
import { MapProps } from '@/domain/props/MapProps';

const LazyMap = dynamic(() => import('@/components/Map/Map'), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

export default function MapLoader(props: MapProps) {
  return <LazyMap {...props} />;
}

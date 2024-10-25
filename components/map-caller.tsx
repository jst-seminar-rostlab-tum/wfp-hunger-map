'use client';

import dynamic from 'next/dynamic';

const LazyMap = dynamic(() => import('@/components/map.tsx'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

function MapCaller() {
  return <LazyMap />;
}

export default MapCaller;

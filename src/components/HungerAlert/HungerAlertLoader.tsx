'use client';

import dynamic from 'next/dynamic';

import HungerAlertSkeleton from '@/components/HungerAlert/HungerAlertSkeleton';
import HungerAlertProps from '@/domain/props/HungerAlertProps';

const LazyHungerAlertLoader = dynamic(() => import('@/components/HungerAlert/HungerAlert'), {
  ssr: false,
  loading: () => <HungerAlertSkeleton />,
});

export default function HungerAlertLoader(props: HungerAlertProps) {
  return <LazyHungerAlertLoader {...props} />;
}

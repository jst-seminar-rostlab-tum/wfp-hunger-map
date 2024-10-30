import { Suspense } from 'react';

import { ClientChart } from '@/components/Charts/ClientChart';

import Providers from './providers';
/**
 * You can use this page to try and show off your components.
 * It's not accessible from the UI, but you can reach it by manually navigating to /elements
 */

export default function Elements() {
  return (
    <Suspense fallback={<div className="w-full h-full flex justify-center items-center">Loading...</div>}>
      <Providers>
        <ClientChart />
      </Providers>
    </Suspense>
  );
}

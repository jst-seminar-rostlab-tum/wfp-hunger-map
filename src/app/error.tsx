'use client';

import { useEffect } from 'react';

import { CustomButton } from '@/components/Buttons/CustomButton';
import { Topbar } from '@/components/Topbar/Topbar';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex h-full flex-col items-center justify-center gap-2 text-content">
        <section className="text-center">
          <h2 className="text-xl font-semibold">An Error Occurred</h2>
          <p>Please try again or go back to the Home page.</p>
        </section>
        <div className="flex flex-row gap-2 mt-4">
          <CustomButton variant="solid" size="lg" onClick={() => reset()}>
            Try again
          </CustomButton>
          <a href="/">
            <CustomButton variant="solid" size="lg">
              Go to Home page
            </CustomButton>
          </a>
        </div>
      </div>
    </div>
  );
}

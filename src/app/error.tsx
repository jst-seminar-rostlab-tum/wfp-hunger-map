'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { CustomButton } from '@/components/Buttons/CustomButton';
import { Topbar } from '@/components/Topbar/Topbar';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  const router = useRouter();

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
          <CustomButton variant="solid" size="lg" onPress={() => router.back()}>
            Go Back
          </CustomButton>
          <CustomButton variant="solid" size="lg" onPress={() => window.location.reload()}>
            Reload Page
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

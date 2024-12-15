'use client';

import { CustomButton } from '@/components/Buttons/CustomButton';
import { Topbar } from '@/components/Topbar/Topbar';

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <main className="flex h-full flex-col items-center justify-center gap-2 text-content">
        <section className="text-center">
          <h2 className="text-xl font-semibold">Ooops</h2>
          <p>The requested page could not be found.</p>
        </section>
        <div className="flex flex-row gap-2 mt-4">
          <a href="/">
            <CustomButton variant="solid" size="lg">
              Go to Home page
            </CustomButton>
          </a>
        </div>
      </main>
    </div>
  );
}

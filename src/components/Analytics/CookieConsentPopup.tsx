'use client';

import { useEffect, useState } from 'react';

import { CustomButton } from '../Buttons/CustomButton';

/**
 * Always rendered component that handles Google Analytics tracking. If the cookie_consent local storage key is not set,
 * it renders a popup. The user's choice is saved in local storage. If the user grants consent or the value of the
 * local storage is true when the page loads, it dynamically loads the Google Analytics third-party script, starting the tracking.
 */
export function CookieConsentPopup() {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedCookieConsent = localStorage.getItem('cookie_consent');
    if (storedCookieConsent) {
      setCookieConsent(storedCookieConsent === 'true');
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (cookieConsent !== null) {
      localStorage.setItem('cookie_consent', `${cookieConsent}`);
      if (cookieConsent) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
        });
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
        gtagScript.nonce = document.getElementById('google-analytics')?.nonce;

        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode?.insertBefore(gtagScript, firstScript);
      }
    }
  }, [cookieConsent]);

  if (cookieConsent !== null || !loaded) return null;
  return (
    <div className="fixed bottom-8 lg:bottom-4 left-1/2 p-4 items-center -translate-x-1/2 mx-auto rounded-md bg-content2 flex gap-2 justify-between z-cookieConsent w-full lg:w-2/5">
      <p className="text-xs">
        We use cookies to gather anonymized website traffic data to improve user experience. No personal information is
        collected or shared.
      </p>
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-2">
        <CustomButton size="sm" color="secondary" className="text-content1" onClick={() => setCookieConsent(false)}>
          Decline
        </CustomButton>
        <CustomButton
          color="secondary"
          size="sm"
          className="-order-1 md:order-2 lg:-order-1 xl:order-2 text-content1"
          onClick={() => setCookieConsent(true)}
        >
          Allow Analytics
        </CustomButton>
      </div>
    </div>
  );
}

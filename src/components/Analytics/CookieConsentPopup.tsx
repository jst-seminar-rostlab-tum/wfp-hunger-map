'use client';

import { useEffect, useState } from 'react';

import { CustomButton } from '../Buttons/CustomButton';

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

        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode?.insertBefore(gtagScript, firstScript);
      }
    }
  }, [cookieConsent]);

  return (
    cookieConsent === null &&
    loaded && (
      <div className="absolute bottom-4 left-1/2 p-4 items-center -translate-x-1/2 mx-auto rounded-md bg-content1 flex gap-2 justify-between z-cookieConsent w-full lg:w-2/5">
        <p>Allow use of cookies to track the traffic on the website?</p>
        <div className="flex gap-2">
          <CustomButton color="secondary" onClick={() => setCookieConsent(false)}>
            No
          </CustomButton>
          <CustomButton color="primary" onClick={() => setCookieConsent(true)}>
            Allow
          </CustomButton>
        </div>
      </div>
    )
  );
}

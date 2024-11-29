'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { CookieConsentPopup } from './CookieConsentPopup';

export default function AnalyticsContainer() {
  const [cookies] = useCookies(['cookie-consent']);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (typeof cookies['cookie-consent'] !== 'undefined') {
    return cookies['cookie-consent'] ? <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} /> : null;
  }

  return <CookieConsentPopup />;
}

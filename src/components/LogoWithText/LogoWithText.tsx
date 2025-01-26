import NextImage from 'next/image';
import NextLink from 'next/link';
import React from 'react';

/**
 * LogoWithText component renders the WFP HungerMap logo with text.
 * Includes the WFP logo image and "HungerMap LIVE" text next to it.
 * Links to the home page when clicked.
 *
 * @component
 * @returns {React.JSX.Element} A linked logo and text combination
 */
export function LogoWithText(): React.JSX.Element {
  return (
    <NextLink href="/">
      <div className="flex items-center gap-2">
        <NextImage unoptimized priority src="/wfp_logo.svg" alt="HungerMap" width={45} height={45} />

        <p className="font-bold text-lg">
          HungerMap <sup>LIVE</sup>
        </p>
      </div>
    </NextLink>
  );
}

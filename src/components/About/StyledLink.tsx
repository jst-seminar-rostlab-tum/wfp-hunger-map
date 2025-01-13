import { Link } from '@nextui-org/link';
import clsx from 'clsx';
import React, { ReactNode } from 'react';

/**
 * Display a custom styled NextUI link.
 *
 * External links are opened in a new tab and marked with `target="_blank"` and `rel="noopener noreferrer`.
 *
 * @param {string} href string to point to
 * @param {ReactNode} children the clickable content (typically some text)
 * @param {string} className custom class names
 * @param {boolean} internal whether the link is internal to the HungerMap site
 */
function StyledLink({
  href,
  children,
  className = '',
  isInternal = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  isInternal?: boolean;
}) {
  return (
    <Link
      isExternal={!isInternal}
      size="lg"
      underline="hover"
      href={href}
      className={clsx('inline text-link dark:text-link', className)}
    >
      {children}
    </Link>
  );
}

export default StyledLink;

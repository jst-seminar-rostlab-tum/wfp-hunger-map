import { Link } from '@nextui-org/link';
import clsx from 'clsx';
import React, { ReactNode } from 'react';

function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      isExternal
      size="lg"
      underline="hover"
      href={href}
      className={clsx('inline text-link dark:text-link', className)}
    >
      {children}
    </Link>
  );
}

export default ExternalLink;

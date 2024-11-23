import { Link } from '@nextui-org/link';
import clsx from 'clsx';
import React, { ReactNode } from 'react';

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
    <Link isExternal={!isInternal} size="lg" underline="hover" href={href} className={clsx('inline', className)}>
      {children}
    </Link>
  );
}

export default StyledLink;

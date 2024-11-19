import React from 'react';

import { CountryHoverPopoverProps } from '@/domain/props/CountryHoverPopoverProps';

export default function CountryHoverPopover({ header, details, summary }: CountryHoverPopoverProps) {
  return (
    <div className="p-4 bg-white dark:bg-black rounded-medium flex flex-col gap-2">
      {header && <h1 className="text-md font-semibold">{header}</h1>}
      {details && <p className="text-xs">{details}</p>}
      {summary && <p className="text-xs">{summary}</p>}
    </div>
  );
}

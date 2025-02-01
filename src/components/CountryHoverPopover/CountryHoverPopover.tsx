import React from 'react';

import { CountryHoverPopoverProps } from '@/domain/props/CountryHoverPopoverProps';
import { isIOSTouchDevice } from '@/utils/devices';

export default function CountryHoverPopover({ header, details, summary }: CountryHoverPopoverProps) {
  const headerOnly = header && !details && !summary;
  const mainBoxPadding = headerOnly ? 2 : 4;

  return (
    <div className={`p-${mainBoxPadding} bg-background text-foreground rounded-medium flex flex-col gap-2 z-[2000]`}>
      {header && <h1 className="text-sm font-semibold">{header}</h1>}
      {details && <p className="text-xs">{details}</p>}
      {summary && <p className="text-xs">{summary}</p>}
      {isIOSTouchDevice() && <span className="text-xs font-light">Tap again for details</span>}
    </div>
  );
}

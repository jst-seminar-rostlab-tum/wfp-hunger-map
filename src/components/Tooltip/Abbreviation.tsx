import React from 'react';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import abbreviations from '@/domain/constant/abbreviations';

function Abbreviation({ abbreviation }: { abbreviation: keyof typeof abbreviations }) {
  if (!abbreviations[abbreviation]) {
    return <span>{abbreviation}</span>;
  }

  return (
    <Tooltip text={abbreviations[abbreviation]}>
      <div className="inline cursor-help whitespace-nowrap">
        <span className="underline decoration-dotted decoration-2">{abbreviation}</span>
        <img src="/Images/InfoIcon.svg" alt="info icon" className="w-3 h-6 inline pb-3" />
      </div>
    </Tooltip>
  );
}

export default Abbreviation;

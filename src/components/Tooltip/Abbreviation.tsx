import React from 'react';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import abbreviations from '@/domain/constant/abbreviations';

import CustomInfoCircle from '../CustomInfoCircle/CustomInfoCircle';

function Abbreviation({ abbreviation }: { abbreviation: keyof typeof abbreviations }) {
  if (!abbreviations[abbreviation]) {
    return <span>{abbreviation}</span>;
  }

  return (
    <Tooltip text={abbreviations[abbreviation]}>
      <div className="inline cursor-help whitespace-nowrap">
        <span className="underline decoration-dotted decoration-2">{abbreviation}</span>
        <span className="w-3 h-6 inline pb-3">
          <CustomInfoCircle />
        </span>
      </div>
    </Tooltip>
  );
}

export default Abbreviation;

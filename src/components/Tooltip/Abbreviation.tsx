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
        <CustomInfoCircle className="w-4 h-6 inline pt-2" />
      </div>
    </Tooltip>
  );
}

export default Abbreviation;

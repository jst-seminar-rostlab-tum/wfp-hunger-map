import { useSearchParams } from 'next/navigation';
import React from 'react';
import Highlighter from 'react-highlight-words';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import abbreviations from '@/domain/constant/abbreviations';
import { getSearchWords } from '@/utils/searchUtils';

import CustomInfoCircle from '../CustomInfoCircle/CustomInfoCircle';

function Abbreviation({ abbreviation, searchable = true }: { abbreviation: string; searchable?: boolean }) {
  const searchParams = useSearchParams();
  let searchWords: string[] = [];
  if (searchable) searchWords = getSearchWords(searchParams.get('search') ?? '');

  if (!abbreviations[abbreviation]) {
    return <Highlighter textToHighlight={abbreviation} searchWords={searchWords} />;
  }

  return (
    <Tooltip text={abbreviations[abbreviation]}>
      <div className="inline cursor-help whitespace-nowrap">
        <Highlighter
          textToHighlight={abbreviation}
          searchWords={searchWords}
          className="underline decoration-dotted decoration-2"
        />
        <CustomInfoCircle className="w-4 h-6 inline pt-2" />
      </div>
    </Tooltip>
  );
}

export default Abbreviation;

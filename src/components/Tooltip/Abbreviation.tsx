import { useSearchParams } from 'next/navigation';
import React from 'react';
import Highlighter from 'react-highlight-words';

import { Tooltip } from '@/components/Tooltip/Tooltip';
import abbreviations from '@/domain/constant/abbreviations';
import { getSearchWords } from '@/utils/searchUtils';

import CustomInfoCircle from '../CustomInfoCircle/CustomInfoCircle';

/**
 * Render an abbreviation underlined and with a small info icon. Show a tooltip with the long form on hover.
 *
 * @param {string} abbreviation a key from the object in `domain/constant/abbreviations`
 * @param {boolean | undefined} searchable whether to highlight the abbreviation based on the `?search=...` query param
 * @constructor
 */
function Abbreviation({ abbreviation, searchable = true }: { abbreviation: string; searchable?: boolean }) {
  const searchParams = useSearchParams();
  let searchWords: string[] = [];
  if (searchable) searchWords = getSearchWords(searchParams.get('search') ?? '');

  if (!abbreviations[abbreviation]) {
    return <Highlighter textToHighlight={abbreviation} searchWords={searchWords} />;
  }

  return (
    <Tooltip text={abbreviations[abbreviation]}>
      <span className="inline cursor-help whitespace-nowrap">
        <Highlighter
          textToHighlight={abbreviation}
          searchWords={searchWords}
          className="underline decoration-dotted decoration-2"
        />
        <CustomInfoCircle className="w-4 h-6 inline pt-2" />
      </span>
    </Tooltip>
  );
}

export default Abbreviation;

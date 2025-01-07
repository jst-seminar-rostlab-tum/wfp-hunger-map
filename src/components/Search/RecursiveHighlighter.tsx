import { useSearchParams } from 'next/navigation';
import React from 'react';
import Highlighter from 'react-highlight-words';

import { RecursiveHighlighterProps } from '@/domain/props/RecursiveHighlighterProps';
import { getSearchWords } from '@/utils/searchUtils';

/**
 * Throughout the passed `children`, recursively wrap every text into a `Highlighter` component.
 *
 * * if `children` is a React Element (e.g. p or div): create the element and continue within its children (if exist)
 * * if `children` is an array (i.e. there are multiple children): deal with each item recursively
 * * if `children` is a string: wrap it with a `Highlighter` component
 */
function RecursiveHighlighter({ children }: RecursiveHighlighterProps) {
  const searchParams = useSearchParams();

  if (!children) return null;

  // if children is a JSX element (e.g. p or div), return the respective element and continue within its children (if exist)
  if (React.isValidElement(children)) {
    // @ts-expect-error: We can safely use the children props as the element is valid.
    const { children: grandchildren, ...childrenProps } = children.props;

    if (!grandchildren) return children;
    return React.createElement(
      children.type,
      childrenProps,
      <RecursiveHighlighter>{grandchildren}</RecursiveHighlighter>
    );
  }

  // if children is an array, deal with all array items
  if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, index) => (
          // there's no way around using the index here, but children are assumed to be constant
          // eslint-disable-next-line react/no-array-index-key
          <RecursiveHighlighter key={index}>{child}</RecursiveHighlighter>
        ))}
      </>
    );
  }

  // otherwise children is a string -> wrap it with a Highlighter
  return (
    <Highlighter
      textToHighlight={children as string}
      searchWords={getSearchWords(searchParams.get('search') ?? '')}
      autoEscape
    />
  );
}

export default RecursiveHighlighter;

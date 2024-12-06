import { useSearchParams } from 'next/navigation';
import React from 'react';
import Highlighter from 'react-highlight-words';

import { RecursiveHighlighterProps } from '@/domain/props/RecursiveHighlighterProps';
import { getSearchWords } from '@/utils/searchUtils';

// only use if children does never change!
function RecursiveHighlighter({ type = React.Fragment, children, ...props }: RecursiveHighlighterProps) {
  const searchWords = getSearchWords(useSearchParams().get('search') ?? '');

  if (React.isValidElement(children)) {
    // if children is a JSX element (e.g. p or div), create the respective element and continue with the children
    return React.createElement(
      type,
      props,
      <RecursiveHighlighter type={children.type as string} {...(children.props as object)} />
    );
  }
  if (Array.isArray(children)) {
    // if children is an array, create an element with given type and deal with all array items
    return React.createElement(
      type,
      props,
      children.map((child, index) => (
        // there's no way around using the index here, but children are assumed to be constant
        // eslint-disable-next-line react/no-array-index-key
        <RecursiveHighlighter key={index}>{child}</RecursiveHighlighter>
      ))
    );
  }
  if (typeof children === 'string')
    // if children is a string, wrap it with a Highlighter
    return React.createElement(
      type,
      props,
      <Highlighter textToHighlight={children as string} searchWords={searchWords} autoEscape />
    );

  // if children is of any other type, just create an element with given type and props
  return React.createElement(type, props, children);
}

export default RecursiveHighlighter;

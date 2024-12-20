import { useSearchParams } from 'next/navigation';
import React from 'react';
import Highlighter from 'react-highlight-words';

import { RecursiveHighlighterProps } from '@/domain/props/RecursiveHighlighterProps';
import { getSearchWords } from '@/utils/searchUtils';

/**
 * Throughout the passed children, wrap everything that looks like a text into a `Highlighter` component.
 *
 * In Detail:
 * * Render a React Element with given type and props, but modified children.
 *   * if `type` is `React.Fragment`, this is equivalent to just rendering the modified children
 * * if `children` is a string: wrap it with a `Highlighter` component
 * * if `children` is a React Element (e.g. p or div): modify its children recursively
 * * if `children` is an array (i.e. there are multiple children): modify each item recursively
 * * if `children` is anything else (undefined): do not modify it
 *
 * @param children Content that should be wrapped with `Highlighter` components
 * @param type Type of the created wrapper element (used for the recursive call)
 * @param props Props of the created wrapper element (used for the recursive call)
 * @constructor
 */
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

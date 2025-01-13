import { ReactElement, ReactNode, Suspense } from 'react';
import reactElementToJsxString from 'react-element-to-jsx-string';

import RecursiveHighlighter from '@/components/Search/RecursiveHighlighter';
import { AccordionItemProps, SearchableAccordionItemProps } from '@/domain/entities/accordions/Accordions';
import DataSourceDescription, { DataSourceDescriptionItems } from '@/domain/entities/dataSources/DataSourceDescription';
import { SearchableElement } from '@/domain/props/SearchableSectionProps';

export class SearchOperations {
  /**
   * For each element, wrap the text contents of its components with a `Highlighter` component. In addition, store all contained words into `containedWords`.
   *
   * @param {ReactElement[]} textElements Elements to deal with. This value should never change since the array indices are used as keys.
   * @return {SearchableElement[]} text elements with an additional `containedWords` prop
   */
  static makeTextElementsSearchable(textElements: ReactElement[]): SearchableElement[] {
    return textElements.map((item, index) => {
      return {
        element: (
          // eslint-disable-next-line react/no-array-index-key
          <Suspense fallback={item} key={index}>
            <RecursiveHighlighter>{item}</RecursiveHighlighter>
          </Suspense>
        ),
        containedWords: SearchOperations.sanitizeText(SearchOperations.sanitizeReactNode(item)),
      };
    });
  }

  /**
   * Find all contained words for an accordion of tables and store them into the respective `containedWords` fields.
   *
   * @param {AccordionItemProps[]} items Accordion items where every `content` field is assumed to contain a `CustomTable`.
   * @return {SearchableAccordionItemProps[]} Accordion items with an additional `containedWords` field
   */
  static makeDataSourceAccordionSearchable(items: AccordionItemProps[]): SearchableAccordionItemProps[] {
    return items.map((item) => {
      const tableData: DataSourceDescriptionItems | undefined = (item.content as ReactElement)?.props?.data;
      if (!tableData) return { ...item, containedWords: '' };

      const sanitizedTable = Object.values(tableData).map(SearchOperations.sanitizeTableRow).join(' ');
      return { ...item, containedWords: `${item.title.toLowerCase()} ${sanitizedTable}` };
    });
  }

  /**
   * For each item, wrap the text contents of its components with a `Highlighter` component. In addition, store all contained words into `containedWords`.
   *
   * @param {AccordionItemProps[]} items Accordion items to deal with
   * @return {SearchableAccordionItemProps[]} Accordion items with an additional `containedWords` prop
   */
  static makeAccordionItemsSearchable(items: AccordionItemProps[]): SearchableAccordionItemProps[] {
    return items.map((item) => {
      return {
        ...item,
        containedWords: SearchOperations.sanitizeAccordionItem(item),
        content: (
          <Suspense fallback={item.content}>
            <RecursiveHighlighter>{item.content}</RecursiveHighlighter>
          </Suspense>
        ),
      };
    });
  }

  /**
   * Put all contained words from a table row into a lowercase string.
   *
   * @param {DataSourceDescription} item A single row from the data source table
   * @return {string} All contained words prepared for search
   */
  static sanitizeTableRow(item: DataSourceDescription): string {
    return SearchOperations.sanitizeText(
      `${item.title}
      ${SearchOperations.sanitizeReactNode(item.summary)}
      ${SearchOperations.sanitizeReactNode(item.dataSource)}
      ${item.dataSourceLink ?? ''}
      ${item.updateInterval ?? ''}
      ${item.updateDetails?.map((d) => `${d.interval} ${SearchOperations.sanitizeReactNode(d.label)}`)?.join(' ') ?? ''}`
    );
  }

  /**
   * Put all contained words from an accordion item into a lowercase string.
   *
   * @param {AccordionItemProps} item A single accordion item
   * @return {string} All contained words from title and description prepared for search
   */
  private static sanitizeAccordionItem(item: AccordionItemProps): string {
    return SearchOperations.sanitizeText(
      `${item.title} ${item.description ?? ''} ${SearchOperations.sanitizeReactNode(item.content ?? '')}`
    );
  }

  /**
   * Convert a React Node into a string, omitting component names and props.
   *
   * @param {ReactNode} item The react node to deal with
   * @return {string} A string of the rendered node without component names and props
   */
  private static sanitizeReactNode(item: ReactNode): string {
    if (item === undefined) return '';
    return reactElementToJsxString(item)
      .replace(/<Abbreviation abbreviation="([^"]*)" \/>/g, '$1')
      .replace(/<[^>]*>/g, '')
      .replace("{' '}", ' ')
      .replace(/{[^}]*}/g, '');
  }

  /**
   * Turn an arbitrary text into a string of the contained words that is lowercase, without redundant whitespace and has no duplicate words.
   *
   * @param {string} text An arbitrary text
   * @return {string} The text prepared for search as described
   */
  private static sanitizeText(text: string) {
    return Array.from(
      new Set(
        text
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ') // whitespace
          .toLowerCase()
          .split(' ')
      )
    ).join(' ');
  }
}

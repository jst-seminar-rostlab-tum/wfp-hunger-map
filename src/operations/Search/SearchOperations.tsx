import { ReactElement, ReactNode, Suspense } from 'react';
import reactElementToJsxString from 'react-element-to-jsx-string';

import RecursiveHighlighter from '@/components/Search/RecursiveHighlighter';
import { AccordionItemProps, SearchableAccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { DataSourceTableData, DataSourceTableRow } from '@/domain/props/CustomTableProps';
import { SearchableElement } from '@/domain/props/SearchableSectionProps';

export class SearchOperations {
  /**
   * For each element, wrap the text contents of its components with a `Highlighter` component. In addition, store all contained words into `containedWords`.
   *
   * @param textElements Elements to deal with. This value should never change since the array indices are used as keys.
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
   * @param items Accordion items where every `content` field is assumed to contain a `CustomTable`.
   */
  static makeDataSourceAccordionSearchable(items: AccordionItemProps[]): SearchableAccordionItemProps[] {
    return items.map((item) => {
      const tableData: DataSourceTableData | undefined = (item.content as ReactElement)?.props?.data;
      if (!tableData) return { ...item, containedWords: '' };

      const sanitizedTable = tableData.map(SearchOperations.sanitizeTableRow).join(' ');
      return { ...item, containedWords: `${item.title.toLowerCase()} ${sanitizedTable}` };
    });
  }

  /**
   * For each item, wrap the text contents of its components with a `Highlighter` component. In addition, store all contained words into `containedWords`.
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
   */
  static sanitizeTableRow(item: DataSourceTableRow): string {
    return SearchOperations.sanitizeText(`${item.label}
      ${SearchOperations.sanitizeReactNode(item.description)}
      ${SearchOperations.sanitizeReactNode(item.dataSource)}
      ${item.updateInterval?.toLowerCase() ?? ''}
      ${item.updateDetails?.map((d) => `${d.interval} ${SearchOperations.sanitizeReactNode(d.label)}`)?.join(' ') ?? ''}`);
  }

  /**
   * Put all contained words from an accordion item into a lowercase string.
   */
  private static sanitizeAccordionItem(item: AccordionItemProps): string {
    return SearchOperations.sanitizeText(
      `${item.title} ${item.description ?? ''} ${SearchOperations.sanitizeReactNode(item.content)}`
    );
  }

  /**
   * Put all contained words from a React Node into a lowercase string, omitting component names and props.
   */
  private static sanitizeReactNode(item: ReactNode): string {
    return reactElementToJsxString(item)
      .replace(/<Abbreviation abbreviation="([^"]*)" \/>/g, '$1')
      .replace(/<[^>]*>/g, '')
      .replace("{' '}", ' ')
      .replace(/{[^}]*}/g, '');
  }

  /**
   * Turn an arbitrary text into a string of the contained words that is lowercase, without redundant whitespace and has no duplicate words.
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

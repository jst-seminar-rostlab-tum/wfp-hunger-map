import { ReactElement, ReactNode } from 'react';
import reactElementToJsxString from 'react-element-to-jsx-string';

import RecursiveHighlighter from '@/components/Search/RecursiveHighlighter';
import { AccordionItemProps, SearchableAccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { DataSourceTableRow } from '@/domain/props/CustomTableProps';

export class SearchOperations {
  // textElements should not be changed during runtime
  static makeTextElementsSearchable(textElements: ReactElement[]) {
    return textElements.map((item, index) => {
      return {
        // eslint-disable-next-line react/no-array-index-key
        element: <RecursiveHighlighter key={index}>{item}</RecursiveHighlighter>,
        containedWords: SearchOperations.sanitizeText(SearchOperations.sanitizeReactNode(item)),
      };
    });
  }

  static makeAccordionItemsSearchable(items: AccordionItemProps[]): SearchableAccordionItemProps[] {
    return items.map((item) => {
      return {
        ...item,
        containedWords: SearchOperations.makeAccordionItemSearchable(item),
        content: <RecursiveHighlighter>{item.content}</RecursiveHighlighter>,
      };
    });
  }

  static makeAccordionItemSearchable(item: AccordionItemProps): string {
    return SearchOperations.sanitizeText(
      `${item.title} ${item.description ?? ''} ${SearchOperations.sanitizeReactNode(item.content)}`
    );
  }

  static makeTableRowSearchable(item: DataSourceTableRow): string {
    return SearchOperations.sanitizeText(`${item.label}
      ${this.sanitizeReactNode(item.description)}
      ${this.sanitizeReactNode(item.dataSource)}
      ${item.updateInterval?.toLowerCase() ?? ''}
      ${item.updateDetails?.map((d) => `${d.interval} ${SearchOperations.sanitizeReactNode(d.label)}`)?.join(' ') ?? ''}`);
  }

  private static sanitizeReactNode(item: ReactNode): string {
    return reactElementToJsxString(item)
      .replace(/<Abbreviation abbreviation="([^"]*)" \/>/g, '$1')
      .replace(/<[^>]*>/g, '')
      .replace(/{[^}]*}/g, '');
  }

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

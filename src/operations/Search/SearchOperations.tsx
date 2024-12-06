import { ReactElement, ReactNode, Suspense } from 'react';
import reactElementToJsxString from 'react-element-to-jsx-string';

import RecursiveHighlighter from '@/components/Search/RecursiveHighlighter';
import { AccordionItemProps, SearchableAccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { DataSourceTableData, DataSourceTableRow } from '@/domain/props/CustomTableProps';

export class SearchOperations {
  // textElements should not be changed during runtime
  static makeTextElementsSearchable(textElements: ReactElement[]) {
    return textElements.map((item, index) => {
      return {
        element: (
          <Suspense>
            {/* eslint-disable-next-line react/no-array-index-key */}
            <RecursiveHighlighter key={index}>{item}</RecursiveHighlighter>
          </Suspense>
        ),
        containedWords: SearchOperations.sanitizeText(SearchOperations.sanitizeReactNode(item)),
      };
    });
  }

  static makeDataSourceAccordionSearchable(items: AccordionItemProps[]): SearchableAccordionItemProps[] {
    return items.map((item) => {
      const tableData: DataSourceTableData | undefined = (item.content as ReactElement)?.props?.data;
      if (!tableData) return { ...item, containedWords: '' };

      const sanitizedTable = tableData.map(SearchOperations.sanitizeTableRow).join(' ');
      return { ...item, containedWords: `${item.title.toLowerCase()} ${sanitizedTable}` };
    });
  }

  static makeAccordionItemsSearchable(items: AccordionItemProps[]): SearchableAccordionItemProps[] {
    return items.map((item) => {
      return {
        ...item,
        containedWords: SearchOperations.sanitizeAccordionItem(item),
        content: (
          <Suspense>
            <RecursiveHighlighter>{item.content}</RecursiveHighlighter>
          </Suspense>
        ),
      };
    });
  }

  private static sanitizeAccordionItem(item: AccordionItemProps): string {
    return SearchOperations.sanitizeText(
      `${item.title} ${item.description ?? ''} ${SearchOperations.sanitizeReactNode(item.content)}`
    );
  }

  static sanitizeTableRow(item: DataSourceTableRow): string {
    return SearchOperations.sanitizeText(`${item.label}
      ${SearchOperations.sanitizeReactNode(item.description)}
      ${SearchOperations.sanitizeReactNode(item.dataSource)}
      ${item.updateInterval?.toLowerCase() ?? ''}
      ${item.updateDetails?.map((d) => `${d.interval} ${SearchOperations.sanitizeReactNode(d.label)}`)?.join(' ') ?? ''}`);
  }

  private static sanitizeReactNode(item: ReactNode): string {
    return reactElementToJsxString(item)
      .replace(/<Abbreviation abbreviation="([^"]*)" \/>/g, '$1')
      .replace(/<[^>]*>/g, '')
      .replace("{' '}", ' ')
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

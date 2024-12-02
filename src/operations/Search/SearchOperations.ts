import { ReactNode } from 'react';
import reactElementToJsxString from 'react-element-to-jsx-string';

import { AccordionItemProps, SearchableAccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { DataSourceTableRow } from '@/domain/props/CustomTableProps';

export class SearchOperations {
  static makeAccordionItemsSearchable(items: AccordionItemProps[]): SearchableAccordionItemProps[] {
    return items.map((item) => {
      return { ...item, containedWords: SearchOperations.makeAccordionItemSearchable(item) };
    });
  }

  static makeAccordionItemSearchable(item: AccordionItemProps): string {
    return Array.from(
      new Set(
        `${item.title} ${item.description ?? ''} ${SearchOperations.sanitizeReactNode(item.content)}`
          .replace(/\s+/g, ' ')
          .toLowerCase()
          .split(' ')
      )
    ).join(' ');
  }

  static makeTableRowSearchable(item: DataSourceTableRow): string {
    return `${item.label}
      ${this.sanitizeReactNode(item.description)}
      ${this.sanitizeReactNode(item.dataSource)}
      ${item.updateInterval ?? ''}
      ${item.updateDetails?.map((d) => `${d.interval} ${SearchOperations.sanitizeReactNode(d.label)}`)?.join(' ') ?? ''}`
      .replace(/\s+/g, ' ')
      .replace(/\n/g, '')
      .toLowerCase();
  }

  private static sanitizeReactNode(item: ReactNode): string {
    return reactElementToJsxString(item)
      .replace(/<Abbreviation abbreviation="([^"]*)" \/>/g, '$1')
      .replace(/<[^>]*>/g, '')
      .replace(/{[^}]*}/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\n/g, '');
  }
}

import { ReactNode } from 'react';
import reactElementToJsxString from 'react-element-to-jsx-string';

import { AccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { DataSourceTableRow } from '@/domain/props/CustomTableProps';

export class SearchOperations {
  static makeAccordionItemSearchable(item: AccordionItemProps): Set<string> {
    return new Set(
      `${item.title} ${item.description ?? ''} ${this.sanitizeReactNode(item.content)}`.replace(/\s+/g, ' ').split(' ')
    );
  }

  static makeTableRowSearchable(item: DataSourceTableRow): Set<string> {
    return new Set(
      `${item.label}
      ${this.sanitizeReactNode(item.description)}
      ${this.sanitizeReactNode(item.dataSource)}
      ${item.updateInterval ?? ''}
      ${item.updateDetails?.map((d) => `${d.interval} ${this.sanitizeReactNode(d.label)}`)?.join(' ') ?? ''}`
        .replace(/\s+/g, ' ')
        .replace(/\n/g, '')
        .split(' ')
    );
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

import { ReactElement, Suspense } from 'react';
import reactElementToJsxString from 'react-element-to-jsx-string';

import RecursiveHighlighter from '@/components/Search/RecursiveHighlighter';
import { AccordionItemProps, SearchableAccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { DataSourceTableData, DataSourceTableRow } from '@/domain/props/CustomTableProps';
import { SearchableElement } from '@/domain/props/SearchableSectionProps';

/**
 * <h1>Adding the Search Feature to a New Page</h1>
 * <h2>Demo Code</h2>
 * ```tsx
 * // demoItems.ts
 * const demoItems = [
 *   { title: 'Demo 1', content: 'a' },
 *   { title: 'Demo 2', content: 'b' },
 * ];
 * export const SearchOperations.makeAccordionItemsSearchable(demoItems);
 * ```
 * ```tsx
 * // page.tsx
 * function Page() {
 *   const [searchWords, setSearchWords] = useState<string[]>([]);
 *   const [sectionIsVisible, setSectionIsVisible] = useState(true);
 *   return (
 *     <>
 *       <Suspense fallback={<DocsSearchBarSkeleton />}>
 *         <DocsSearchBar setSearchWords={setSearchWords} />
 *       </Suspense>
 *       {!searchWords.length && <h1 className="!mb-0">Demo Page</h1>}
 *       <SearchableSection
 *         searchWords={searchWords}
 *         accordionItems={demoItems}
 *         onVisibilityChange={setSectionIsVisible}
 *       />
 *       {!sectionIsVisible && !!searchWords.length && <p className="text-center">No results</p>}
 *     </>
 *   );
 * }
 * ```
 * <h2>Recommended Approach</h2>
 * * store all logical units of the content (e.g. accordion items, paragraphs, table lines) into an array
 * * apply the fitting `makeXxxSearchable` function from this class
 * * put the result into the `SearchableSection` component
 * * add `DocsSearchBar` to the current page
 *
 * <h2>Extended / Customized Approach </h2>
 * * store all logical units of the content (e.g. accordion items, paragraphs, table lines) into an array
 * * convert them into objects with a `containedWords` field
 *   * `containedWords` should be a string of all contained lowercase words, ideally without unnecessary whitespace or repetitions
 * * filter that array using `filterSearchableItems(...)` in `searchUtils.ts`
 * * store the current search query in a query param `?search=...`, e.g. using the hook `useSearchQuery`
 * * wrap components containing text content with a `RecursiveHighlighter` component
 */
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
      ${item.dataSourceLink ?? ''}
      ${item.updateInterval ?? ''}
      ${item.updateDetails?.map((d) => `${d.interval} ${SearchOperations.sanitizeReactNode(d.label)}`)?.join(' ') ?? ''}`);
  }

  /**
   * Put all contained words from an accordion item into a lowercase string.
   */
  private static sanitizeAccordionItem(item: AccordionItemProps): string {
    return SearchOperations.sanitizeText(
      `${item.title} ${item.description ?? ''} ${SearchOperations.sanitizeReactNode(item.content ?? '')}`
    );
  }

  /**
   * Convert a React Node into a string, omitting component names and props.
   */
  private static sanitizeReactNode(item: ReactElement | string): string {
    if (typeof item === 'string') return item;
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

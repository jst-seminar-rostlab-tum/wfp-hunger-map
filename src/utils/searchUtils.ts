import { SearchableAccordionItemProps } from '@/domain/entities/accordions/Accordions';

export const getSearchWords = (searchString: string): string[] => {
  return (
    searchString
      .toLowerCase()
      .split(' ')
      // remove empty string
      .filter((i) => i)
  );
};

export const filterAccordionItems = (
  accordionItems: SearchableAccordionItemProps[],
  searchWords: string[]
): SearchableAccordionItemProps[] | null => {
  if (searchWords?.length) {
    return accordionItems.filter(({ containedWords }) => {
      return searchWords?.some((searchWord) => containedWords?.includes(searchWord));
    });
  }
  return null;
};

import { SearchableAccordionItemProps } from '@/domain/entities/accordions/Accordions';

export const filterAccordionItems = (accordionItems: SearchableAccordionItemProps[], search: string) => {
  const searchWords = search
    .toLowerCase()
    .split(' ')
    // remove empty string
    .filter((i) => i);

  if (searchWords?.length) {
    return accordionItems.filter(({ containedWords }) => {
      return searchWords?.some((searchWord) => containedWords?.includes(searchWord));
    });
  }
  return null;
};

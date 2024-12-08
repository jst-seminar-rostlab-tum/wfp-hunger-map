import React, { useEffect, useState } from 'react';

import AccordionContainer from '@/components/Accordions/AccordionContainer';
import { AccordionItemProps, SearchableAccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { SearchableElement, SearchableSectionProps } from '@/domain/props/SearchableSectionProps';
import { filterSearchableItems } from '@/utils/searchUtils';

function SearchableSection({
  heading,
  textElements,
  accordionItems,
  searchWords,
  onVisibilityChange,
}: SearchableSectionProps) {
  const [filteredAccordionItems, setFilteredAccordionItems] = useState<AccordionItemProps[] | null>(null);
  const [filteredTextElements, setFilteredTextElements] = useState<SearchableElement[] | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (accordionItems) {
      setFilteredAccordionItems(filterSearchableItems<SearchableAccordionItemProps>(accordionItems, searchWords));
    }
    if (textElements) {
      setFilteredTextElements(filterSearchableItems<SearchableElement>(textElements, searchWords));
    }
  }, [accordionItems, searchWords]);

  const accordionVisible = accordionItems && (!filteredAccordionItems || filteredAccordionItems.length);
  const textVisible = textElements && (!filteredTextElements || filteredTextElements.length);

  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(true);
    }
  }, []);

  useEffect(() => {
    const newVisibility = !!(accordionVisible || textVisible);
    setIsVisible(newVisibility);
    if (onVisibilityChange) {
      onVisibilityChange(newVisibility);
    }
  }, [accordionVisible, textVisible]);

  return isVisible ? (
    <section>
      {heading && <h2>{heading}</h2>}
      {textVisible ? (filteredTextElements ?? textElements)?.map((e) => e.element) : null}
      {accordionVisible ? (
        <AccordionContainer
          items={filteredAccordionItems ?? accordionItems}
          multipleSelectionMode
          expandAll={!!filteredAccordionItems}
          highlightedTitleWords={searchWords}
        />
      ) : null}
    </section>
  ) : null;
}

export default SearchableSection;

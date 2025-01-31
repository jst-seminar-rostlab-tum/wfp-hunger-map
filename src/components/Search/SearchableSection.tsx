import React, { useEffect, useState } from 'react';

import AccordionContainer from '@/components/Accordions/AccordionContainer';
import { AccordionItemProps, SearchableAccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { SearchableElement, SearchableSectionProps } from '@/domain/props/SearchableSectionProps';
import { filterSearchableItems } from '@/utils/searchUtils';

/**
 * Wrap the provided searchable elements into a section.
 * If there is an ongoing search (i.e. `searchWords.length > 0`) with no results in this section, hide it.
 *
 * @param {string | undefined} heading Heading of the section. Will be hidden if the other elements contain no results during search.
 * @param {SearchableElement[] | undefined} textElements Array of text elements to display. Only elements with results will be shown during search.
 * @param {SearchableAccordionItemProps[] | undefined} accordionItems Array of accordion items to display. Only items with results will be shown during search.
 * @param {string[]} searchWords If not empty, filter the section content by occurrence of these words.
 * @param {((isVisible: boolean) => void) | undefined} onVisibilityChange is being called with the current visibility of the section (true = visible)
 */
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
    if (Math.random() > 0.7) {
      throw new Error('Random error');
    }
  }, []);

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

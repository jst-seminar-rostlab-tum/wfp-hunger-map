/**
 * Convert a search string into an array of lowercase words.
 */
export const getSearchWords = (searchString: string): string[] => {
  return (
    searchString
      .toLowerCase()
      .split(' ')
      // remove empty string
      .filter((i) => i)
  );
};

/**
 * Filter the `items` array to elements where the `containedWords` field matches the given search query.
 */
export function filterSearchableItems<T extends { containedWords: string }>(
  items: T[],
  searchWords: string[]
): T[] | null {
  if (searchWords?.length) {
    return items.filter(({ containedWords }) => {
      return searchWords?.some((searchWord) => containedWords?.includes(searchWord));
    });
  }
  return null;
}

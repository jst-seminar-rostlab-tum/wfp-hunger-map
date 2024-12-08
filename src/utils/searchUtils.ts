export const getSearchWords = (searchString: string): string[] => {
  return (
    searchString
      .toLowerCase()
      .split(' ')
      // remove empty string
      .filter((i) => i)
  );
};

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

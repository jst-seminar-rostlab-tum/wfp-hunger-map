import React, { useEffect } from 'react';

import SearchBar from '@/components/Search/SearchBar';
import { useSearchQuery } from '@/domain/hooks/queryParamsHooks';
import { DocsSearchBarProps } from '@/domain/props/DocsSearchBarProps';
import { getSearchWords } from '@/utils/searchUtils';

/**
 * Show a search bar that synchronizes with the `?search=...` query param.
 *
 * @param setSearchWords Function to call if the search input changes.
 */
function DocsSearchBar({ setSearchWords }: DocsSearchBarProps) {
  const [search, setSearch] = useSearchQuery();

  useEffect(() => {
    setSearchWords(getSearchWords(search));
  }, [search]);

  return (
    <div className="h-10">
      <SearchBar
        value={search}
        onValueChange={(newValue) => {
          setSearch(newValue);
          setSearchWords(getSearchWords(newValue));
        }}
        className="fixed left-0 z-10"
        inputClassName="max-w-[90%] px-2 sm:max-w-md mx-auto backdrop-blur-lg backdrop-saturate-150 bg-background/70"
      />
    </div>
  );
}

export default DocsSearchBar;

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import SearchBar from '@/components/Search/SearchBar';
import { useDebounce } from '@/domain/hooks/searchHooks.ts';
import { DocsSearchBarProps } from '@/domain/props/DocsSearchBarProps';
import { getSearchWords } from '@/utils/searchUtils';

function DocsSearchBar({ setSearchWords }: DocsSearchBarProps) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(params.get('search') ?? '');
  const debouncedSearch = useDebounce(search, 350);

  useEffect(() => {
    if (search) setSearchWords(getSearchWords(search));
  }, []);

  useEffect(() => {
    router.push(`${pathname}?search=${debouncedSearch}`);
  }, [debouncedSearch]);

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

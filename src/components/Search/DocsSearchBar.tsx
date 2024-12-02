import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import SearchBar from '@/components/Search/SearchBar';
import { DocsSearchBarProps } from '@/domain/props/DocsSearchBarProps';
import { getSearchWords } from '@/utils/searchUtils';

function DocsSearchBar({ setSearchWords }: DocsSearchBarProps) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState(params.get('search') ?? '');

  useEffect(() => {
    setSearchWords(getSearchWords(search));
  }, [search]);

  return (
    <SearchBar
      value={search}
      onValueChange={(v) => {
        setSearch(v);
        router.push(`${pathname}?search=${v}`);
      }}
      className="max-w-md mx-auto"
    />
  );
}

export default DocsSearchBar;

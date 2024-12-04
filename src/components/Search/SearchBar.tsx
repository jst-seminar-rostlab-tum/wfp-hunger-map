import { Input } from '@nextui-org/react';
import { SearchNormal1 } from 'iconsax-react';
import React from 'react';

import { SearchBarProps } from '@/domain/props/SearchBarProps';

export default function SearchBar({ value, onValueChange, placeholder, className, inputClassName }: SearchBarProps) {
  return (
    <Input
      className={className}
      isClearable
      placeholder={placeholder || 'Search...'}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      radius="lg"
      startContent={<SearchNormal1 className="text-secondary dark:text-foreground text-lg flex-shrink-0" />}
      classNames={{
        inputWrapper: ['border', 'hover:border-primary', 'rounded-lg', inputClassName],
      }}
    />
  );
}

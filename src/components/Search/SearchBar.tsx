import { Input } from '@nextui-org/react';
import { SearchNormal1 } from 'iconsax-react';
import React from 'react';

import { SearchBarProps } from '@/domain/props/SearchBarProps';

export default function SearchBar({ value, onValueChange, placeholder, className }: SearchBarProps) {
  return (
    <Input
      isClearable
      placeholder={placeholder || 'Search...'}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      radius="lg"
      startContent={<SearchNormal1 className="flex-shrink-0" />}
      className={className}
      classNames={{
        inputWrapper: ['shadow-xl', 'border', 'hover:border-primary', 'rounded-lg'],
      }}
    />
  );
}

import { Input } from '@nextui-org/react';
import { SearchNormal1 } from 'iconsax-react';
import React from 'react';

interface SearchBarProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ value, onValueChange, placeholder, className }: SearchBarProps) {
  return (
    <Input
      isClearable
      placeholder={placeholder || 'Search...'}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      radius="lg"
      startContent={<SearchNormal1 className="text-secondary dark:text-foreground text-lg flex-shrink-0" />}
      classNames={{
        inputWrapper: ['shadow-xl', 'border', 'hover:border-primary', 'rounded-lg', className],
      }}
    />
  );
}

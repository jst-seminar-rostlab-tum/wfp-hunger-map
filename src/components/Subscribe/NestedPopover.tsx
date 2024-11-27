/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Divider, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import clsx from 'clsx';
import { ArrowRight2 } from 'iconsax-react';
import React, { useEffect, useRef, useState } from 'react';

import { NestedPopoverProps } from '@/domain/props/NestedPopoverProps';

export function NestedPopover({ label, items, nestedItems }: NestedPopoverProps) {
  const [selectedNestedItems, setSelectedNestedItems] = useState<string[]>([]);
  const [isNestedOpen, setIsNestedOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const nestedMenuRef = useRef<HTMLDivElement>(null);

  // click outside to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        nestedMenuRef.current &&
        !nestedMenuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setIsNestedOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // main menu item click logic: to close the menu and select the item
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  // nested menu item click logic: to select the item since is multiple
  const handleNestedToggle = (id: string) => {
    setSelectedNestedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div ref={menuRef} className="relative">
      {/* main menu trigger */}
      <Popover placement="top-end" isOpen={isMenuOpen}>
        <PopoverTrigger className="w-full">
          <Button
            variant="light"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {label}
          </Button>
        </PopoverTrigger>

        {/* main menu items */}
        <PopoverContent className="bg-white dark:bg-background shadow-lg rounded-md w-40 items-start p-0 border-[0.5px] border-solid border-gray-500">
          <ul className="w-full">
            {items.map((item) => (
              <div
                key={item.id}
                className="m-1 h-10 text-left text-gray-700 hover:bg-blue-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white p-2"
                onClick={handleMenuItemClick}
              >
                {item.name}
              </div>
            ))}

            <Divider className="bg-gray-500 h-[0.5px]" />
            {/* nested menu trigger logic */}
            <li className="relative">
              <div
                className="m-1 h-10 flex flex-row justify-between items-center text-gray-700 hover:bg-blue-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white p-2"
                onClick={() => setIsNestedOpen(true)}
                onMouseEnter={() => setIsNestedOpen(true)}
              >
                <p>Nested Menu</p>
                <ArrowRight2 size={24} />
              </div>

              {/* nested menu items */}
              {isNestedOpen && (
                <div
                  ref={nestedMenuRef}
                  className="absolute top-0 left-full bg-white dark:bg-background shadow-lg rounded-md w-40 z-10 border-[0.5px] border-solid border-gray-500 p-1"
                >
                  <ul>
                    {nestedItems.map((nestedItem) => (
                      <li
                        key={nestedItem.id}
                        className={clsx(
                          'flex justify-between items-center',
                          selectedNestedItems.includes(nestedItem.id)
                            ? 'hover:bg-blue-100 text-black dark:hover:bg-gray-700 dark:text-white'
                            : 'text-gray-700 hover:bg-blue-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                        )}
                      >
                        <div className="w-full text-left p-2" onClick={() => handleNestedToggle(nestedItem.id)}>
                          {nestedItem.name}
                        </div>
                        {selectedNestedItems.includes(nestedItem.id) && (
                          <span className="mr-2 text-gray-500 dark:text-white">✔</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}

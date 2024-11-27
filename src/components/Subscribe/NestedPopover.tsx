/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Divider, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import clsx from 'clsx';
import { ArrowRight2 } from 'iconsax-react';
import React, { useEffect, useRef, useState } from 'react';

import { NestedPopoverProps } from '@/domain/props/NestedPopoverProps';

/**
 * NestedPopover component
 * @param label is the main menu label and will contain the select topics or options later
 * @param items is the list of items to be displayed in the menu
 * @returns a nested popover component
 */
export function NestedPopover({ label, items, onSelectionChange }: NestedPopoverProps) {
  // store nested menu open state
  const [isNestedOpen, setIsNestedOpen] = useState(false);
  // store main menu open state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // store which nested menu is open
  const [openNestedMenu, setOpenNestedMenu] = useState<string | null>(null);
  // store select topic
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  // store selected options
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // refs for the main menu and nested menu
  const menuRef = useRef<HTMLDivElement>(null);
  const nestedMenuRef = useRef<HTMLDivElement>(null);

  // click outside to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
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
  const selectMainMenuItem = (topicId: string): void => {
    setSelectedOptions([]); // if the selected item is a main menu item, clear the selected options of other items
    setSelectedTopic(topicId);
    setIsMenuOpen(false);
  };

  // nested menu item click logic: to select the item since is multiple
  const selectNestedOption = (option: string, topicId: string): void => {
    setSelectedTopic(topicId);
    setSelectedOptions((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
  };

  /**
   * take care of nested menu open state
   * @param itemId is the id of the nested menu item
   */
  const handleNestedMenuToggle = (itemId: string): void => {
    setOpenNestedMenu(openNestedMenu === itemId ? null : itemId);
    setIsNestedOpen(true);
  };

  useEffect(() => {
    if (selectedTopic) {
      onSelectionChange(selectedTopic, selectedOptions);
    }
  }, [selectedTopic, selectedOptions, onSelectionChange]);

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
            {items.map((item) =>
              item.options === undefined || item.options.length === 0 ? (
                <div
                  key={item.id}
                  className="m-1 h-10 text-left text-gray-700 hover:bg-blue-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white p-2"
                  onClick={() => selectMainMenuItem(item.id)}
                >
                  {item.name}
                </div>
              ) : null
            )}

            <Divider className="bg-gray-500 h-[0.5px]" />
            {/* nested menu trigger logic */}
            {items.map((item) =>
              item.options && item.options.length > 0 ? (
                <li key={item.id} className="relative">
                  <div
                    className="m-1 h-10 flex flex-row justify-between items-center text-gray-700 hover:bg-blue-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white p-2"
                    onClick={() => handleNestedMenuToggle(item.id)}
                    onMouseEnter={() => handleNestedMenuToggle(item.id)}
                  >
                    <p>{item.name}</p>
                    <ArrowRight2 size={24} />
                  </div>

                  {/* nested menu items */}
                  {isNestedOpen && openNestedMenu?.includes(item.id) && (
                    <div
                      ref={nestedMenuRef}
                      className="absolute top-0 left-full bg-white dark:bg-background shadow-lg rounded-md w-40 z-10 border-[0.5px] border-solid border-gray-500 p-1"
                    >
                      <ul>
                        {item.options?.map((option) => (
                          <li
                            key={option}
                            className={clsx(
                              'flex justify-between items-center',
                              selectedOptions.includes(option)
                                ? 'hover:bg-blue-100 text-black dark:hover:bg-gray-700 dark:text-white'
                                : 'text-gray-700 hover:bg-blue-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                            )}
                          >
                            <div className="w-full text-left p-2" onClick={() => selectNestedOption(option, item.id)}>
                              {option}
                            </div>
                            {selectedOptions.includes(option) && (
                              <span className="mr-2 text-gray-500 dark:text-white">✔</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ) : null
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}

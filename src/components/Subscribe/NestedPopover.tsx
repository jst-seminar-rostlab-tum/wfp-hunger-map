/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Divider, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import clsx from 'clsx';
import { ArrowRight2 } from 'iconsax-react';
import React, { useEffect, useRef, useState } from 'react';

import { CLICK_TO_SELECT, SELECTED_TOPICS } from '@/domain/constant/subscribe/Subscribe';
import { IOption, ITopic } from '@/domain/entities/subscribe/Subscribe';
import { NestedPopoverProps } from '@/domain/props/NestedPopoverProps';

import { Tooltip } from '../Tooltip/Tooltip';

/**
 * NestedPopover component
 * @param items is the list of items to be displayed in the menu
 * @returns a nested popover component
 */
export function NestedPopover({ items, onSelectionChange }: NestedPopoverProps) {
  // store nested menu open state
  const [isNestedOpen, setIsNestedOpen] = useState(false);
  // store main menu open state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // store which nested menu is open
  const [openNestedMenu, setOpenNestedMenu] = useState<string | null>(null);
  // store select topic
  const [selectedTopic, setSelectedTopic] = useState<ITopic | undefined>(undefined);
  // store selected options
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([]);

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
  const selectMainMenuItem = (topic: ITopic): void => {
    setSelectedOptions([]); // if the selected item is a main menu item, clear the selected options of other items
    setSelectedTopic(topic);
    setIsMenuOpen(false);
  };

  // nested menu item click logic: to select the item since is multiple
  const selectNestedOption = (option: IOption, topic: ITopic): void => {
    setSelectedOptions((prev) =>
      prev.some((item) => item.report_id === option.report_id)
        ? prev.filter((item) => item.report_id !== option.report_id)
        : [...prev, option]
    );
    if (selectedTopic && selectedTopic.topic_id !== topic.topic_id) {
      // clear options if the topic is changed
      setSelectedOptions([option]);
    }
    setSelectedTopic({
      is_country_selectable: topic.is_country_selectable,
      topic_id: topic.topic_id,
      topic_name: topic.topic_name,
      topic_description: topic.topic_description,
      options: [...selectedOptions, option],
    });
  };

  /**
   * take care of nested menu open state
   * @param itemId is the id of the nested menu item
   */
  const handleNestedMenuToggle = (itemId: string): void => {
    setOpenNestedMenu(openNestedMenu === itemId ? null : itemId);
    setIsNestedOpen(true);
  };

  const ifOptionsSelected = (option: IOption): boolean => {
    return selectedOptions.find((selectedItem) => selectedItem.report_id === option.report_id) !== undefined;
  };

  useEffect(() => {
    if (selectedTopic) {
      onSelectionChange(selectedTopic);
    }
  }, [selectedTopic]);

  return (
    <div ref={menuRef} className="relative">
      {/* main menu trigger */}
      <Popover placement="top-end" isOpen={isMenuOpen}>
        <PopoverTrigger className="w-full">
          <Button
            variant="bordered"
            className="w-full h-12 hover:bg-blue-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="flex flex-row items-center truncate">
              {selectedTopic ? <p>{SELECTED_TOPICS}</p> : <p>{CLICK_TO_SELECT}</p>}
              {selectedTopic && (
                <p className="text-sm text-gray-700 dark:text-gray-300">: {selectedTopic?.topic_description}</p>
              )}
              {selectedOptions.length > 0 && (
                <Tooltip text={selectedOptions.map((option) => option.report_name).join(', ')}>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    : {selectedOptions.map((option) => option.report_name).join(', ')}
                  </p>
                </Tooltip>
              )}
            </div>
          </Button>
        </PopoverTrigger>

        {/* main menu items */}
        <PopoverContent className="bg-white dark:bg-background shadow-lg rounded-md w-60 items-start p-0 border-[0.5px] border-solid border-gray-500">
          <ul className="w-full">
            {items.map((item) =>
              item.options === undefined || item.options.length === 0 ? (
                <div
                  key={item.topic_id}
                  className="m-1 h-10 text-left text-gray-700 hover:bg-blue-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white p-2"
                  onClick={() => selectMainMenuItem(item)}
                >
                  {item.topic_description}
                </div>
              ) : null
            )}

            <Divider className="bg-gray-500 h-[0.5px]" />
            {/* nested menu trigger logic */}
            {items.map((item) =>
              item.options && item.options.length > 0 ? (
                <li key={item.topic_id} className="relative">
                  <div
                    className="m-1 h-10 flex flex-row justify-between items-center text-gray-700 hover:bg-blue-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white p-2"
                    onClick={() => handleNestedMenuToggle(item.topic_id)}
                    onMouseEnter={() => handleNestedMenuToggle(item.topic_id)}
                  >
                    <p>{item.topic_name}</p>
                    <ArrowRight2 size={24} />
                  </div>

                  {/* nested menu items */}
                  {isNestedOpen && openNestedMenu?.includes(item.topic_id) && (
                    <div
                      ref={nestedMenuRef}
                      className="absolute top-0 left-full bg-white dark:bg-background shadow-lg rounded-md w-56 z-10 border-[0.5px] border-solid border-gray-500 p-1"
                    >
                      <ul>
                        {item.options?.map((option) => (
                          <li
                            key={option.report_id}
                            className={clsx(
                              'flex justify-between items-center',
                              ifOptionsSelected(option)
                                ? 'hover:bg-blue-100 text-black dark:hover:bg-gray-700 dark:text-white'
                                : 'text-gray-700 hover:bg-blue-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                            )}
                          >
                            <div className="w-full text-left p-2" onClick={() => selectNestedOption(option, item)}>
                              {option.report_name}
                            </div>
                            {ifOptionsSelected(option) && (
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

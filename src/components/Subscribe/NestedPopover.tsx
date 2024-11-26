/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Divider, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import clsx from 'clsx';
import { ArrowRight2 } from 'iconsax-react';
import React, { useEffect, useRef, useState } from 'react';

import { ITopic } from '@/domain/entities/subscribe/Subscribe';

export interface PopoverMenuProps {
  label: string;
  items: ITopic[]; // 主菜单项
  nestedItems: ITopic[]; // 嵌套菜单项
}

export function NestedPopover({ label, items, nestedItems }: PopoverMenuProps) {
  const [selectedNestedItems, setSelectedNestedItems] = useState<string[]>([]); // 嵌套菜单多选项
  const [isNestedOpen, setIsNestedOpen] = useState(false); // 子菜单显示状态
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 主菜单显示状态

  const menuRef = useRef<HTMLDivElement>(null);
  const nestedMenuRef = useRef<HTMLDivElement>(null);

  // 点击菜单外关闭所有菜单
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

  // 主菜单选项点击逻辑：关闭主菜单
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  // 嵌套菜单项多选逻辑
  const handleNestedToggle = (id: string) => {
    setSelectedNestedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div ref={menuRef} className="relative">
      {/* 主菜单触发按钮 */}
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

        {/* 主菜单内容 */}
        <PopoverContent className="bg-white dark:bg-background shadow-lg rounded-md w-40 items-start p-0 border border-solid border-gray-300">
          <ul className="w-full">
            {items.map((item) => (
              <div
                key={item.id}
                className="w-full text-left text-gray-700 hover:bg-blue-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white p-2"
                onClick={handleMenuItemClick}
              >
                {item.name}
              </div>
            ))}

            <Divider className="bg-gray-300" />
            {/* 嵌套菜单触发逻辑 */}
            <li className="relative">
              <div
                className="flex w-full flex-row justify-between items-center text-gray-700 hover:bg-blue-100 hover:text-black dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white p-2"
                onClick={() => setIsNestedOpen(true)}
                onMouseEnter={() => setIsNestedOpen(true)}
              >
                <p>Nested Menu</p>
                <ArrowRight2 size={24} />
              </div>

              {/* 嵌套菜单内容 */}
              {isNestedOpen && (
                <div
                  ref={nestedMenuRef}
                  className="absolute top-0 left-full bg-white dark:bg-background shadow-lg rounded-md w-40 z-10 border border-solid border-gray-300"
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

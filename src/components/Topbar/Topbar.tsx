'use client';

import {
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { LogoWithText } from '@/components/LogoWithText/LogoWithText';
import { ThemeSwitch } from '@/components/Sidebar/ThemeSwitch';
import { pageLinks } from '@/domain/constant/PageLinks';

export function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full">
      <NavbarContent className="flex-1 min-w-[200px]">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="lg:hidden" />
        <LogoWithText />
      </NavbarContent>
      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        {pageLinks.map((item) => (
          <NavbarItem key={item.label} isActive={pathname === item.href}>
            <Link
              href={item.href}
              className={clsx('text-medium text-black dark:text-white', {
                'text-link dark:text-link': pathname === item.href,
              })}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch isIconOnly />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {pageLinks.map((item) => (
          <NavbarMenuItem key={item.label} isActive={pathname === item.href}>
            <Link
              className="w-full"
              href={item.href}
              size="lg"
              color={pathname === item.href ? 'primary' : 'foreground'}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

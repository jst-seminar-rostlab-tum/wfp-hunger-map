'use client';

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { LogoWithText } from '@/components/LogoWithText/LogoWithText';
import { ThemeSwitch } from '@/components/Sidebar/ThemeSwitch';
import { pageLinks } from '@/domain/constant/PageLinks';

export function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" className="fixed pr-10">
      <NavbarContent as="div" className="flex-1 min-w-[200px] mt-4">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="lg:hidden" />
        <NavbarBrand>
          <LogoWithText />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent as="div" className="hidden lg:flex gap-4 mt-4" justify="center">
        {pageLinks.map((item) => (
          <NavbarItem key={item.label} isActive={pathname === item.href}>
            <Link href={item.href} className="text-medium" color={pathname === item.href ? 'primary' : 'foreground'}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent as="div" justify="end" className="hidden lg:flex space-x-7">
        <NavbarItem as="div" className="mt-4">
          <ThemeSwitch isIconOnly />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu as="div">
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
        <NavbarMenuItem className="mt-4">
          <ThemeSwitch isIconOnly />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

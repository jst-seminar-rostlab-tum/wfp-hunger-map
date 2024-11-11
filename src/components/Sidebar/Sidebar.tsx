'use client';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/listbox';
import { SidebarLeft } from 'iconsax-react';
import NextImage from 'next/image';

import { AlertsMenu } from '@/components/AlertsMenu/AlertsMenu';
import { CollapsedSidebar } from '@/components/Sidebar/CollapsedSidebar';
import { ThemeSwitch } from '@/components/Sidebar/ThemeSwitch';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { AlertsMenuVariant } from '@/domain/enums/AlertsMenuVariant';
import { GlobalInsight } from '@/domain/enums/GlobalInsight';
import { SidebarOperations } from '@/operations/sidebar/SidebarOperations';

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar, selectedMapType, setSelectedMapType } = useSidebar();

  const handleSelectionChange = (key: 'all' | Set<string | number>) => {
    return key instanceof Set
      ? setSelectedMapType(Array.from(key)[0] as GlobalInsight)
      : setSelectedMapType(key as GlobalInsight);
  };

  if (!isSidebarOpen) {
    return (
      <CollapsedSidebar
        selectedMapType={selectedMapType}
        handleSelectionChange={handleSelectionChange}
        toggleSidebar={toggleSidebar}
      />
    );
  }

  return (
    <div className="absolute top-0 left-0 z-50 h-screen p-4">
      <Card
        classNames={{
          base: 'h-full',
          header: 'flex flex-col gap-4 w-full items-start',
          footer: 'flex flex-col items-start',
        }}
      >
        <CardHeader>
          <div className="flex items-center w-full gap-4">
            <NextImage src="/wfp_logo.svg" alt="HungerMap" width={45} height={45} />
            <p className="text-lg font-medium flex-1">HungerMap LIVE</p>
            <Button isIconOnly variant="light" onClick={toggleSidebar} aria-label="Close sidebar">
              <SidebarLeft size={24} />
            </Button>
          </div>

          <ThemeSwitch />
          <Input className="w-full" color="primary" placeholder="Search a country" variant="faded" />
        </CardHeader>
        <CardBody>
          <Listbox
            variant="flat"
            aria-label="Listbox menu with sections"
            selectionMode="single"
            selectedKeys={new Set(selectedMapType)}
            onSelectionChange={handleSelectionChange}
            disallowEmptySelection
            hideSelectedIcon
          >
            <ListboxSection title="Global Insights">
              {SidebarOperations.getSidebarMapTypes().map((item) => (
                <ListboxItem
                  key={item.key}
                  startContent={item.icon && <NextImage src={item.icon} alt={item.label} width={24} height={24} />}
                >
                  {item.label}
                </ListboxItem>
              ))}
            </ListboxSection>
          </Listbox>
          <div className="p-1 w-full">
            <span className="text-xs text-foreground-500 pl-1">Alerts</span>
            <div className="pt-1">
              <AlertsMenu variant={AlertsMenuVariant.Inside} />
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button radius="full" onClick={() => alert('Subscribe!')} size="sm">
            SUBSCRIBE
          </Button>
          <ul>
            <li>
              <Link href="/" size="sm" color="foreground" className="text-opacity-80">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" size="sm" color="foreground" className="text-opacity-80">
                About
              </Link>
            </li>
            <li>
              <Link href="/glossary" size="sm" color="foreground" className="text-opacity-80">
                Glossary
              </Link>
            </li>
            <li>
              <Link href="/methodology" size="sm" color="foreground" className="text-opacity-80">
                Methodology
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" size="sm" color="foreground" className="text-opacity-80">
                Disclaimer
              </Link>
            </li>
          </ul>
        </CardFooter>
      </Card>
    </div>
  );
}

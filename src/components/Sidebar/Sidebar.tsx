'use client';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Input } from '@nextui-org/input';
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/listbox';
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react';
import NextImage from 'next/image';

import AlertsMenu from '../AlertsMenu/AlertsMenu';
import { useSidebar } from './SidebarContext';

export type MapKey = 'food' | 'nutr' | 'vege' | 'rain' | 'ipc';

type MapType = {
  key: MapKey;
  label: string;
  icon: string;
};

const mapTypes: MapType[] = [
  {
    key: 'food',
    label: 'Food consumption',
    icon: '/menu_fcs.png',
  },
  {
    key: 'nutr',
    label: 'Nutrition',
    icon: '/menu_nutri.png',
  },
  {
    key: 'vege',
    label: 'Vegetation',
    icon: '/menu_ndvi.png',
  },
  {
    key: 'rain',
    label: 'Rainfall',
    icon: '/menu_rainfall.png',
  },
  {
    key: 'ipc',
    label: 'IPC/CH',
    icon: '/menu_ipc.png',
  },
];

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar, selectedMapType, setSelectedMapType } = useSidebar();

  const handleSelectionChange = (key: 'all' | Set<string | number>) => {
    if (key instanceof Set) {
      const firstValue = Array.from(key)[0];
      setSelectedMapType(String(firstValue) as MapKey);
    } else {
      setSelectedMapType(key as MapKey);
    }
  };

  if (!isSidebarOpen) {
    return (
      <div className="absolute top-0 left-0 z-50 p-4">
        <Card className="h-full">
          <CardHeader className="flex justify-center items-center">
            <Button isIconOnly variant="light" onClick={toggleSidebar} aria-label="Close sidebar">
              <SquareChevronRight size={24} />
            </Button>
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
              {mapTypes.map((item) => (
                <ListboxItem key={item.key} textValue={item.label}>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      className="object-contain w-auto h-auto max-w-full max-h-full"
                    />
                  </div>
                </ListboxItem>
              ))}
            </Listbox>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 z-50 h-screen p-4">
      <Card
        classNames={{
          base: 'h-full',
          header: 'flex flex-col gap-4',
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <NextImage src="/wfp_logo.svg" alt="HungerMap" width={45} height={45} />
              <p className="text-lg font-medium">HungerMap LIVE</p>
            </div>
            <Button isIconOnly variant="light" onClick={toggleSidebar} aria-label="Close sidebar">
              <SquareChevronLeft size={18} />
            </Button>
          </div>
          <Input className="w-full" color="primary" />
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
              {mapTypes.map((item) => (
                <ListboxItem
                  key={item.key}
                  startContent={item.icon && <Image src={item.icon} alt={item.label} width={24} />}
                >
                  {item.label}
                </ListboxItem>
              ))}
            </ListboxSection>
          </Listbox>
          <div className="p-1 w-full">
            <span className="text-xs text-foreground-500 pl-1">Alerts</span>
            <div className="pt-1">
              <AlertsMenu variant="inside" />
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex flex-col items-start">
          <div>
            <Button radius="full" onClick={() => alert('Subscribe!')} size="sm">
              SUBSCRIBE
            </Button>
            <Listbox variant="flat" aria-label="Listbox menu with sections">
              <ListboxItem key="home">Home</ListboxItem>
              <ListboxItem key="about">About</ListboxItem>
              <ListboxItem key="gloss">Glossary</ListboxItem>
              <ListboxItem key="methd">Methodology</ListboxItem>
              <ListboxItem key="disc">Disclaimer</ListboxItem>
            </Listbox>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

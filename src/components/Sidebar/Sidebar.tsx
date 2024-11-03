'use client';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/listbox';
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react';

import AlertsMenu from '../AlertsMenu/AlertsMenu';
import { useSidebar } from './SidebarContext';

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar, selectedMapType, setSelectedMapType } = useSidebar();

  const handleSelectionChange = (key: 'all' | Set<string | number>) => {
    if (key instanceof Set) {
      const firstValue = Array.from(key)[0];
      setSelectedMapType(String(firstValue));
    } else {
      setSelectedMapType(key);
    }
  };

  const mapTypes = [
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
      <Card className="h-full">
        <CardHeader>
          <p>HungerMap LIVE</p>
          <Button isIconOnly variant="light" onClick={toggleSidebar} aria-label="Close sidebar">
            <SquareChevronLeft size={18} />
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
          <div className="px-2 pt-2">
            <span className="text-xs font-medium text-foreground-500">Alerts</span>
            <AlertsMenu variant="inside" />
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

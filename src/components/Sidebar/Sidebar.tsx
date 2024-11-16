'use client';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';
import { SidebarLeft } from 'iconsax-react';
import NextImage from 'next/image';
import { useState } from 'react';

import { AlertsMenu } from '@/components/AlertsMenu/AlertsMenu';
import { LogoWithText } from '@/components/LogoWithText/LogoWithText';
import { CollapsedSidebar } from '@/components/Sidebar/CollapsedSidebar';
import { ThemeSwitch } from '@/components/Sidebar/ThemeSwitch';
import { pageLinks } from '@/domain/constant/PageLinks';
import { SUBSCRIBE_MODAL_TITLE } from '@/domain/constant/subscribe/Subscribe';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { AlertsMenuVariant } from '@/domain/enums/AlertsMenuVariant';
import { SidebarOperations } from '@/operations/sidebar/SidebarOperations';

import PopupModal from '../PopupModal/PopupModal';
import Subscribe from '../Subscribe/Subscribe';

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar, selectedMapType, setSelectedMapType } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isSidebarOpen) {
    return <CollapsedSidebar />;
  }

  return (
    <div className="absolute top-0 left-0 z-50 h-screen p-4">
      <Card
        classNames={{
          base: 'h-full',
          header: 'flex flex-col gap-4 w-full items-start',
        }}
      >
        <CardHeader>
          <div className="flex items-center w-full gap-2">
            <LogoWithText />
            <Button isIconOnly variant="light" onClick={toggleSidebar} aria-label="Close sidebar">
              <SidebarLeft size={24} />
            </Button>
          </div>
          <ThemeSwitch />
          <Input className="w-full" color="primary" placeholder="Search a country" variant="faded" />
        </CardHeader>
        <CardBody>
          <div className="p-1 w-full">
            <span className="text-tiny text-foreground-500 pl-1">Global Insights</span>
            <div className="flex flex-col gap-1 pt-1">
              {SidebarOperations.getSidebarMapTypes().map((item) => (
                <Button
                  startContent={item.icon && <NextImage src={item.icon} alt={item.label} width={24} height={24} />}
                  key={item.key}
                  variant={selectedMapType === item.key ? undefined : 'light'}
                  className={clsx('justify-start', selectedMapType === item.key && 'bg-primary')}
                  onClick={() => setSelectedMapType(item.key)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="p-1 w-full">
            <span className="text-tiny text-foreground-500 pl-1">Alerts</span>
            <div className="pt-1">
              <AlertsMenu variant={AlertsMenuVariant.Inside} />
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <div className="flex flex-col gap-1">
            <Button radius="full" onClick={() => setIsModalOpen(!isModalOpen)} size="sm" className="w-fit">
              SUBSCRIBE
            </Button>
            <PopupModal
              isModalOpen={isModalOpen}
              toggleModal={() => setIsModalOpen(!isModalOpen)}
              modalTitle={SUBSCRIBE_MODAL_TITLE}
              modalSize="lg"
              modalHeight="auto"
            >
              <Subscribe />
            </PopupModal>
            <ul className="pl-3">
              {pageLinks.map((page) => (
                <li key={page.label}>
                  <Link href={page.href} size="sm" color="foreground" className="text-opacity-80">
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

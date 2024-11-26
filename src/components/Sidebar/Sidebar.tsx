'use client';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import { ScrollShadow } from '@nextui-org/react';
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
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { AlertsMenuVariant } from '@/domain/enums/AlertsMenuVariant';
import { SidebarOperations } from '@/operations/sidebar/SidebarOperations';
import { useMediaQuery } from '@/utils/resolution';

import PopupModal from '../PopupModal/PopupModal';
import Subscribe from '../Subscribe/Subscribe';

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const { selectedMapType, setSelectedMapType } = useSelectedMap();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 640px)');

  if (!isSidebarOpen) {
    return <CollapsedSidebar />;
  }

  return (
    <div className="w-screen h-screen absolute top-0 left-0 z-sidebar sm:w-auto sm:h-[calc(100vh-3.5rem)] sm:z-50 sm:mt-4 sm:ml-4 sm:mb-10">
      <Card
        classNames={{
          base: 'h-full rounded-none sm:rounded-large',
          header: 'flex flex-col gap-4 w-full items-start',
          body: 'flex-grow overflow-auto min-h-[100px]',
          footer: 'flex-shrink-0',
        }}
      >
        <CardHeader>
          <div className="flex items-center w-full gap-2 justify-between">
            <LogoWithText />
            <Button isIconOnly variant="light" onClick={toggleSidebar} aria-label="Close sidebar">
              <SidebarLeft size={24} />
            </Button>
          </div>
          <ThemeSwitch />
          <Input className="w-full" color="primary" placeholder="Search a country" variant="faded" />
        </CardHeader>
        <CardBody>
          <ScrollShadow className="w-full h-full">
            <div className="w-full">
              <span className="text-tiny text-foreground-500 pl-1">Global Insights</span>
              <div className="flex flex-col gap-1 pt-1">
                {SidebarOperations.getSidebarMapTypes().map((item) => (
                  <Button
                    startContent={
                      item.icon && (
                        <NextImage
                          unoptimized
                          loading="eager"
                          src={item.icon}
                          alt={item.label}
                          width={24}
                          height={24}
                        />
                      )
                    }
                    key={item.key}
                    variant={selectedMapType === item.key ? undefined : 'light'}
                    className={clsx(
                      'justify-start dark:text-white',
                      selectedMapType === item.key ? 'bg-primary text-white' : 'text-black'
                    )}
                    onClick={() => {
                      setSelectedMapType(item.key);
                      if (isMobile) {
                        closeSidebar();
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="w-full">
              <span className="text-tiny text-foreground-500 pl-1">Alerts</span>
              <div className="pt-1">
                <AlertsMenu variant={AlertsMenuVariant.Inside} />
              </div>
            </div>
          </ScrollShadow>
        </CardBody>
        <CardFooter>
          <div className="flex flex-col gap-1">
            <Button radius="full" onClick={() => setIsModalOpen(!isModalOpen)} size="sm" className="w-fit text-white">
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
                  <Link href={page.href} color="foreground" className="text-tiny text-opacity-80">
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

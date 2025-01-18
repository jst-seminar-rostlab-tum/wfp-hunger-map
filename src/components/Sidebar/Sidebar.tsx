'use client';

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Link } from '@nextui-org/link';
import { Autocomplete, AutocompleteItem, ScrollShadow, Spinner } from '@nextui-org/react';
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
import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { AlertsMenuVariant } from '@/domain/enums/AlertsMenuVariant';
import { GlobalInsight } from '@/domain/enums/GlobalInsight.ts';
import { useIpcQuery, useNutritionQuery } from '@/domain/hooks/globalHooks.ts';
import SidebarProps from '@/domain/props/SidebarProps.ts';
import { SidebarOperations } from '@/operations/sidebar/SidebarOperations';
import { useMediaQuery } from '@/utils/resolution';

import PopupModal from '../PopupModal/PopupModal';
import Subscribe from '../Subscribe/Subscribe';
import { UserRoleSwitch } from './UserRoleSwitch';

export function Sidebar({ countryMapData, fcsData }: SidebarProps) {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();
  const { selectedMapType, setSelectedMapType } = useSelectedMap();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { selectedCountryId, setSelectedCountryId } = useSelectedCountryId();
  const { clearAccordionModal } = useAccordionsModal();
  const { isFetching: ipcDataIsFetching, data: ipcData } = useIpcQuery(false);
  const { isFetching: nutritionDataIsFetching, data: nutritionData } = useNutritionQuery(false);

  const mapDataFetching: Partial<Record<GlobalInsight, boolean>> = {
    [GlobalInsight.IPC]: ipcDataIsFetching,
    [GlobalInsight.NUTRITION]: nutritionDataIsFetching,
  };

  const handleCountrySelect = (countryID: React.Key | null) => {
    if (countryID) {
      setSelectedCountryId(Number(countryID));
    }
  };

  if (!isSidebarOpen) {
    return <CollapsedSidebar mapDataFetching={mapDataFetching} />;
  }

  const onMapTypeSelect = (mapType: GlobalInsight) => {
    clearAccordionModal();
    setSelectedMapType(mapType);
    if (isMobile) {
      closeSidebar();
    }
  };

  return (
    <div className="w-screen h-dvh absolute top-0 left-0 z-sidebarFullScreen sm:w-[280px] sm:h-[calc(100dvh-2rem)] sm:z-sidebarExpanded sm:top-4 sm:left-4">
      <Card
        classNames={{
          base: 'h-full rounded-none sm:rounded-large',
          header: 'flex flex-col gap-4 w-full items-start',
          body: 'min-h-[100px]',
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
          {/* Authentication mock */}
          <UserRoleSwitch />
          <Autocomplete
            placeholder="Search a country"
            onSelectionChange={handleCountrySelect}
            className="w-full"
            classNames={{ popoverContent: 'bg-clickableSecondary' }}
            variant="faded"
            color="primary"
            aria-label="Search a country"
            selectedKey={selectedCountryId !== null ? selectedCountryId.toString() : ''}
          >
            {countryMapData.features
              .sort((sortItemA, sortItemB) =>
                sortItemA.properties.adm0_name.localeCompare(sortItemB.properties.adm0_name)
              )
              .map((country) => (
                <AutocompleteItem
                  className="transition-all hover:text-background dark:text-foreground"
                  key={country.properties.adm0_id.toString()}
                  aria-label={country.properties.adm0_name}
                  isDisabled={
                    !SidebarOperations.checkAvailabilityOfData(
                      country,
                      selectedMapType,
                      fcsData,
                      nutritionData,
                      ipcData
                    )
                  }
                  endContent={
                    !SidebarOperations.checkAvailabilityOfData(
                      country,
                      selectedMapType,
                      fcsData,
                      nutritionData,
                      ipcData
                    )
                      ? 'No data'
                      : undefined
                  }
                >
                  {country.properties.adm0_name}
                </AutocompleteItem>
              ))}
          </Autocomplete>
        </CardHeader>
        <CardBody>
          <ScrollShadow className="w-full h-full flex flex-col">
            <div className="w-full">
              <span className="text-tiny text-foreground-500 pl-1">Global Insights</span>
              <div className="flex flex-col gap-1 pt-1">
                {SidebarOperations.getSidebarMapTypes().map((item) => (
                  <Button
                    startContent={
                      item.icon && (
                        <div className="flex items-center justify-center relative">
                          <NextImage
                            unoptimized
                            loading="eager"
                            src={item.icon}
                            alt={item.label}
                            width={24}
                            height={24}
                          />
                          {mapDataFetching[item.key] && <Spinner className="absolute" color="white" />}
                        </div>
                      )
                    }
                    key={item.key}
                    variant={selectedMapType === item.key ? undefined : 'light'}
                    className={clsx(
                      'justify-start dark:text-white',
                      selectedMapType === item.key ? 'bg-primary text-white' : 'text-black'
                    )}
                    onClick={() => onMapTypeSelect(item.key)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="w-full flex-grow">
              <span className="text-tiny text-foreground-500 pl-1">Alerts</span>
              <div className="pt-1">
                <AlertsMenu variant={AlertsMenuVariant.Inside} />
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4">
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
              <div className="grid grid-cols-2 gap-2 pl-3">
                {pageLinks
                  .filter((page) => page.label !== 'Home')
                  .map((page) => (
                    <Link key={page.label} href={page.href} color="foreground" className="text-tiny text-opacity-80">
                      {page.label}
                    </Link>
                  ))}
              </div>
            </div>
          </ScrollShadow>
        </CardBody>
      </Card>
    </div>
  );
}

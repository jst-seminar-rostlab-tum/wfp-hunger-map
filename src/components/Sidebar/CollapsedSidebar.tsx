import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Spinner } from '@nextui-org/spinner';
import { SidebarRight } from 'iconsax-react';
import NextImage from 'next/image';
import React from 'react';

import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { GlobalInsight } from '@/domain/enums/GlobalInsight.ts';
import { CollapsedSidebarProps } from '@/domain/props/CollapsedSidebarProps';
import { SidebarOperations } from '@/operations/sidebar/SidebarOperations';

import { Tooltip } from '../Tooltip/Tooltip';

/**
 * Minimized version of the main sidebar. The CollapsedSidebar serves as a compact navigation
 * interface, maintaining core functionality while maximizing screen space.
 *
 * It contains the Global Insights (Map type) quick-access buttons with icons only to save space.
 *
 * @component
 * @param {CollapsedSidebarProps} props - Component props
 * @param {Partial<Record<GlobalInsight, boolean>>} props.mapDataFetching - Object indicating loading state for each map type
 * @returns {React.JSX.Element} Collapsed sidebar component
 */
export function CollapsedSidebar({ mapDataFetching }: CollapsedSidebarProps): React.JSX.Element {
  const { toggleSidebar } = useSidebar();
  const { selectedMapType, setSelectedMapType } = useSelectedMap();
  const { clearAccordionModal } = useAccordionsModal();

  /**
   * Handles selection of different map types
   * @param {GlobalInsight} mapType - Type of map to select
   */
  const onMapTypeSelect = (mapType: GlobalInsight) => {
    clearAccordionModal();
    setSelectedMapType(mapType);
  };

  return (
    <div
      className="absolute top-0 left-0 z-sidebarCollapsed pt-4 pl-4"
      role="complementary"
      aria-label="Global insights map controls - collapsed sidebar view"
    >
      <Card className="h-full">
        <CardHeader className="flex justify-center items-center">
          <Button
            isIconOnly
            variant="light"
            onPress={toggleSidebar}
            aria-label="Expand sidebar map controls and navigation"
          >
            <SidebarRight aria-hidden="true" focusable="false" size={24} />
          </Button>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-1" role="radiogroup" aria-label="Global insights map type selection">
            {SidebarOperations.getSidebarMapTypes().map((item) => (
              <Tooltip key={item.key} text={item.label} placement="right">
                <Button
                  isIconOnly
                  variant={selectedMapType === item.key ? undefined : 'light'}
                  className={selectedMapType === item.key ? 'bg-primary' : undefined}
                  onPress={() => onMapTypeSelect(item.key)}
                  role="radio"
                  aria-label={`Show ${item.label} global insight map`}
                  aria-busy={mapDataFetching[item.key]}
                  aria-checked={selectedMapType === item.key}
                >
                  <div className="flex items-center justify-center relative" aria-hidden="true">
                    <NextImage unoptimized loading="eager" src={item.icon} alt={item.label} width={24} height={24} />
                    {mapDataFetching[item.key] && <Spinner className="absolute" color="white" />}
                  </div>
                </Button>
              </Tooltip>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

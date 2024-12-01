import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { SidebarRight } from 'iconsax-react';
import NextImage from 'next/image';

import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext';
import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { SidebarOperations } from '@/operations/sidebar/SidebarOperations';

export function CollapsedSidebar() {
  const { toggleSidebar } = useSidebar();
  const { selectedMapType, setSelectedMapType } = useSelectedMap();
  const { clearAccordionModal } = useAccordionsModal();

  return (
    <div className="absolute top-0 left-0 z-sidebarCollapsed mt-4 ml-4">
      <Card className="h-full">
        <CardHeader className="flex justify-center items-center">
          <Button isIconOnly variant="light" onClick={toggleSidebar} aria-label="Close sidebar">
            <SidebarRight size={24} />
          </Button>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-1">
            {SidebarOperations.getSidebarMapTypes().map((item) => (
              <Button
                isIconOnly
                key={item.key}
                variant={selectedMapType === item.key ? undefined : 'light'}
                className={selectedMapType === item.key ? 'bg-primary' : undefined}
                onClick={() => {
                  clearAccordionModal();
                  setSelectedMapType(item.key);
                }}
              >
                <NextImage unoptimized loading="eager" src={item.icon} alt={item.label} width={24} height={24} />
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { SidebarRight } from 'iconsax-react';
import NextImage from 'next/image';

import { useSelectedMap } from '@/domain/contexts/SelectedMapContext';
import { useSidebar } from '@/domain/contexts/SidebarContext';
import { SidebarOperations } from '@/operations/sidebar/SidebarOperations';

export function CollapsedSidebar() {
  const { toggleSidebar } = useSidebar();
  const { selectedMapType, setSelectedMapType } = useSelectedMap();

  return (
    <div className="absolute top-0 left-0 z-50 p-4">
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
                onClick={() => setSelectedMapType(item.key)}
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

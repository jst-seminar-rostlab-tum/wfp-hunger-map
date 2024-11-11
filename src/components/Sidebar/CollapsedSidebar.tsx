import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { SidebarRight } from 'iconsax-react';

import { CollapsedSidebarProps } from '@/domain/props/CollapsedSidebarProps';
import { SidebarOperations } from '@/operations/charts/SidebarOperations';

export function CollapsedSidebar({ selectedMapType, handleSelectionChange, toggleSidebar }: CollapsedSidebarProps) {
  return (
    <div className="absolute top-0 left-0 z-50 p-4">
      <Card className="h-full">
        <CardHeader className="flex justify-center items-center">
          <Button isIconOnly variant="light" onClick={toggleSidebar} aria-label="Close sidebar">
            <SidebarRight size={24} />
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
            {SidebarOperations.getSidebarMapTypes().map((item) => (
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

import { Button } from '@nextui-org/button';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover';
import React from 'react';

import CustomInfoCircle from '../CustomInfoCircle/CustomInfoCircle';
import { ReadMore } from '../ReadMore/ReadMore';

export function InfoPopover({
  infoIcon = <CustomInfoCircle />,
  popoverInfo,
}: {
  infoIcon?: React.ReactNode;
  popoverInfo: React.ReactNode;
}) {
  return (
    <Popover
      className="m-2"
      shouldCloseOnInteractOutside={(element) => {
        // needed when used inside the accorion
        if (element.getAttribute('type') === 'button') {
          return false;
        }
        return true;
      }}
    >
      <PopoverTrigger>
        <Button as="span" isIconOnly radius="full" className="w-[37px] h-[37px]" variant="light" aria-label="info icon">
          {infoIcon}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-2 max-w-[250px] prose prose-sm dark:prose-invert prose-headings:text-medium">
          <ReadMore maxHeight={100} maxExpandedHeight={200}>
            {popoverInfo}
          </ReadMore>
        </div>
      </PopoverContent>
    </Popover>
  );
}

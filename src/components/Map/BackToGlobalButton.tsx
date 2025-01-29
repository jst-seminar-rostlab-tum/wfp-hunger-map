'use client';

import { Button } from '@nextui-org/button';
import { Undo } from 'lucide-react';
import { useMap } from 'react-leaflet';

import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useMediaQuery } from '@/utils/resolution';

import { Tooltip } from '../Tooltip/Tooltip';

export default function BackToGlobalButton() {
  const { selectedCountryId } = useSelectedCountryId();
  const { clearAccordionModal } = useAccordionsModal();
  const isMobile = useMediaQuery('(max-width: 800px)');
  const map = useMap();

  const handleBackButtonClick = (): void => {
    map.zoomOut(4);
    clearAccordionModal();
  };

  if (selectedCountryId === null) {
    return null;
  }

  return isMobile ? (
    <Tooltip text="Global View" placement="bottom">
      <Button color="primary" variant="solid" onClick={handleBackButtonClick} isIconOnly>
        <Undo />
      </Button>
    </Tooltip>
  ) : (
    <Button color="primary" variant="solid" startContent={<Undo />} onClick={handleBackButtonClick}>
      Global View
    </Button>
  );
}

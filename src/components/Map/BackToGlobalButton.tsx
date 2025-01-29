'use client';

import { Button } from '@nextui-org/button';
import { Undo } from 'lucide-react';
import { useMap } from 'react-leaflet';

import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';
import { useMediaQuery } from '@/utils/resolution';

export default function BackToGlobalButton() {
  const { selectedCountryId } = useSelectedCountryId();
  const { clearAccordionModal } = useAccordionsModal();
  const isMobile = useMediaQuery('(max-width: 700px)');
  const map = useMap();

  const handleBackButtonClick = (): void => {
    map.zoomOut(4);
    clearAccordionModal();
  };

  if (selectedCountryId === null) {
    return null;
  }

  return isMobile ? (
    <Button
      color="primary"
      className="flex items-center space-x-2 text-white"
      variant="solid"
      onClick={handleBackButtonClick}
      isIconOnly
    >
      <Undo />
    </Button>
  ) : (
    <Button
      color="primary"
      className="flex items-center space-x-2 text-white"
      variant="solid"
      startContent={<Undo />}
      onClick={handleBackButtonClick}
    >
      Global View
    </Button>
  );
}

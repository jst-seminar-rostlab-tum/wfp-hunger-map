'use client';

import { Button } from '@nextui-org/button';
import { Undo } from 'lucide-react';
import { useMap } from 'react-leaflet';

import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext';
import { useSelectedCountryId } from '@/domain/contexts/SelectedCountryIdContext';

export default function BackToGlobalButton() {
  const { selectedCountryId } = useSelectedCountryId();
  const { clearAccordionModal } = useAccordionsModal();
  const map = useMap();

  const handleBackButtonClick = (): void => {
    map.zoomOut(4);
    clearAccordionModal();
  };

  return selectedCountryId ? (
    <div className="absolute right-[75px] top-[20px] z-[9999]">
      <Button
        color="primary"
        className="flex items-center space-x-2 text-white"
        variant="solid"
        startContent={<Undo />}
        onPress={handleBackButtonClick}
      >
        Global View
      </Button>
    </div>
  ) : null;
}

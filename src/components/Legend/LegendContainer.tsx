import { Button } from '@nextui-org/button';
import { Add } from 'iconsax-react';
import { useState } from 'react';

import { TRIGGER_CHAT } from '@/domain/constant/chatbot/Chatbot';
import LegendContainerProps from '@/domain/props/LegendContainerProps';
import { LegendOperations } from '@/operations/legends/LegendOperations.ts';
import { useMediaQuery } from '@/utils/resolution';

import CustomAccordion from '../Accordions/Accordion';
import { Tooltip } from '../Tooltip/Tooltip';
import GradientLegend from './GradientLegend';
import PointLegend from './PointLegend';

export default function LegendContainer({ items, loading = false }: LegendContainerProps) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [showInfoPopup, setInfoPopup] = useState(false);

  return !isMobile ? (
    <div className="w-[450px]">
      <CustomAccordion
        loading={loading}
        items={items.map((item) => ({
          title: item.title,
          iconSrc: '/Images/InfoIcon.svg',
          tooltipInfo: item.tooltipInfo,
          content: LegendOperations.isGradientLegendContainerItem(item) ? (
            <GradientLegend {...item} />
          ) : (
            <PointLegend {...item}>{item.renderItem ? (props) => item.renderItem?.(props) : undefined}</PointLegend>
          ),
        }))}
      />
    </div>
  ) : (
    <div className="absolute z-[9999] top-4 right-4">
      <Tooltip text={TRIGGER_CHAT}>
        <Button
          onClick={() => setInfoPopup(!showInfoPopup)}
          className="
        relative flex items-center justify-center min-w-12 h-12 px-1 rounded-full bg-content1 shadow-md"
        >
          <Add size={24} />
        </Button>
      </Tooltip>
    </div>
  );
}

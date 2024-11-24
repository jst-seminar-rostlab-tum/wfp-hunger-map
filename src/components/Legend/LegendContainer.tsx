import { Button } from '@nextui-org/button';
import { Information } from 'iconsax-react';
import { useState } from 'react';

import { INFO_POPUP_TOOLTIP } from '@/domain/constant/legend/mapLegendData';
import LegendContainerProps from '@/domain/props/LegendContainerProps';
import { LegendOperations } from '@/operations/legends/LegendOperations.ts';
import { useMediaQuery } from '@/utils/resolution';

import CustomAccordion from '../Accordions/Accordion';
import PopupModal from '../PopupModal/PopupModal';
import { Tooltip } from '../Tooltip/Tooltip';
import GradientLegend from './GradientLegend';
import PointLegend from './PointLegend';

export default function LegendContainer({ items, loading = false }: LegendContainerProps) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [showInfoPopup, setInfoPopup] = useState(false);

  return !isMobile ? (
    <div className="w-[450px] absolute bottom-5 right-0 z-50 mr-10">
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
    <>
      <div className="absolute z-50 bottom-3 right-16">
        <Tooltip text={items.length > 1 ? 'Legends Information' : 'Legend Information'}>
          <Button
            onClick={() => setInfoPopup(true)}
            className="
        relative flex items-center justify-center min-w-12 h-12 px-1 rounded-full bg-content1 shadow-md"
          >
            {/* TODO: Icon to be modified */}
            <Information size={32} />
          </Button>
        </Tooltip>
      </div>
      {showInfoPopup && (
        <PopupModal
          isModalOpen={showInfoPopup}
          toggleModal={() => setInfoPopup(!showInfoPopup)}
          modalTitle=""
          modalSize="lg"
          modalHeight="auto"
        >
          {items.map((item) =>
            LegendOperations.isGradientLegendContainerItem(item) ? (
              <>
                <div key={item.title} className="font-bold">
                  {item.title}
                </div>
                <GradientLegend key={item.title} {...item} />
              </>
            ) : (
              <>
                <div key={item.title} className="font-bold">
                  {item.title}
                </div>
                <PointLegend key={item.title} {...item}>
                  {item.renderItem ? (props) => item.renderItem?.(props) : undefined}
                </PointLegend>
              </>
            )
          )}
        </PopupModal>
      )}
    </>
  );
}

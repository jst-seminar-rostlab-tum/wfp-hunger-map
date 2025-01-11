'use client';

import { Button } from '@nextui-org/button';
import { useState } from 'react';

import LegendContainerProps from '@/domain/props/LegendContainerProps';
import { LegendOperations } from '@/operations/legends/LegendOperations.ts';
import { useMediaQuery } from '@/utils/resolution';

import AccordionContainer from '../Accordions/AccordionContainer';
import CustomInfoCircle from '../CustomInfoCircle/CustomInfoCircle';
import { InfoPopover } from '../InfoPopover/InfoPopover';
import PopupModal from '../PopupModal/PopupModal';
import { Tooltip } from '../Tooltip/Tooltip';
import GradientLegend from './GradientLegend';
import PointLegend from './PointLegend';

export default function LegendContainer({ items, loading = false }: LegendContainerProps) {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const [showInfoPopup, setInfoPopup] = useState(false);

  return !isMobile ? (
    <div className="w-[450px] absolute bottom-0 right-20 z-legend">
      <AccordionContainer
        loading={loading}
        multipleSelectionMode
        items={items.map((item) => ({
          title: item.title,
          infoIcon: <CustomInfoCircle />,
          tooltipInfo: item.tooltipInfo,
          popoverInfo: item.popoverInfo,
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
      <div className="absolute z-legend bottom-10 right-16">
        <Tooltip text={items.length > 1 ? 'Legends Information' : 'Legend Information'}>
          <Button
            onClick={() => setInfoPopup(true)}
            aria-label="Map legend"
            className="
        relative flex items-center justify-center min-w-10 h-10 px-1 rounded-full bg-content1 shadow-md"
          >
            {/* TODO: Icon to be modified */}
            <CustomInfoCircle size={28} />
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
                <div key={item.title} className="flex justify-between w-full">
                  <div className="font-bold">{item.title}</div>
                  <InfoPopover popoverInfo={item.popoverInfo} />
                </div>

                <GradientLegend key={item.title} {...item} />
              </>
            ) : (
              <>
                <div key={item.title} className="flex justify-between w-full">
                  <div className="font-bold">{item.title}</div>
                  <InfoPopover popoverInfo={item.popoverInfo} />
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

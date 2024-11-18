import LegendContainerProps from '@/domain/props/LegendContainerProps';
import { LegendOperations } from '@/operations/legends/LegendOperations.ts';

import CustomAccordion from '../Accordions/Accordion';
import GradientLegend from './GradientLegend';
import PointLegend from './PointLegend';

export default function LegendContainer({ items, loading = false }: LegendContainerProps) {
  return (
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
  );
}

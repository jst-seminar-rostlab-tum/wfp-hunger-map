import LegendContainerProps from '@/domain/props/LegendContainerProps';
import { LegendOperations } from '@/operations/legends/LegendOperations.ts';

import CustomAccordion from '../Accordions/Accordion';
import CustomInfoCircle from '../CustomInfoCircle/CustomInfoCircle';
import GradientLegend from './GradientLegend';
import PointLegend from './PointLegend';

export default function LegendContainer({ items, loading = false }: LegendContainerProps) {
  return (
    <div className="w-[450px]">
      <CustomAccordion
        loading={loading}
        items={items.map((item) => ({
          title: item.title,
          infoIcon: <CustomInfoCircle />,
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

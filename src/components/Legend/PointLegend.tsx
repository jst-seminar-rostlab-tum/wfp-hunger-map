import { v4 as uuid } from 'uuid';

import { PointLegendProps } from '@/domain/props/PointLegendProps';

/**
 * PointLegend component
 *
 * This component renders a visual legend for points, with an optional tooltip.
 * Each legend item is represented by a color and label, which are passed through the `records` prop.
 *
 * If children are provided, the component will render them using the provided record data. Otherwise,
 * it will render a default layout where each legend item displays a colored circle alongside a label.
 *
 * @param {PointLegendProps} props
 * @returns {JSX.Element}
 */
export default function PointLegend({ records, children }: PointLegendProps) {
  return (
    <div className="relative flex flex-col w-full md:w-96 px-4 py-3">
      <div className="flex flex-wrap gap-x-3 gap-y-2">
        {records.map((record) =>
          children ? (
            children({ record })
          ) : (
            <div key={uuid()} className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: `hsl(var(--nextui-${record.color}))` }}
              />
              <span className="text-sm">{record.label}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

import { Tooltip } from '@nextui-org/tooltip';
import { InfoCircle } from 'iconsax-react';
import { v4 as uuid } from 'uuid';

import { PointLegendProps } from '@/domain/props/PointLegendProps';

export default function PointLegend({ title, items, tooltipInfo }: PointLegendProps) {
  return (
    <div className="relative flex flex-col w-96 px-4 py-3 bg-surfaceGrey rounded-md">
      <span className="text-sm font-medium mb-2 self-start">{title}</span>
      {tooltipInfo && (
        <Tooltip showArrow content={tooltipInfo}>
          <div className="absolute top-2 right-2">
            <InfoCircle className="text-foreground" />
          </div>
        </Tooltip>
      )}
      <div className="flex flex-wrap gap-x-3 gap-y-2">
        {items.map((item) => (
          <div key={uuid()} className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(var(--nextui-${item.color}))` }} />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

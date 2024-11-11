import { v4 as uuid } from 'uuid';

import { PointLegendProps } from '@/domain/props/PointLegendProps';

export default function PointLegend({ title, items }: PointLegendProps) {
  return (
    <div className="flex flex-col w-96 px-4 py-3 bg-surfaceGrey rounded-md">
      <span className="text-sm font-medium mb-2 self-start">{title}</span>
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

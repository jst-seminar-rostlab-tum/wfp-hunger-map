import { PointLegendProps } from '@/domain/props/PointLegendProps';

export default function PointLegend({ records, children }: PointLegendProps) {
  return (
    <div className="relative flex flex-col w-full md:w-96 px-4 py-3">
      <div className="flex flex-wrap gap-x-3 gap-y-2">
        {records.map((record) =>
          children ? (
            children({ record })
          ) : (
            <div key={record.label} className="flex items-center space-x-2">
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

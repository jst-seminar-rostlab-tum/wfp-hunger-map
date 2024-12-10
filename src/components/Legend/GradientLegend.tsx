import { ColorsData } from '@/domain/props/ColorsData';
import GradientLegendProps from '@/domain/props/GradientLegendProps';

import { Tooltip } from '../Tooltip/Tooltip';

export default function GradientLegend({ colorsData, startLabel, endLabel, hasNotAnalyzedPoint }: GradientLegendProps) {
  const gradients: string = colorsData
    .map((colorData: ColorsData, index: number) => {
      const percentage = (index / (colorsData.length - 1)) * 100;
      return `hsl(var(--nextui-${colorData.color})) ${percentage}%`;
    })
    .join(', ');

  const segmentWidth: number = 100 / colorsData.length;

  return (
    <div className="relative flex flex-col items-end w-full md:w-96 px-4 py-3">
      {hasNotAnalyzedPoint && (
        <div className="flex items-center gap-x-2 mb-4">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: `hsl(var(--nextui-nutritionNotAnalyzed))` }}
          />
          <span className="text-xs font-medium">Not Analyzed</span>
        </div>
      )}

      <div className="relative w-full h-2 rounded-full" style={{ background: `linear-gradient(90deg, ${gradients})` }}>
        {colorsData.map((colorData, index) => (
          <div
            key={colorData.color}
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${segmentWidth}%`,
              left: `${index * segmentWidth}%`,
            }}
          >
            <Tooltip title={colorData.title} text={colorData.value} titleStyle="text-center" textStyle="text-center">
              <div
                className={`hover:bg-opacity-25 hover:bg-black group flex-1 h-full cursor-pointer ${index === 0 ? 'rounded-l-full' : ''} ${index === colorsData.length - 1 ? 'rounded-r-full' : ''}`}
                style={{
                  flexBasis: `${segmentWidth}%`,
                }}
              />
            </Tooltip>
          </div>
        ))}
      </div>

      <div className="flex justify-between w-full mt-2 text-xs font-medium">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
    </div>
  );
}

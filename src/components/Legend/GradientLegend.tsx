import clsx from 'clsx';

import { NutritionData } from '@/domain/enums/NutritionData';
import { ColorsData } from '@/domain/props/ColorsData';
import GradientLegendProps from '@/domain/props/GradientLegendProps';

import { Tooltip } from '../Tooltip/Tooltip';

/**
 * GradientLegend component
 *
 * This component renders a gradient legend with a tooltip
 * that displays the title and value of the corresponding color
 * in the gradient.
 *
 * @param {GradientLegendProps} props
 * @returns {JSX.Element}
 */
export default function GradientLegend({ colorsData, startLabel, endLabel, hasNotAnalyzedPoint }: GradientLegendProps) {
  const gradients: string = colorsData
    .map((colorData: ColorsData, index: number) => {
      // Calculate the percentage for each gradient segment
      const percentage = (index / (colorsData.length - 1)) * 100;
      return `hsl(var(--nextui-${colorData.color})) ${percentage}%`;
    })
    .join(', ');

  // Calculate the width of each segment
  const segmentWidth: number = 100 / colorsData.length;

  return (
    <div className="relative flex flex-col items-end w-full md:w-96 px-4 py-3">
      {hasNotAnalyzedPoint && (
        <div className="flex items-center gap-x-2 mb-4">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(var(--nextui-notAnalyzed))` }} />
          <span className="text-xs font-medium">{NutritionData.NOT_ANALYZED_DATA}</span>
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
            {/* Render a tooltip for each segment, activated on hover */}
            <Tooltip title={colorData.title} text={colorData.value} titleStyle="text-center" textStyle="text-center">
              <div
                className={clsx('hover:bg-opacity-25 hover:bg-black group flex-1 h-full cursor-pointer', {
                  'rounded-l-full': index === 0,
                  'rounded-r-full': index === colorsData.length - 1,
                })}
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

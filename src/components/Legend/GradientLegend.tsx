import { Tooltip } from '@nextui-org/tooltip';
import { InfoCircle } from 'iconsax-react';

import GradientLegendProps from '@/domain/props/GradientLegendProps';

export default function GradientLegend({
  startColor,
  middleColor,
  endColor,
  title,
  startLabel,
  endLabel,
  tooltipInfo,
}: GradientLegendProps) {
  return (
    <div className="relative flex flex-col items-center w-96 px-4 py-3 bg-surfaceGrey rounded-md">
      <span className="text-sm font-medium mb-2 self-start">{title}</span>
      {tooltipInfo && (
        <Tooltip showArrow content={tooltipInfo}>
          <div className="absolute top-2 right-2">
            <InfoCircle className="text-foreground" />
          </div>
        </Tooltip>
      )}
      <div
        className="flex items-center w-full h-2 rounded-full"
        style={{
          background: middleColor
            ? `linear-gradient(90deg, hsl(var(--nextui-${startColor})) 0%, hsl(var(--nextui-${middleColor})) 50%, hsl(var(--nextui-${endColor})) 100%)`
            : `linear-gradient(90deg, hsl(var(--nextui-${startColor})) 0%, hsl(var(--nextui-${endColor})) 100%)`,
        }}
      />
      <div className="flex justify-between w-full mt-2 text-xs font-medium">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
    </div>
  );
}

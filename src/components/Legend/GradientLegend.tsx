import GradientLegendProps from '@/domain/props/GradientLegendProps';

export default function GradientLegend({
  startColor,
  middleColor,
  endColor,
  startLabel,
  endLabel,
}: GradientLegendProps) {
  return (
    <div className="relative flex flex-col items-center w-96 px-4 py-3">
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

import GradientLegendProps from '@/domain/props/GradientLegendProps';

export default function GradientLegend({ colors, startLabel, endLabel }: GradientLegendProps) {
  const gradients: string = colors
    .map((color: string, index: number) => {
      const percentage = (index / (colors.length - 1)) * 100;
      return `hsl(var(--nextui-${color})) ${percentage}%`;
    })
    .join(', ');

  return (
    <div className="relative flex flex-col items-center w-full md:w-96 px-4 py-3">
      <div
        className="flex items-center w-full h-2 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${gradients})`,
        }}
      />
      <div className="flex justify-between w-full mt-2 text-xs font-medium">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
    </div>
  );
}

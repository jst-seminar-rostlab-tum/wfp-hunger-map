import { Tooltip as NextUITooltip } from '@nextui-org/tooltip';

import TooltipProps from '@/domain/props/TooltipProps';

/**
 * The Tooltip component renders a customizable tooltip. It is based on the NextUI Tooltip component.
 * It should be used as a wrapper for one or more components.
 * When hovering over these wrapped components, the tooltip appears with a delay.
 * @param children the wrapped components
 * @param title title of the tooltip (optional)
 * @param text textual content of the tooltip
 * @param delay delay with which tooltip appears on hover in milliseconds; default is 0
 * @param warning selected if the tooltip should be highlighted (optional)
 * @constructor
 */
export function Tooltip({ children, title, text, delay, warning }: TooltipProps) {
  const OFFSET: number = 10;
  const RADIUS = 'sm';
  const SHADOW = 'md';
  const COLOR = 'default';

  const borderStyle = warning ? 'border-2 border-warning' : '';

  const tooltipContent = title ? (
    <div>
      <h3 className="text-small font-bold mb-1"> {title} </h3>
      <p className="text-small font-normal"> {text} </p>
    </div>
  ) : (
    <p className="text-small font-normal"> {text} </p>
  );

  return (
    <NextUITooltip
      className={`${borderStyle} px-2.5 py-1.5 max-w-2xl`}
      content={tooltipContent}
      color={COLOR}
      delay={delay || 0}
      offset={OFFSET}
      radius={RADIUS}
      shadow={SHADOW}
    >
      {Array.isArray(children) ? <div> {...children} </div> : children}
    </NextUITooltip>
  );
}

import { Tooltip as NextUITooltip } from '@nextui-org/tooltip';
import clsx from 'clsx';

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
 * @param titleStyle tailwind classes to style the title (optional)
 * @param textStyle tailwind classes to style the text (optional)
 * @param offset offset of the tooltip, default is set to 10 (optional)
 * @constructor
 */
export function Tooltip({ children, title, text, delay, warning, titleStyle, textStyle, offset = 10 }: TooltipProps) {
  const RADIUS = 'sm';
  const SHADOW = 'md';
  const COLOR = 'default';

  const borderStyle = warning ? 'border-2 border-warning' : '';

  const tooltipContent = title ? (
    <div>
      <h3 className={clsx('text-small font-bold mb-1', titleStyle)}> {title} </h3>
      <p className={clsx('text-small font-normal', textStyle)}> {text} </p>
    </div>
  ) : (
    <p className={`text-small font-normal ${textStyle}`}> {text} </p>
  );

  return (
    <NextUITooltip
      className={`${borderStyle} px-2.5 py-1.5 max-w-2xl`}
      content={tooltipContent}
      color={COLOR}
      delay={delay || 0}
      offset={offset}
      radius={RADIUS}
      shadow={SHADOW}
    >
      {Array.isArray(children) ? <div> {...children} </div> : children}
    </NextUITooltip>
  );
}

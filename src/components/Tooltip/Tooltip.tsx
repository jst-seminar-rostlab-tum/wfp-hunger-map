// TODO fix eslint exception?
// eslint-disable-next-line import/no-extraneous-dependencies
import { Tooltip as NextUITooltip } from '@nextui-org/tooltip';

import TooltipProps from '@/domain/props/TooltipProps';

/**
 * TODO description
 */
export function Tooltip({ children, title, text, warning }: TooltipProps) {
  const DELAY: number = 1000;
  const OFFSET: number = 10;
  const RADIUS = 'sm';
  const SHADOW = 'md';

  const tooltipContent = title ? (
    <div>
      <p className="text-medium"> {title} </p>
      <p className="text-small"> {text} </p>
    </div>
  ) : (
    <p className="text-small"> {text} </p>
  );

  const color = warning ? 'warning' : 'default';

  return (
    <NextUITooltip content={tooltipContent} color={color} delay={DELAY} offset={OFFSET} radius={RADIUS} shadow={SHADOW}>
      <div> {children} </div>
    </NextUITooltip>
  );
}

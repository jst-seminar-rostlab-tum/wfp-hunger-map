// TODO fix eslint exception?
// eslint-disable-next-line import/no-extraneous-dependencies
import { Tooltip as NextUITooltip } from '@nextui-org/tooltip';

import TooltipProps from '@/domain/props/TooltipProps';

/**
 * TODO description
 */
export function Tooltip({ children, title, text }: TooltipProps) {
  return <NextUITooltip content={text + title}> {children} </NextUITooltip>;
}

'use client';

import { Switch } from '@nextui-org/switch';
import { useTheme } from 'next-themes';

import { Tooltip } from '@/components/Tooltip/Tooltip';

/**
 * For testing purposes only -> todo: to be deleted after PR
 */
export default function Sandbox() {
  const { theme, setTheme } = useTheme();

  const tooltipTestBox = (
    <div className="w-full h-fit flex flex-row flex-wrap gap-10 justify-between px-8 pt-40 pb-16 border-b border-gray-800">
      <Tooltip text="Lorem ipsum dolor">
        <div className="border-1 p-1">simple tooltip</div>
      </Tooltip>
      <Tooltip
        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod."
        title="Lorem ipsum dolor sit ame"
      >
        <div className="border-1 p-1">
          <p>tooltip with</p>
          title
        </div>
      </Tooltip>
      <Tooltip text="Dolore magna aliquyam erat, sed diam voluptua." warning>
        <div className="border-1 p-1">tooltip and warning</div>
      </Tooltip>
      <Tooltip
        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
        title="dolore magna aliquyam erat"
        warning
      >
        <div className="border-1 p-1">maxed out tooltip</div>
      </Tooltip>
    </div>
  );

  return (
    <>
      <div className="w-full h-10 p-8 flex flex-row items-center gap-4 border-b border-gray-800">
        <p> Change dark/light mode: </p>
        <Switch onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle theme" size="sm" />
      </div>
      {tooltipTestBox}
      <div className="w-full h-fit p-8 border-b border-gray-800"> Sandbox 2</div>
    </>
  );
}

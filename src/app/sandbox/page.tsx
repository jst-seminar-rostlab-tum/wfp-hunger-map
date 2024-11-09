'use client';

import { Switch } from '@nextui-org/switch';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import { InformationPopup } from '@/components/InformationPopup/InformationPopup';
import { Tooltip } from '@/components/Tooltip/Tooltip';

/**
 * For testing purposes only -> todo: to be deleted after PR
 */
export default function Sandbox() {
  const { theme, setTheme } = useTheme();

  const tooltipTestBox = (
    <div className="w-full h-fit flex flex-row flex-wrap gap-10 justify-around px-8 pt-40 pb-16 border-b border-gray-800">
      <Tooltip text="Lorem ipsum dolor">
        <div className="border-1 p-2">simple tooltip</div>
      </Tooltip>
      <Tooltip
        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod."
        title="Lorem ipsum dolor sit ame"
      >
        <div className="border-1 p-2">
          <p>tooltip with</p>
          title
        </div>
      </Tooltip>
      <Tooltip text="Dolore magna aliquyam erat, sed diam voluptua." warning>
        <div className="border-1 p-2">tooltip and warning</div>
      </Tooltip>
      <Tooltip
        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
        title="dolore magna aliquyam erat"
        warning
      >
        <div className="border-1 p-2">maxed out tooltip</div>
      </Tooltip>
    </div>
  );

  const [popupOpen1, setPopupOpen1] = useState<boolean>(false);
  const [popupOpen2, setPopupOpen2] = useState<boolean>(false);

  const infoPopupTestBox = (
    <div className="w-full h-fit flex flex-row flex-wrap gap-10 justify-around px-8 pt-40 pb-16 border-b border-gray-800">
      {/* eslint-disable-next-line react/button-has-type */}
      <button className="border-1 p-2" onClick={() => setPopupOpen1(true)}>
        simple information popup
      </button>
      <InformationPopup
        popupOpen={popupOpen1}
        closePopup={() => setPopupOpen1(false)}
        title="Lorem ipsum dolor"
        content={[
          {
            subtitle: 'Consetetur sadipscing elitr sed diam',
            paragraphs: [
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            ],
          },
          {
            subtitle: 'Lorem ipsum dolor',
            paragraphs: [
              'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
              'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            ],
          },
        ]}
      />
      {/* eslint-disable-next-line react/button-has-type */}
      <button className="border-1 p-2" onClick={() => setPopupOpen2(true)}>
        maxed out information popup
      </button>
      <InformationPopup
        popupOpen={popupOpen2}
        closePopup={() => setPopupOpen2(false)}
        warning
        title="Lorem ipsum dolor"
        content={[
          {
            subtitle: 'Consetetur sadipscing elitr sed diam',
            paragraphs: [
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            ],
          },
          {
            subtitle: 'Lorem ipsum dolor',
            paragraphs: [
              'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            ],
          },
          {
            paragraphs: [
              'Ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
              'Ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            ],
          },
          {
            paragraphs: [
              'Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
              'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
              'Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            ],
          },
          {
            subtitle: 'Dolor sit amet',
            paragraphs: [
              'Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
              'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
              'Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            ],
          },
          {
            subtitle: 'Ipsum elitr',
            paragraphs: [
              'Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
              'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
              'Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
            ],
          },
        ]}
      />
    </div>
  );

  return (
    <>
      <div className="w-full h-10 p-8 flex flex-row items-center gap-4 border-b border-gray-800">
        <p> Change dark/light mode: </p>
        <Switch onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle theme" size="sm" />
      </div>
      {tooltipTestBox}
      {infoPopupTestBox}
    </>
  );
}

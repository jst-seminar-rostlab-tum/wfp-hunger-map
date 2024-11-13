'use client';

import { useState } from 'react';

import { InformationPopup } from '@/components/InformationPopup/InformationPopup';

export default function PopupPreview() {
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
  return <div>{infoPopupTestBox}</div>;
}

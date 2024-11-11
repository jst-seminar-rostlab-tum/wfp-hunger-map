import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import React, { useEffect } from 'react';

import InformationPopupProps from '@/domain/props/InformationPopupProps';

/**
 * The InformationPopup component renders a popup with text content only. When the popup is open, the screen is dimmed,
 * and only the popup is shown. The text content is specified using `content`, which can include multiple sections
 * with a `title` (optional) and multiple text 'paragraphs'.
 *
 * To trigger the opening of the popup, a boolean variable `popupOpen` must be passed to the InformationPopup,
 * so it knows whether it should be open or closed. To allow the popup to close itself, the `closePopup` function needs
 * to be passed that the InformationPopup can trigger, which will then set popupOpen to false. This should usually
 * be implemented using React’s `useState`.
 * @param popupOpen state if popup is open or closed
 * @param closePopup function that can be called by the popup, which changes the popupOpen to `false`
 * @param title title of the entire popup
 * @param content popups text sections - each section contains an title (optional) and a list of paragraphs
 * @param warning selected if the popup should be highlighted (optional)
 * @constructor
 */
export function InformationPopup({ popupOpen, closePopup, title, content, warning }: InformationPopupProps) {
  const SIZE = 'md';
  const PLACEMENT = 'auto'; // bigger screens: centered, mobile: bottom
  const BACKDROP = 'opaque';
  const RADIUS = 'sm';
  const SCROLL_BEHAVIOUR = 'inside';

  /**
   * If the InformationPopup is opened by the parent component, popupOpen is set to `true` by the parent.
   * When the InformationPopup is closed, the parent component should be notified so that popupOpen can set to false.
   */
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (popupOpen) onOpen();
  }, [popupOpen]);

  useEffect(() => {
    if (!isOpen) closePopup();
  }, [isOpen]);

  /**
   * Setup content.
   */

  const borderStyle = warning ? 'border-4 border-warning' : '';

  const textContent = content.map((c) => {
    return (
      <>
        <p className="text-small font-bold mt-4"> {c.subtitle} </p>
        {c.paragraphs.map((t, idx) => (
          <p id={t + idx} className="text-small font-normal">
            {t}
          </p>
        ))}
      </>
    );
  });

  return (
    <Modal
      backdrop={BACKDROP}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius={RADIUS}
      size={SIZE}
      placement={PLACEMENT}
      scrollBehavior={SCROLL_BEHAVIOUR}
      className="bg-background"
    >
      <ModalContent className={`${borderStyle} pb-3`}>
        <ModalHeader className="flex flex-col text-medium font-bold gap-1"> {title} </ModalHeader>
        <ModalBody className="gap-1"> {...textContent} </ModalBody>
      </ModalContent>
    </Modal>
  );
}

import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import React, { useEffect } from 'react';

import InformationPopupProps from '@/domain/props/InformationPopupProps';

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
        {c.textSections.map((t) => (
          <p className="text-small font-normal"> {t}</p>
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
    >
      <ModalContent className={`${borderStyle} pb-3`}>
        <ModalHeader className="flex flex-col text-medium font-bold gap-1"> {title} </ModalHeader>
        <ModalBody className="gap-1"> {...textContent} </ModalBody>
      </ModalContent>
    </Modal>
  );
}

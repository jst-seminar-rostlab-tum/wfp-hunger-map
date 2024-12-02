'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { ArrowUp2 } from 'iconsax-react';

import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext';
import { useMediaQuery } from '@/utils/resolution.ts';

/**
 * The accordions can be configured to be hidden in a modal on mobile screens, which can be accessed
 * via a button at the bottom. This component provides the modal and the button to open it.
 * The content for the modal, including the accordions, is provided via the 'userAccordionsModal' hook.
 * Important: Exclusively used by `AccordionContainer` component.
 */
export default function AccordionModal() {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const isMobileXS = useMediaQuery('(max-width: 450px)');
  const { modalContent, modalTitle } = useAccordionsModal();
  const {
    isOpen: isAccordionModalOpen,
    onOpen: onAccordionModalOpen,
    onOpenChange: onAccordionModalOpenChange,
  } = useDisclosure();

  return isMobile && modalContent !== null ? (
    <>
      {isMobileXS ? (
        <Button
          color="primary"
          variant="solid"
          className="absolute z-accordionsModalButton bottom-10 right-28 rounded-full text-white"
          isIconOnly
          onClick={onAccordionModalOpen}
        >
          <ArrowUp2 className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          color="primary"
          variant="solid"
          className="absolute z-accordionsModalButton bottom-10 right-28 text-white"
          startContent={<ArrowUp2 className="h-5 w-5" />}
          onClick={onAccordionModalOpen}
        >
          Insights
        </Button>
      )}
      <Modal
        size="2xl"
        isOpen={isAccordionModalOpen}
        backdrop="blur"
        scrollBehavior="inside"
        onOpenChange={onAccordionModalOpenChange}
        className="bg-background"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
          <ModalBody>{modalContent}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  ) : null;
}

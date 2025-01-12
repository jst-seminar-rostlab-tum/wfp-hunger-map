'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { ArrowUp2 } from 'iconsax-react';

import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext';
import { useMediaQuery } from '@/utils/resolution.ts';

/**
 * AccordionModal - A responsive component that provides a modal for displaying accordions on mobile screens.
 * This component is specifically designed for mobile usage:
 * - On screens smaller than 700px, it displays a button at the bottom right corner to open the modal.
 * - On screens smaller than 450px, the button is circular and icon-only.
 * - On screens between 450px and 700px, the button includes an "Insights" label alongside the icon.
 * The modal content and title are managed via the `useAccordionsModal` hook.
 * Important: This component is intended to be exclusively used by the `AccordionContainer` component.
 *
 * @returns {JSX.Element | null} The accordion modal component, or `null` if not in a mobile view or modal content is empty.
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

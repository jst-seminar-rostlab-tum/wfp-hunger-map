'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/modal';

import { useAccordionsModal } from '@/domain/contexts/AccodionsModalContext';
import { useMediaQuery } from '@/utils/resolution.ts';

// todo linus descr
export default function AccordionModal() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { modalContent } = useAccordionsModal();
  const {
    isOpen: isAccordionModalOpen,
    onOpen: onAccordionModalOpen,
    onOpenChange: onAccordionModalOpenChange,
  } = useDisclosure();

  return isMobile && modalContent !== null ? (
    <>
      <Button
        color="primary"
        variant="solid"
        className="absolute z-accordionsModalButton bottom-3 right-28 text-white"
        onClick={onAccordionModalOpen}
      >
        Country Insights
      </Button>

      <Modal
        size="2xl"
        isOpen={isAccordionModalOpen}
        backdrop="blur"
        scrollBehavior="inside"
        onOpenChange={onAccordionModalOpenChange}
        className="bg-background"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">header</ModalHeader>
          <ModalBody>{modalContent}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  ) : null;
}

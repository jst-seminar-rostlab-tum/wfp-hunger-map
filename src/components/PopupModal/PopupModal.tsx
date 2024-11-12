'use client';

import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal';

import PopupModalProps from '@/domain/props/PopupModalProps';

export default function PopupModal({
  isModalOpen,
  toggleModal,
  modalTitle,
  modalSize,
  modalHeight,
  children,
}: PopupModalProps) {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isModalOpen}
      onOpenChange={toggleModal}
      classNames={{
        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        base: `p-10 ${modalHeight}`,
      }}
      size={modalSize}
    >
      <ModalContent>
        <ModalHeader className="text-3xl font-bold mb-2">{modalTitle}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

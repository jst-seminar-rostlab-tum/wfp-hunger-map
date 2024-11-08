'use client';

import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';

interface PopupModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  modalTitle: string;
  modalSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  children: React.ReactNode; // modalBody
}

export default function PopupModal({ isModalOpen, toggleModal, modalTitle, modalSize, children }: PopupModalProps) {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isModalOpen}
      onOpenChange={toggleModal}
      classNames={{
        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        base: 'p-10',
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

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
        base: `xl:p-10 lg:p-8 md:p-6 sm:p-4 ${modalHeight}`,
      }}
      size={modalSize}
    >
      <ModalContent>
        <ModalHeader className="xl:text-3xl text-2xl font-bold justify-center">{modalTitle}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

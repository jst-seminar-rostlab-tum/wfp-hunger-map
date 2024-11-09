import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal';

import InformationPopupProps from '@/domain/props/InformationPopupProps';

export function InformationPopup({ isOpen, title, content, warning }: InformationPopupProps) {
  const SIZE = 'md';
  const PLACEMENT = 'auto'; // = bigger screens: centered, mobile: bottom
  const BACKDROP = 'opaque';
  const RADIUS = 'sm';

  const borderStyle = warning ? 'border-4 border-warning' : '';

  const textContent = content.map((c) => {
    return (
      <>
        <p className="text-small font-bold mt-4"> {c.subtitle} </p>
        <p className="text-small font-normal"> {c.text} </p>
      </>
    );
  });

  return (
    <Modal backdrop={BACKDROP} isOpen={isOpen} radius={RADIUS} size={SIZE} placement={PLACEMENT}>
      <ModalContent className={`${borderStyle} pb-3`}>
        <ModalHeader className="flex flex-col text-medium font-bold gap-1"> {title} </ModalHeader>
        <ModalBody className="gap-0.5"> {...textContent} </ModalBody>
      </ModalContent>
    </Modal>
  );
}

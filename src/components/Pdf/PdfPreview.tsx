import { Modal, ModalBody, ModalContent } from '@nextui-org/modal';

import { PdfFile } from '@/domain/props/PdfViewerProps';

import PdfLoader from './PdfLoader';

interface PdfPreviewProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  pdfFile: PdfFile | null;
  error: string | null;
  onDownloadPdf: () => void;
}

export default function PdfPreview({ isModalOpen, toggleModal, pdfFile, error, onDownloadPdf }: PdfPreviewProps) {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isModalOpen}
      onOpenChange={toggleModal}
      scrollBehavior="outside"
      size="5xl"
      classNames={{
        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
      }}
      className="bg-background"
      hideCloseButton
    >
      <ModalContent>
        <ModalBody>
          {error ? (
            <div className="bg-background text-danger border rounded-md p-4 text-center">{error}</div>
          ) : (
            <PdfLoader file={pdfFile} onDownloadPdf={onDownloadPdf} onClose={toggleModal} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

import { Modal, ModalBody, ModalContent } from '@nextui-org/modal';

import PdfPreviewProps from '@/domain/props/PdfPreviewProps';

import PdfLoader from './PdfLoader';

/**
 * The `PdfPreview` component renders a modal to preview a PDF file.
 * Includes functionality to toggle the modal, display errors, and download the PDF file.
 *
 * @param {Object} props The properties for the PdfPreview component.
 * @param {boolean} props.isModalOpen Indicates whether the modal is open.
 * @param {() => void} props.toggleModal Function to toggle the modal's open state.
 * @param {string | Blob | null} props.pdfFile The PDF file to be displayed in the modal.
 * @param {string | null} [props.error] An error message to display if the PDF cannot be loaded.
 * @param {IReportContext} [props.reportContext] The context of the report to be used for the 'Ask AI' button.
 * @param {() => void} [props.onDownloadPdf] Function to handle downloading the PDF file.
 * @returns {JSX.Element} The rendered PdfPreview component.
 * @param {(IReportContext) => void} Function to be called when the AskAI button is clicked
 */
export default function PdfPreview({
  isModalOpen,
  toggleModal,
  pdfFile,
  error,
  reportContext,
  onDownloadPdf,
  onAskAIButtonClick,
}: PdfPreviewProps): JSX.Element {
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
      isDismissable={false}
    >
      <ModalContent>
        <ModalBody>
          {error ? (
            <div className="bg-background text-danger border rounded-md p-4 text-center">{error}</div>
          ) : (
            <PdfLoader
              file={pdfFile}
              onAskAIButtonClick={onAskAIButtonClick}
              reportContext={reportContext}
              onDownloadPdf={onDownloadPdf}
              onClose={toggleModal}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

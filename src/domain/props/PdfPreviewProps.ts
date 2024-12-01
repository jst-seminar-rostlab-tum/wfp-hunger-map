import { PdfFile } from './PdfViewerProps';

export default interface PdfPreviewProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  pdfFile: PdfFile | null;
  error: string | null;
  onDownloadPdf: () => void;
}

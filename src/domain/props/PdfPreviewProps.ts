import { IReportContext } from '../entities/chatbot/Chatbot';
import { PdfFile } from './PdfViewerProps';

export default interface PdfPreviewProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  pdfFile: PdfFile | null;
  error: string | null;
  onDownloadPdf: () => void;
  onAskAIButtonClick?: (reportContext: IReportContext) => void;
  reportContext: IReportContext;
}

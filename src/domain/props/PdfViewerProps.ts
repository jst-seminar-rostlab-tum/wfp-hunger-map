import { IReportContext } from '../entities/chatbot/Chatbot';

export type PdfFile = string | Blob;

export interface PdfViewerProps {
  onClose?: () => void;
  onAskAIButtonClick?: (reportContext: IReportContext) => void;
  onDownloadPdf?: () => void;
  onDownloadJson?: () => void;
  onDownloadCsv?: () => void;
  file: PdfFile | null;
  reportContext: IReportContext;
}

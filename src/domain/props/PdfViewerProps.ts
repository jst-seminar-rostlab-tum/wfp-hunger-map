import { Source } from 'react-pdf/dist/cjs/shared/types';

export type PdfFile = string | ArrayBuffer | Blob | Source;

export interface PdfViewerProps {
  onTooltipClick?: (selectionText: string) => void;
  onDownloadPdf?: () => void;
  onDownloadJson?: () => void;
  onDownloadCsv?: () => void;
  file: PdfFile | null;
}

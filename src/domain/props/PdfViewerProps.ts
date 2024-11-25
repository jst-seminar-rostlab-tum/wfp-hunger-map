import { Source } from 'react-pdf/dist/cjs/shared/types';

export default interface PdfViewerProps {
  onTooltipClick?: (selectionText: string) => void;
  onDownloadPdf?: () => void;
  onDownloadJson?: () => void;
  onDownloadCsv?: () => void;
  file: string | ArrayBuffer | Blob | Source | null;
}

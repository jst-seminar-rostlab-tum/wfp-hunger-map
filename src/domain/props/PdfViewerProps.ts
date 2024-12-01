export type PdfFile = string | Blob;

export interface PdfViewerProps {
  onClose?: () => void;
  onTooltipClick?: (selectionText: string) => void;
  onDownloadPdf?: () => void;
  onDownloadJson?: () => void;
  onDownloadCsv?: () => void;
  file: PdfFile | null;
}

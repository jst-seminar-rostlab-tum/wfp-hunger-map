export type PdfFile = string | Blob;

export interface PdfViewerProps {
  onTooltipClick?: (selectionText: string) => void;
  onDownloadPdf?: () => void;
  onDownloadJson?: () => void;
  onDownloadCsv?: () => void;
  file: PdfFile | null;
}

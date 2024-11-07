export default interface PdfViewerProps {
  onTooltipClick: (selectionText: string) => void;
  onDownloadPdf: () => void;
  onDownloadJson: () => void;
  onDownloadCsv: () => void;
  file: string;
}

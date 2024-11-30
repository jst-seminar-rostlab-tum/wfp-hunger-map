export default class PdfViewerOperations {
  static trackVisiblePage(document: Document, updatePageNumber: (pageNumber: number) => void): void {
    const pages = document.querySelectorAll('.react-pdf__Page');
    let largestVisibleArea = 0;
    let currentPage = 1;

    pages.forEach((page, index) => {
      const rect = page.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      if (visibleHeight > largestVisibleArea && visibleHeight > 0) {
        largestVisibleArea = visibleHeight;
        currentPage = index + 1;
      }
    });

    updatePageNumber(currentPage);
  }

  static getDisabledKeys(
    onDownloadPdf?: () => void,
    onDownloadJson?: () => void,
    onDownloadCsv?: () => void
  ): string[] {
    return ['pdf', 'json', 'csv'].filter((key) => {
      switch (key) {
        case 'pdf':
          return !onDownloadPdf;
        case 'json':
          return !onDownloadJson;
        case 'csv':
          return !onDownloadCsv;
        default:
          return false;
      }
    });
  }
}

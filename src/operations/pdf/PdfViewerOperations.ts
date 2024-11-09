export default class PdfViewerOperations {
  static handleDocumentScroll(
    document: Document,
    updatePageNumber: (pageNumber: number) => void,
    currentPageNumber: number
  ): void {
    const pages = document.querySelectorAll('.react-pdf__Page');
    let currentPage = currentPageNumber;

    pages.forEach((page, index) => {
      const rect = page.getBoundingClientRect();
      const pageTop = rect.top;
      const pageBottom = rect.bottom;
      const viewportMidpoint = window.innerHeight / 2;

      if (pageTop < viewportMidpoint && pageBottom > viewportMidpoint) {
        currentPage = index + 1;
      }
    });

    updatePageNumber(currentPage);
  }
}

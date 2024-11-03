'use client';

import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

export function PdfViewer() {
  const [totalPages, setTotalPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);

  const handleScroll = () => {
    const pages = document.querySelectorAll('.react-pdf__Page');
    let currentPage = pageNumber;

    pages.forEach((page, index) => {
      const rect = page.getBoundingClientRect();
      const pageTop = rect.top;
      const pageBottom = rect.bottom;
      const viewportMidpoint = window.innerHeight / 2;

      // Detect the most visible page in the viewport
      if (pageTop < viewportMidpoint && pageBottom > viewportMidpoint) {
        currentPage = index + 1;
      }
    });

    setPageNumber(currentPage);
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setTotalPages(numPages);

    window.addEventListener('scroll', handleScroll);
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      {/* Top Bar */}
      <div className="w-full py-4 flex items-center justify-between px-6 sticky top-0 z-10">
        <h1 color="secondary" className="text-lg font-semibold">
          Preview
        </h1>
        <Chip color="secondary" size="md">
          <p className="text-sm">
            {pageNumber} / {totalPages}
          </p>
        </Chip>
        <Button color="secondary">Download</Button>
      </div>

      {/* PDF Viewer */}
      <div className="flex-grow flex justify-center items-center py-10 z-0">
        <div className="p-4 rounded-lg shadow-lg w-full max-w-3xl">
          <Document file="/report.pdf" onLoadSuccess={onDocumentLoadSuccess} className="flex-col items-center">
            {Array.from(new Array(totalPages), (el, index) => (
              <Page
                canvasBackground="transparent"
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                className="rounded-lg"
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

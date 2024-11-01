'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

export function PdfViewer() {
  const [pages, setPages] = useState<number>();
  const [pageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setPages(numPages);
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-start text-white">
      {/* Top Bar */}
      <div className="w-full bg-gray-800 py-4 flex items-center justify-between px-6 sticky top-0">
        <h1 className="text-lg font-semibold">Preview</h1>
        <p className="text-sm">
          {pageNumber} / {pages}
        </p>
      </div>

      {/* PDF Viewer */}
      <div className="flex-grow flex justify-center items-center py-10">
        <div className="bg-gray-700 p-4 rounded-lg shadow-lg w-full max-w-3xl">
          <Document file="/report.pdf" onLoadSuccess={onDocumentLoadSuccess} className="flex flex-col items-center">
            {Array.from(new Array(pages), (el, index) => (
              <Page
                canvasBackground="bg-gray-900"
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="rounded-lg"
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

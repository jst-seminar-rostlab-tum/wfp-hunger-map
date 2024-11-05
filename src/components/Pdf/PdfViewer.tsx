'use client';

import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/tooltip';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { PdfViewerProps } from '@/domain/props/PdfViewerProps';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

export function PdfViewer({ onTooltipClick, file, onDownloadPdf, onDownloadJson, onDownloadCsv }: PdfViewerProps) {
  const [totalPages, setTotalPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [selectionText, setSelectionText] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);

  const handleScroll = () => {
    const pages = document.querySelectorAll('.react-pdf__Page');
    let currentPage = pageNumber;

    pages.forEach((page, index) => {
      const rect = page.getBoundingClientRect();
      const pageTop = rect.top;
      const pageBottom = rect.bottom;
      const viewportMidpoint = window.innerHeight / 2;

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

  function onSelectStart() {
    setSelectionText(null);
  }

  function onSelectEnd() {
    const activeSelection = document.getSelection();
    const text = activeSelection?.toString();

    if (!activeSelection || !text) {
      setSelectionText(null);
      return;
    }

    setSelectionText(text);

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

    setTooltipPosition({
      top: rect.top + window.scrollY - 10,
      left: rect.left + rect.width / 2,
    });
  }

  useEffect(() => {
    document.addEventListener('selectstart', onSelectStart);
    document.addEventListener('mouseup', onSelectEnd);

    return () => {
      document.removeEventListener('selectstart', onSelectStart);
      document.removeEventListener('mouseup', onSelectEnd);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative">
      {/* Top Bar */}
      <div className="bg-background w-full py-4 flex items-center justify-between px-6 sticky top-0 z-10">
        <h1 className="text-lg font-semibold">Preview</h1>
        <Chip color="secondary" size="md">
          <p className="text-sm">
            {pageNumber} / {totalPages}
          </p>
        </Chip>
        {/* <Button onClick={onDownloadClick} color="secondary">Download</Button> */}
        <Dropdown>
          <DropdownTrigger>
            <Button color="secondary">Download As</Button>
          </DropdownTrigger>
          <DropdownMenu color="secondary">
            <DropdownItem onClick={onDownloadPdf}>Pdf</DropdownItem>
            <DropdownItem onClick={onDownloadJson}>Json</DropdownItem>
            <DropdownItem onClick={onDownloadCsv}>Csv</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* PDF Viewer */}
      <div className="flex-grow flex justify-center items-center pb-10 z-0">
        <div className="w-full max-w-3xl">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className="flex-col items-center">
            {Array.from(new Array(totalPages), (el, index) => (
              <Page
                canvasBackground="transparent"
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                // className="rounded-lg"
              />
            ))}
          </Document>
        </div>
      </div>

      {/* Tooltip */}
      {tooltipPosition && selectionText && (
        <div className="absolute z-20 p-2 rounded-lg" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
          <Tooltip
            color="primary"
            showArrow
            isOpen
            content={
              <Button size="sm" color="primary" onClick={() => onTooltipClick(selectionText)}>
                Ask AI
              </Button>
            }
          >
            <div />
          </Tooltip>
        </div>
      )}
    </div>
  );
}

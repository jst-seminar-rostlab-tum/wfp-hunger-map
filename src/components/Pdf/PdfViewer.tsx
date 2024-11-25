'use client';

import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/tooltip';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import PdfViewerProps from '@/domain/props/PdfViewerProps';
import PdfViewerOperations from '@/operations/pdf/PdfViewerOperations';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

export function PdfViewer({
  file,
  onTooltipClick = () => {},
  onDownloadPdf = () => {},
  onDownloadJson = () => {},
  onDownloadCsv = () => {},
}: PdfViewerProps) {
  const [totalPages, setTotalPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const [selectionText, setSelectionText] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);

  const handleDocumentScroll = (): void => {
    PdfViewerOperations.handleDocumentScroll(document, setPageNumber, pageNumber);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setTotalPages(numPages);
    window.addEventListener('scroll', handleDocumentScroll);
  };

  const onSelectStart = (): void => {
    setSelectionText(null);
  };

  const onSelectEnd = (): void => {
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
  };

  useEffect(() => {
    document.addEventListener('selectstart', onSelectStart);
    document.addEventListener('mouseup', onSelectEnd);

    return () => {
      document.removeEventListener('selectstart', onSelectStart);
      document.removeEventListener('mouseup', onSelectEnd);
      window.removeEventListener('scroll', handleDocumentScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative">
      {/* Top Bar */}
      <div className="bg-surfaceGrey shadow-md w-full py-4 flex justify-between items-center px-6 sticky top-0 z-10">
        <h1 className="text-lg font-semibold">Preview</h1>
        <Chip className="absolute left-1/2 transform -translate-x-1/2" color="secondary" size="md">
          <p className="text-sm text-black">
            {pageNumber} / {totalPages}
          </p>
        </Chip>
        <Dropdown>
          <DropdownTrigger>
            <Button className="text-black" color="secondary">
              Download As
            </Button>
          </DropdownTrigger>
          <DropdownMenu color="secondary">
            <DropdownItem onClick={onDownloadPdf}>Pdf</DropdownItem>
            <DropdownItem onClick={onDownloadJson}>Json</DropdownItem>
            <DropdownItem onClick={onDownloadCsv}>Csv</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* PDF Viewer */}
      <div className="w-full h-full bg-surfaceGrey flex-grow flex justify-center items-center pb-10 z-0">
        <div className="max-w-3xl">
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className="flex-col items-center mx-auto">
            {Array.from(new Array(totalPages), (_, index) => (
              <Page canvasBackground="transparent" key={`page_${index + 1}`} pageNumber={index + 1} />
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

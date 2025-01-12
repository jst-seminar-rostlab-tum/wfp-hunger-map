'use client';

import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/tooltip';
import { DocumentDownload, Minus } from 'iconsax-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { PdfViewerProps } from '@/domain/props/PdfViewerProps';
import PdfViewerOperations from '@/operations/pdf/PdfViewerOperations';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

/**
 * The `PdfViewer` component displays a PDF file in a viewer.
 * Includes functionality for text selection, downloads, and scrolling through pages.
 *
 * @param {Object} props The properties for the PdfViewer component.
 * @param {string | Blob | null} props.file The PDF file to be displayed.
 * @param {() => void} [props.onClose] Function to close the PDF viewer.
 * @param {(selectionText: string) => void} [props.onTooltipClick] Function to handle the tooltip click.
 * @param {() => void} [props.onDownloadPdf] Function to download the PDF file.
 * @param {() => void} [props.onDownloadJson] Function to download JSON data related to the PDF file.
 * @param {() => void} [props.onDownloadCsv] Function to download CSV data related to the PDF file.
 * @returns {JSX.Element} The rendered PdfViewer component.
 */
export default function PdfViewer({
  file,
  onClose,
  onTooltipClick,
  onDownloadPdf,
  onDownloadJson,
  onDownloadCsv,
}: PdfViewerProps): JSX.Element {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectionText, setSelectionText] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);
  const [pageWidth, setPageWidth] = useState(window.innerWidth * 0.9);
  const topBarRef = useRef<HTMLDivElement>(null);

  const onResize = useCallback(() => {
    setPageWidth(topBarRef.current ? topBarRef.current.offsetWidth * 0.8 : window.innerWidth * 0.9);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setTotalPages(numPages);
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
    window.addEventListener('resize', onResize);
    // Initial calculation
    onResize();
    document.addEventListener('selectstart', onSelectStart);
    document.addEventListener('mouseup', onSelectEnd);

    return () => {
      document.removeEventListener('selectstart', onSelectStart);
      document.removeEventListener('mouseup', onSelectEnd);
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  useEffect(() => {
    const trackPageInterval = setInterval(() => {
      PdfViewerOperations.trackVisiblePage(document, setPageNumber);
    }, 100);

    return () => {
      clearInterval(trackPageInterval);
    };
  }, []);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-start relative">
      {/* Top Bar */}
      <div ref={topBarRef} className="bg-background w-full py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-lg font-semibold">Preview</h1>
        <Chip className="absolute left-1/2 transform -translate-x-1/2 dark:bg-secondary bg-surfaceGrey" size="md">
          <p className="text-sm text-black">
            {pageNumber} / {totalPages}
          </p>
        </Chip>
        <div className="flex items-center space-x-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light" size="sm">
                <DocumentDownload size={24} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              color="secondary"
              disabledKeys={PdfViewerOperations.getDisabledKeys(onDownloadPdf, onDownloadJson, onDownloadCsv)}
            >
              <DropdownItem key="pdf" onClick={onDownloadPdf}>
                PDF
              </DropdownItem>
              <DropdownItem key="json" onClick={onDownloadJson}>
                JSON
              </DropdownItem>
              <DropdownItem key="csv" onClick={onDownloadCsv}>
                CSV
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {onClose && (
            <Button isIconOnly variant="light" size="sm">
              <Minus size={24} onClick={onClose} />
            </Button>
          )}
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="w-full h-full bg-background flex-grow flex justify-center items-center pb-10 z-0">
        <div className="max-w-3xl">
          {file && (
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex-col items-center mx-auto"
              loading=""
            >
              {Array.from(new Array(totalPages), (_, index) => (
                <Page
                  loading=""
                  canvasBackground="transparent"
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={pageWidth}
                />
              ))}
            </Document>
          )}
        </div>
      </div>

      {/* Tooltip */}
      {onTooltipClick && tooltipPosition && selectionText && (
        <div className="absolute z-20 p-2 rounded-lg" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
          <Tooltip
            color="primary"
            showArrow
            isOpen
            content={
              <Button size="sm" color="primary" onClick={() => onTooltipClick?.(selectionText)}>
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

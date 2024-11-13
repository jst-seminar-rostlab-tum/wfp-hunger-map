'use client';

import { PdfViewer } from '@/components/Pdf/PdfViewer';

export default function Report() {
  return (
    <div>
      <PdfViewer
        file="/report.pdf"
        onTooltipClick={() => {}}
        onDownloadPdf={() => {}}
        onDownloadJson={() => {}}
        onDownloadCsv={() => {}}
      />
    </div>
  );
}

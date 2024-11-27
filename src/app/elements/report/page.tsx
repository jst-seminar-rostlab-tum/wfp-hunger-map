import { PdfViewer } from '@/components/Pdf/PdfViewer';

export default function Report() {
  return (
    <div>
      <PdfViewer file="/report.pdf" />
    </div>
  );
}

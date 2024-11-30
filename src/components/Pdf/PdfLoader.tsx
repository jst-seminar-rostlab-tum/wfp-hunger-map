'use client';

import dynamic from 'next/dynamic';

import { PdfViewerProps } from '@/domain/props/PdfViewerProps';

const LazyPdfViewer = dynamic(() => import('@/components/Pdf/PdfViewer'), {
  ssr: false,
});

export default function PdfLoader(props: PdfViewerProps) {
  return <LazyPdfViewer {...props} />;
}

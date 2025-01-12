'use client';

import dynamic from 'next/dynamic';

import { PdfViewerProps } from '@/domain/props/PdfViewerProps';

const LazyPdfViewer = dynamic(() => import('@/components/Pdf/PdfViewer'), {
  ssr: false,
});

/**
 * The `PdfLoader` component is a lightweight wrapper that dynamically loads the `PdfViewer` component without server-side rendering (SSR).
 * This implementation prevents compatibility issues between `react-pdf` and Next.js.
 *
 * @param {PdfViewerProps} props The properties to pass to the `PdfViewer` component.
 * @returns {JSX.Element} The dynamically loaded `PdfViewer` component.
 */
export default function PdfLoader(props: PdfViewerProps): JSX.Element {
  return <LazyPdfViewer {...props} />;
}

'use client';

import { pdfjs } from 'react-pdf';

import { SNACKBAR_SHORT_DURATION } from '@/domain/entities/snackbar/Snackbar';
import { SnackbarPosition, SnackbarStatus } from '@/domain/enums/Snackbar';
import { SnackbarProps } from '@/domain/props/SnackbarProps';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

/**
 * Extracts text from a PDF document located at the specified URL.
 * This function retrieves the text content from each page of the PDF
 * and concatenates it into a single string, which is then returned.
 *
 * @param url - The URL of the PDF document to extract text from.
 * @returns A promise that resolves to the extracted text or undefined if an error occurs.
 */
export const extractPdfText = async (
  url: string,
  showSnackBar?: (snackbarProps: SnackbarProps) => void
): Promise<string> => {
  try {
    const pdf = await pdfjs.getDocument(url).promise;
    let fullText = '';
    const pagePromises: Promise<string>[] = [];

    for (let i = 1; i <= pdf.numPages; i += 1) {
      pagePromises.push(
        pdf.getPage(i).then(async (page) => {
          const textContent = await page.getTextContent();
          return textContent.items
            .map((item) => {
              if ('str' in item) {
                return item.str;
              }
              return '';
            })
            .join(' ');
        })
      );
    }

    const pageTexts = await Promise.all(pagePromises);
    fullText = pageTexts.join('\n');

    return fullText.trim();
  } catch (error) {
    if (showSnackBar) {
      showSnackBar({
        message: 'Error extracting information from PDF',
        status: SnackbarStatus.Error,
        position: SnackbarPosition.BottomRight,
        duration: SNACKBAR_SHORT_DURATION,
      });
    }
    throw new Error(`Error extracting text from PDF: ${error}`);
  }
};

'use client';

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

export const extractClientSidePdfText = async (url: string): Promise<string> => {
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
    console.error('Error extracting text from PDF:', error);
    return 'error during extraction';
  }
};

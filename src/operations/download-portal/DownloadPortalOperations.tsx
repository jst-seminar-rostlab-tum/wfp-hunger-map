import { CalendarDate } from '@internationalized/date';
import { DocumentDownload, SearchNormal1 } from 'iconsax-react';
import { Bot } from 'lucide-react';
import pdfToText from 'react-pdftotext';

import { CountryCodesData } from '@/domain/entities/country/CountryCodesData';
import { ICountryData } from '@/domain/entities/download/Country';
import { CustomTableColumns } from '@/domain/props/CustomTableProps';

export class DownloadPortalOperations {
  static getColumns(): CustomTableColumns {
    return [
      { columnId: 'keyColumn', label: 'Country', alignLeft: true },
      { columnId: 'preview', label: 'Preview' },
      { columnId: 'download', label: 'Download' },
      { columnId: 'chat', label: 'Chat' },
    ] as CustomTableColumns;
  }

  static formatTableData(
    data: CountryCodesData[],
    setSelectedCountry: (countryData: CountryCodesData) => void,
    chatWithReport: (country: string, report: string) => Promise<void>,
    setPdfFile: (file: Blob | null) => void,
    setError: (error: string | null) => void,
    toggleModal: () => void
  ) {
    return data.map((item) => ({
      keyColumn: item.country.name,
      preview: (
        <div className="flex justify-center items-center">
          <SearchNormal1
            size={20}
            onClick={() =>
              DownloadPortalOperations.onSelectCountry(item, setSelectedCountry, setPdfFile, setError, toggleModal)
            }
            className="cursor-pointer"
          />
        </div>
      ),
      download: (
        <div className="flex justify-center items-center">
          <DocumentDownload
            size={20}
            onClick={() => DownloadPortalOperations.downloadPdf(item)}
            className="cursor-pointer"
          />
        </div>
      ),
      chat: (
        <div className="flex justify-center items-center">
          <Bot
            size={20}
            onClick={() => chatWithReport(item.country.name, item.url.summary)}
            className="cursor-pointer"
          />
        </div>
      ),
    }));
  }

  static downloadJsonFile(data: ICountryData[], country: string): void {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = `${country}_food_security_data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static calculateDateRange(start: CalendarDate, end: CalendarDate): number {
    const startDate = new Date(start.toString());
    const endDate = new Date(end.toString());
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  static downloadPdf(country: CountryCodesData) {
    const link = document.createElement('a');
    link.href = country.url.summary;
    link.download = `${country.country.name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static async fetchPdfAsByteStream(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
    }
    return response.arrayBuffer();
  }

  static async handlePreview(
    url: string,
    setPdfFile: (file: Blob | null) => void,
    setError: (error: string | null) => void
  ): Promise<void> {
    setPdfFile(null);
    setError(null);

    try {
      const arrayBuffer = await DownloadPortalOperations.fetchPdfAsByteStream(url);
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      setPdfFile(blob);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while fetching the PDF.');
      }
    }
  }

  static onSelectCountry(
    country: CountryCodesData,
    setSelectedCountry: (countryData: CountryCodesData) => void,
    setPdfFile: (file: Blob | null) => void,
    setError: (error: string | null) => void,
    toggleModal: () => void
  ): void {
    setSelectedCountry(country);
    DownloadPortalOperations.handlePreview(country.url.summary, setPdfFile, setError);
    toggleModal();
  }

  static async extractTextFromPdf(url: string): Promise<string> {
    let text = '';

    try {
      const file = await fetch(url).then((res) => res.blob());
      text = await pdfToText(file);
    } catch {
      text = '';
    }
    return text;
  }
}

import { DocumentDownload, SearchNormal1 } from 'iconsax-react';
import { Bot } from 'lucide-react';

import { CountryCodesData } from '@/domain/entities/country/CountryCodesData';
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
          <Bot size={20} className="cursor-pointer" />
        </div>
      ),
    }));
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
}

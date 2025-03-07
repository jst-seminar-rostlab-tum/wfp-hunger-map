import { CalendarDate } from '@internationalized/date';
import { DocumentDownload, SearchNormal1 } from 'iconsax-react';
import { Bot } from 'lucide-react';

import { IReportContext } from '@/domain/entities/chatbot/Chatbot';
import { CountryCodesData } from '@/domain/entities/country/CountryCodesData';
import { ICountryData } from '@/domain/entities/download/Country';
import { SNACKBAR_SHORT_DURATION } from '@/domain/entities/snackbar/Snackbar';
import { YearInReview } from '@/domain/entities/YearInReview';
import { SnackbarPosition, SnackbarStatus } from '@/domain/enums/Snackbar';
import { CustomTableColumns } from '@/domain/props/CustomTableProps';
import { SnackbarProps } from '@/domain/props/SnackbarProps';

export class DownloadPortalOperations {
  static getColumns(): CustomTableColumns {
    return [
      { columnId: 'keyColumn', label: 'Country', alignLeft: true },
      { columnId: 'preview', label: 'Preview' },
      { columnId: 'download', label: 'Download' },
      { columnId: 'chat', label: 'Chat' },
    ] as CustomTableColumns;
  }

  static formatCountryTableData(
    data: CountryCodesData[],
    setSelectedCountry: (countryData: CountryCodesData) => void,
    initiateChatAboutReport: (reportContext: IReportContext) => Promise<void>,
    setPdfFile: (file: Blob | null) => void,
    setError: (error: string | null) => void,
    toggleModal: () => void,
    showSnackBar: (snackbarProps: SnackbarProps) => void
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
            onClick={() => DownloadPortalOperations.downloadCountryReport(item, showSnackBar)}
            className="cursor-pointer"
          />
        </div>
      ),
      chat: (
        <div className="flex justify-center items-center">
          <Bot
            size={20}
            onClick={() => initiateChatAboutReport({ type: 'country', value: item.country.name })}
            className="cursor-pointer"
          />
        </div>
      ),
    }));
  }

  static formatYearInReviewTableData(
    data: YearInReview[],
    setSelectedReport: (report: YearInReview) => void,
    initiateChatAboutReport: (reportContext: IReportContext) => Promise<void>,
    setPdfFile: (file: Blob | null) => void,
    setError: (error: string | null) => void,
    toggleModal: () => void,
    showSnackBar: (snackbarProps: SnackbarProps) => void
  ) {
    return data.map((item) => ({
      keyColumn: item.label,
      preview: (
        <div className="flex justify-center items-center">
          <SearchNormal1
            size={20}
            onClick={() => {
              setSelectedReport(item);
              DownloadPortalOperations.handlePreview(item.url, setPdfFile, setError);
              toggleModal();
            }}
            className="cursor-pointer"
          />
        </div>
      ),
      download: (
        <div className="flex justify-center items-center">
          <DocumentDownload
            size={20}
            onClick={() => DownloadPortalOperations.downloadYearInReviewReport(item, showSnackBar)}
            className="cursor-pointer"
          />
        </div>
      ),
      chat: (
        <div className="flex justify-center items-center">
          <Bot
            size={20}
            onClick={() => {
              const year = item.label.match(/\d{4}/)?.[0];
              if (year) {
                initiateChatAboutReport({ type: 'year_in_review', value: year });
              }
            }}
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

  static async downloadCountryReport(
    country: CountryCodesData,
    showSnackBar: (snackbarProps: SnackbarProps) => void
  ): Promise<void> {
    await this.downloadPdfFile(country.url.summary, `${country.country.name}.pdf`, showSnackBar);
  }

  static async downloadYearInReviewReport(
    yearInReview: YearInReview,
    showSnackBar: (snackbarProps: SnackbarProps) => void
  ): Promise<void> {
    await this.downloadPdfFile(yearInReview.url, `${yearInReview.label}.pdf`, showSnackBar);
  }

  private static async downloadPdfFile(
    fileUrl: string,
    fileName: string,
    showSnackBar?: (snackbarProps: SnackbarProps) => void
  ): Promise<void> {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Failed to download file');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      if (showSnackBar) {
        showSnackBar({
          message: 'Error downloading file',
          status: SnackbarStatus.Error,
          position: SnackbarPosition.BottomRight,
          duration: SNACKBAR_SHORT_DURATION,
        });
      }
    }
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

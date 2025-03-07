'use client';

import { useMemo, useState } from 'react';

import PdfPreview from '@/components/Pdf/PdfPreview';
import SearchBar from '@/components/Search/SearchBar';
import CustomTable from '@/components/Table/CustomTable';
import { useChatbot } from '@/domain/contexts/ChatbotContext';
import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { CountryCodesData } from '@/domain/entities/country/CountryCodesData';
import CountryReportsProps from '@/domain/props/CountryReportsProps';
import { PdfFile } from '@/domain/props/PdfViewerProps';
import { DownloadPortalOperations } from '@/operations/download-portal/DownloadPortalOperations';

export default function CountryReports({ countryCodesData }: CountryReportsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState<PdfFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryCodesData | null>(null);
  const { initiateChatAboutReport } = useChatbot();
  const { showSnackBar } = useSnackbar();

  const toggleModal = () => setModalOpen((prev) => !prev);

  const filteredData = useMemo(() => {
    return countryCodesData?.filter((item) => item.country.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [countryCodesData, searchTerm]);

  return (
    <div>
      <div className="mb-3">
        <SearchBar value={searchTerm} onValueChange={setSearchTerm} placeholder="Search by country..." />
      </div>
      <CustomTable
        columns={DownloadPortalOperations.getColumns()}
        data={DownloadPortalOperations.formatCountryTableData(
          filteredData,
          setSelectedCountry,
          initiateChatAboutReport,
          setPdfFile,
          setError,
          toggleModal,
          showSnackBar
        )}
        ariaLabel="Country Reports"
        minTableWidth={300}
      />
      <PdfPreview
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        pdfFile={pdfFile}
        error={error}
        onDownloadPdf={() => {
          if (selectedCountry) {
            DownloadPortalOperations.downloadCountryReport(selectedCountry, showSnackBar);
          }
        }}
        onAskAIButtonClick={initiateChatAboutReport}
        reportContext={{ type: 'country', value: selectedCountry?.country.name ?? '' }}
      />
    </div>
  );
}

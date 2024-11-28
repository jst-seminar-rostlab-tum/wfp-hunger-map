'use client';

import { useMemo, useState } from 'react';

import { PdfViewer } from '@/components/Pdf/PdfViewer';
import PopupModal from '@/components/PopupModal/PopupModal';
import SearchBar from '@/components/Search/SearchBar';
import CustomTable from '@/components/Table/CustomTable';
import { CountryCodesData } from '@/domain/entities/country/CountryCodesData';
import { useCountryCodesQuery } from '@/domain/hooks/globalHooks';
import { PdfFile } from '@/domain/props/PdfViewerProps';
import { DownloadPortalOperations } from '@/operations/download-portal/DownloadPortalOperations';

export default function DownloadPortal() {
  const { isLoading, data } = useCountryCodesQuery();
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pdfFile, setPdfFile] = useState<PdfFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryCodesData | null>(null);
  const toggleModal = () => setModalOpen((prev) => !prev);
  const filteredData = useMemo(() => {
    return data?.filter((item) => item.country.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [data, searchTerm]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Download Portal</h1>
      <div className="my-3">
        <SearchBar value={searchTerm} onValueChange={setSearchTerm} placeholder="Search by country..." />
      </div>
      {filteredData && (
        <CustomTable
          columns={DownloadPortalOperations.getColumns()}
          data={DownloadPortalOperations.formatTableData(
            filteredData,
            setSelectedCountry,
            setPdfFile,
            setError,
            toggleModal
          )}
        />
      )}
      <PopupModal isModalOpen={isModalOpen} toggleModal={toggleModal} modalSize="5xl" scrollBehavior="outside">
        {error ? (
          <div className="bg-background text-danger border rounded-md p-4 text-center">{error}</div>
        ) : (
          <PdfViewer
            file={pdfFile}
            onDownloadPdf={() => {
              if (selectedCountry) {
                DownloadPortalOperations.downloadPdf(selectedCountry);
              }
            }}
          />
        )}
      </PopupModal>
    </div>
  );
}

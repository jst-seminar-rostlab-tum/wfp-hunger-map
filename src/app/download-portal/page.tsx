'use client';

import { useMemo, useState } from 'react';

import CustomAccordion from '@/components/Accordions/Accordion';
import PdfPreview from '@/components/Pdf/PdfPreview';
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

  return (
    <div>
      <h1>Download Portal</h1>
      <div>
        <CustomAccordion
          loading={isLoading}
          items={[
            {
              title: 'Country Reports',
              content: (
                <div>
                  <div className="mb-3">
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
                      ariaLabel="Country Reports"
                    />
                  )}
                  <PdfPreview
                    isModalOpen={isModalOpen}
                    toggleModal={toggleModal}
                    pdfFile={pdfFile}
                    error={error}
                    onDownloadPdf={() => {
                      if (selectedCountry) {
                        DownloadPortalOperations.downloadPdf(selectedCountry);
                      }
                    }}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

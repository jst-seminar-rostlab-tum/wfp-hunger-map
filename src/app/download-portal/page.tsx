'use client';

import { useEffect, useMemo, useState } from 'react';

import CustomAccordion from '@/components/Accordions/Accordion';
import DownloadCountryAccordion from '@/components/DownloadCountryAccordions/DownloadCountryAccordions';
import PdfLoader from '@/components/Pdf/PdfLoader';
import PopupModal from '@/components/PopupModal/PopupModal';
import SearchBar from '@/components/Search/SearchBar';
import CustomTable from '@/components/Table/CustomTable';
import { CountryCodesData } from '@/domain/entities/country/CountryCodesData';
import { ICountry, TITLE } from '@/domain/entities/download/Country';
import { useCountryCodesQuery, useMapDataForCountries } from '@/domain/hooks/globalHooks';
import { PdfFile } from '@/domain/props/PdfViewerProps';
import { DownloadPortalOperations } from '@/operations/download-portal/DownloadPortalOperations';

export default function DownloadPortal() {
  const { isLoading, data } = useCountryCodesQuery();
  const { isLoading: isMapDataLoading, data: downloadCountryList } = useMapDataForCountries();
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pdfFile, setPdfFile] = useState<PdfFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryCodesData | null>(null);
  const toggleModal = () => setModalOpen((prev) => !prev);
  const filteredData = useMemo(() => {
    return data?.filter((item) => item.country.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [data, searchTerm]);
  const [countries, setCountries] = useState<ICountry[] | undefined>(undefined);
  const [isCountryListReady, setIsCountryListReady] = useState(false);

  useEffect(() => {
    // since the country list too big and is not ready in the beginning
    // we need to wait for the map data to be ready
    setIsCountryListReady(downloadCountryList !== undefined);
    setCountries(
      downloadCountryList?.features.map((feature) => ({
        id: feature.properties.adm0_id,
        name: feature.properties.adm0_name,
        iso3: feature.properties.iso3,
        iso2: feature.properties.STSCOD,
      })) as ICountry[]
    );
  }, [downloadCountryList, isMapDataLoading]);

  return (
    <div>
      <h1>Download Portal</h1>
      <div>
        <CustomAccordion
          loading={isLoading || isMapDataLoading || !isCountryListReady}
          items={[
            {
              title: 'Pdf Reports',
              content: (
                <div>
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
                      ariaLabel="Pdf Reports"
                    />
                  )}
                  <PopupModal
                    isModalOpen={isModalOpen}
                    toggleModal={toggleModal}
                    modalSize="5xl"
                    scrollBehavior="outside"
                  >
                    {error ? (
                      <div className="bg-background text-danger border rounded-md p-4 text-center">{error}</div>
                    ) : (
                      <PdfLoader
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
              ),
            },
            {
              title: TITLE,
              content: <DownloadCountryAccordion countries={countries} />,
            },
          ]}
        />
      </div>
    </div>
  );
}

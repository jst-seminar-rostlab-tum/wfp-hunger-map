'use client';

import { Input } from '@nextui-org/input';
import { SearchNormal1 } from 'iconsax-react';
import { useState } from 'react';

import PopupModal from '@/components/PopupModal/PopupModal';
import CustomTable from '@/components/Table/CustomTable';
import { CountryCodesData } from '@/domain/entities/country/CountryCodesData';
import { useCountryCodesQuery } from '@/domain/hooks/globalHooks';
import { DownloadPortalOperations } from '@/operations/download-portal/DownloadPortalOperations';

export default function DownloadPortal() {
  const { isLoading, data } = useCountryCodesQuery();
  const [selectedCountry, setSelectedCountry] = useState<CountryCodesData | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleModal = () => setModalOpen((prev) => !prev);

  const filteredData = data?.filter((item) => item.country.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Download Portal</h1>
      <div className="my-3">
        <Input
          isClearable
          placeholder="Search by country name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          radius="lg"
          startContent={<SearchNormal1 className="text-gray-500 dark:text-gray-300 text-lg flex-shrink-0" />}
          classNames={{
            inputWrapper: [
              'bg-transparent',
              'shadow-xl',
              'border',
              'border-gray-300',
              'dark:border-gray-600',
              'rounded-lg',
            ],
            input: 'bg-transparent text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300',
          }}
        />
      </div>
      {filteredData && (
        <CustomTable
          columns={DownloadPortalOperations.getColumns()}
          data={DownloadPortalOperations.formatTableData(filteredData, setSelectedCountry, toggleModal)}
          ariaLabel="Download Portal Table"
        />
      )}
      {selectedCountry && (
        <PopupModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          modalTitle={`${selectedCountry.country.name} - Preview`}
          modalSize="5xl"
          modalHeight="h-auto"
        >
          <div>
            <p>Country: {selectedCountry.country.name}</p>
            <p>ISO3: {selectedCountry.country.iso3}</p>
            <a href={selectedCountry.url.summary} target="_blank" rel="noopener noreferrer">
              Open Summary
            </a>
          </div>
        </PopupModal>
      )}
    </div>
  );
}

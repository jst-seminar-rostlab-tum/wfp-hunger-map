'use client';

import { useEffect, useState } from 'react';
import PopupModal from '@/components/PopupModal/PopupModal';
import DataTable from '@/components/DataTable/DataTable';
import './style.css';
import container from '@/container';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default function HungerAlert() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countriesWithHighHunger, setCountriesWithHighHunger] = useState<
    { rank: number; country: string; fcs: string }[]
  >([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchCountriesWithHighHunger = async () => {
      const countryData = await container
        .resolve<GlobalDataRepository>('GlobalDataRepository')
        .getMapDataForCountries();

      setCountriesWithHighHunger(
        countryData.features
          .filter(({ properties: { fcs } }) => typeof fcs === 'number' && fcs >= 0.4)
          .sort((a, b) => (b.properties.fcs as number) - (a.properties.fcs as number))
          .map(({ properties: { adm0_name, fcs } }, index) => ({
            rank: index + 1,
            country: adm0_name,
            fcs: `${Math.floor((fcs as number) * 100)}%`,
          }))
      );
    };

    fetchCountriesWithHighHunger();
  }, []);

  const columns = [
    { label: 'Rank', key: 'rank' },
    { label: 'Country', key: 'country' },
    { label: 'FCS', key: 'fcs' },
  ];

  return (
    <div className="absolute bottom-20 left-20 z-10 cursor-pointer">
      <div className="pulse flex flex-col items-center justify-center p-5" onClick={toggleModal}>
        <p className="text-4xl font-bold mb-2">{countriesWithHighHunger?.length}</p>
        <p className="text-center font-medium text-sm px-4">Number of Countries with Very High Levels of Hunger</p>
      </div>

      <PopupModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        modalTitle={'Countries with Very High Levels of Hunger'}
        modalSize={'3xl'}
      >
        {<DataTable rows={countriesWithHighHunger} columns={columns} />}
      </PopupModal>
    </div>
  );
}

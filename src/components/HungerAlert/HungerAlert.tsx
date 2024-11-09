'use client';

import './style.css';

import { useEffect, useState } from 'react';

import DataTable from '@/components/DataTable/DataTable';
import PopupModal from '@/components/PopupModal/PopupModal';
import container from '@/container';
import HungerLevel from '@/domain/entities/HungerLevel';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default function HungerAlert() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countriesWithHighHunger, setCountriesWithHighHunger] = useState<HungerLevel[]>([]);

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
          .map(({ properties: { adm0_name: countryName, fcs } }, index) => ({
            rank: index + 1,
            country: countryName,
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
      <button className="pulse flex flex-col items-center justify-center p-5" onClick={toggleModal} type="button">
        <p className="text-4xl font-bold mb-2">{countriesWithHighHunger?.length}</p>
        <p className="text-center font-medium text-sm px-4">Number of Countries with Very High Levels of Hunger</p>
      </button>

      <PopupModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        modalTitle="Countries with Very High Levels of Hunger"
        modalSize="3xl"
      >
        <DataTable rows={countriesWithHighHunger} columns={columns} />
      </PopupModal>
    </div>
  );
}

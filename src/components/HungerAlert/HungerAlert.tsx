'use client';

import './style.css';

import { useEffect, useState } from 'react';

import DataTable from '@/components/DataTable/DataTable';
import PopupModal from '@/components/PopupModal/PopupModal';
import HungerLevel from '@/domain/entities/HungerLevel';
import HungerAlertProps from '@/domain/props/HungerAlertProps';

import HungerAlertOperations from '../../operations/hungerAlert/HungerAlertOperations';

export default function HungerAlert({ countryMapData }: HungerAlertProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countriesWithHighHunger, setCountriesWithHighHunger] = useState<HungerLevel[]>([]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const fetchCountriesWithHighHunger = async () => {
      const highHungerCountries = await HungerAlertOperations.getHungerAlertData(countryMapData);
      setCountriesWithHighHunger(highHungerCountries);
    };

    fetchCountriesWithHighHunger();
  }, [countryMapData]);

  const pulseClasses =
    'pulse w-48 h-48 rounded-full flex flex-col items-center justify-center text-center bg-white dark:bg-content2 relative p-5';

  return (
    <div className="absolute bottom-20 left-20 z-10 cursor-pointer">
      <button className={pulseClasses} onClick={toggleModal} type="button">
        <p className="text-4xl font-bold mb-2">{countriesWithHighHunger.length}</p>
        <p className="text-center font-medium text-sm px-4">Number of Countries with Very High Levels of Hunger</p>
      </button>

      <PopupModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        modalTitle="Countries with Very High Levels of Hunger"
        modalSize="3xl"
        modalHeight="min-h-[75%]"
      >
        <DataTable rows={countriesWithHighHunger} columns={HungerAlertOperations.getHungerAlertModalColumns()} />
      </PopupModal>
    </div>
  );
}

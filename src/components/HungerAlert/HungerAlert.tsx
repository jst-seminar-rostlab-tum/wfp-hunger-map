'use client';

import './style.css';

import { useMemo, useState } from 'react';

import DataTable from '@/components/DataTable/DataTable';
import PopupModal from '@/components/PopupModal/PopupModal';
import HungerLevel from '@/domain/entities/HungerLevel';
import HungerAlertProps from '@/domain/props/HungerAlertProps';

import HungerAlertOperations from '../../operations/hungerAlert/HungerAlertOperations.ts';

export default function HungerAlert({ countryMapData }: HungerAlertProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);

  const countriesWithHighHunger: HungerLevel[] = useMemo(
    () => HungerAlertOperations.getHungerAlertData(countryMapData),
    [countryMapData]
  );

  return (
    <div className="absolute bottom-20 left-20 z-10 cursor-pointer">
      <button className={HungerAlertOperations.getPulseClasses()} onClick={toggleModal} type="button">
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

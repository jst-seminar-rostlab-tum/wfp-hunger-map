'use client';

import './style.css';

import { useMemo, useState } from 'react';

import PopupModal from '@/components/PopupModal/PopupModal';
import DataTable from '@/components/Table/DataTable';
import { SimpleTableData } from '@/domain/props/GroupedTableProps';
import HungerAlertProps from '@/domain/props/HungerAlertProps';

import HungerAlertOperations from '../../operations/hungerAlert/HungerAlertOperations.ts';

export default function HungerAlert({ countryMapData }: HungerAlertProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);

  const countriesWithHighHunger: SimpleTableData = useMemo(
    () => HungerAlertOperations.getHungerAlertData(countryMapData),
    [countryMapData]
  );

  return (
    <div className="absolute bottom-0 left-0 z-10 cursor-pointer" style={{ bottom: '18rem', left: '1.86rem' }}>
      <button
        className={HungerAlertOperations.getPulseClasses()}
        onClick={toggleModal}
        style={{ width: '4rem', height: '4rem' }}
        type="button"
      >
        <p className="text-4xl">{countriesWithHighHunger.length}</p>
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

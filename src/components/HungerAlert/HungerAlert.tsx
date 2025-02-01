'use client';

import './style.css';

import { Pagination } from '@nextui-org/react';
import React, { useMemo, useState } from 'react';

import PopupModal from '@/components/PopupModal/PopupModal';
import CustomTable from '@/components/Table/CustomTable';
import { SimpleTableData } from '@/domain/props/CustomTableProps';
import HungerAlertProps from '@/domain/props/HungerAlertProps';

import HungerAlertOperations from '../../operations/hungerAlert/HungerAlertOperations.ts';
import { Tooltip } from '../Tooltip/Tooltip';

export default function HungerAlert({ countryFcsData, countryMapData }: HungerAlertProps) {
  const ROWS_PER_PAGE = 10;

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);

  const countriesWithHighHunger: SimpleTableData = useMemo(
    () => HungerAlertOperations.getHungerAlertData(countryFcsData, countryMapData),
    [countryFcsData]
  );
  const displayedRows = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    return countriesWithHighHunger.slice(start, end);
  }, [page, countriesWithHighHunger]);

  const totalPages = Math.ceil(countriesWithHighHunger.length / ROWS_PER_PAGE);

  return (
    <div className="absolute top-[calc(50dvh+90px)] left-4 z-10 cursor-pointer">
      <Tooltip text="Number of countries with high levels of hunger">
        <button
          className={HungerAlertOperations.getPulseClasses()}
          onClick={toggleModal}
          style={{ width: '4rem', height: '4rem' }}
          type="button"
          aria-label={`View details about ${countriesWithHighHunger.length} countries experiencing highest levels of hunger`}
        >
          <p className="text-4xl">{countriesWithHighHunger.length}</p>
        </button>
      </Tooltip>
      <PopupModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        modalTitle="Countries with Very High Levels of Hunger"
        modalSize="xl"
      >
        <div className="flex-1 flex flex-col justify-between items-center">
          <CustomTable
            columns={HungerAlertOperations.getHungerAlertModalColumns()}
            data={displayedRows}
            className="mb-3 min-h-[26rem]"
            ariaLabel="Number of countries with high levels of hunger"
            minTableWidth={300}
          />
          <Pagination isCompact showControls page={page} total={totalPages} onChange={(newPage) => setPage(newPage)} />
        </div>
      </PopupModal>
    </div>
  );
}

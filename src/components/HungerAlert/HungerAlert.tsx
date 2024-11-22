'use client';

import './style.css';

import { Pagination } from '@nextui-org/react';
import React, { useMemo, useState } from 'react';

import PopupModal from '@/components/PopupModal/PopupModal';
import GroupedTable from '@/components/Table/GroupedTable';
import { SimpleTableData } from '@/domain/props/GroupedTableProps';
import HungerAlertProps from '@/domain/props/HungerAlertProps';
import formatSimpleTable from '@/operations/tables/formatSimpleTable';

import HungerAlertOperations from '../../operations/hungerAlert/HungerAlertOperations.ts';

export default function HungerAlert({ countryMapData }: HungerAlertProps) {
  const ROWS_PER_PAGE = 10;

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);

  const countriesWithHighHunger: SimpleTableData = useMemo(
    () => HungerAlertOperations.getHungerAlertData(countryMapData),
    [countryMapData]
  );
  const displayedRows = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    return countriesWithHighHunger.slice(start, end);
  }, [page, countriesWithHighHunger]);

  const totalPages = Math.ceil(countriesWithHighHunger.length / ROWS_PER_PAGE);

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
        modalSize="xl"
      >
        <div className="flex-1 flex flex-col justify-between items-center">
          <GroupedTable
            columns={HungerAlertOperations.getHungerAlertModalColumns()}
            data={formatSimpleTable(displayedRows)}
            className="mb-3 min-h-[28rem]"
          />
          <Pagination isCompact showControls page={page} total={totalPages} onChange={(newPage) => setPage(newPage)} />
        </div>
      </PopupModal>
    </div>
  );
}

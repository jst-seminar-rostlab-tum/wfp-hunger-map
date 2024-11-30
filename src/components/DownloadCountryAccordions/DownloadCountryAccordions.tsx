import { parseDate } from '@internationalized/date';
import { Autocomplete, AutocompleteItem, DateRangePicker } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

import container from '@/container';
import { DOWNLOAD_DATA } from '@/domain/constant/subscribe/Subscribe';
import {
  COUNTRY_ERROR_MSG,
  DATE_RANGE_ERROR_MSG,
  DATE_RANGE_TOO_LONG_ERROR_MSG,
  DESCRIPTION,
} from '@/domain/entities/download/Country';
import { SubmitStatus } from '@/domain/enums/SubscribeTopic';
import DownloadCountryAccordionProps from '@/domain/props/DownloadCountryAccordionProps';
import DownloadRepository from '@/domain/repositories/DownloadRepository';
import { DownloadPortalOperations } from '@/operations/download-portal/DownloadPortalOperations';

import { SubmitButton } from '../SubmitButton/SubmitButton';

export default function DownloadCountryAccordion({ countries }: DownloadCountryAccordionProps) {
  const download = container.resolve<DownloadRepository>('DownloadRepository');
  const [country, setCountry] = useState('');
  const [isCountryInvalid, setIsCountryInvalid] = useState(false);
  const [isDateRangeInvalid, setIsDateRangeInvalid] = useState(false);
  const [isDateRangeTooLong, setIsDateRangeTooLong] = useState(false);
  const [value, setValue] = useState({
    start: parseDate(new Date().toISOString().split('T')[0]),
    end: parseDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
  }); // Default to 7 days

  const [downloadStatus, setDownloadStatus] = useState<SubmitStatus>(SubmitStatus.Idle);
  const [isWaitingDownloadResponse, setIsWaitingDownloadResponse] = useState(false);

  const handleCountrySelection = (key: unknown): void => {
    const selectedCountry = countries?.find((item) => item.id === parseInt(key as string, 10));
    if (selectedCountry) {
      setCountry(selectedCountry.iso3);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const countryInvalid = !country;
    const dateRangeInvalid = !value;
    const { start, end } = value || {};
    const diffDays = start && end ? DownloadPortalOperations.calculateDateRange(start, end) : 0;
    const dateRangeTooLong = diffDays > 500;

    setIsCountryInvalid(countryInvalid);
    setIsDateRangeInvalid(dateRangeInvalid);
    setIsDateRangeTooLong(dateRangeTooLong);
    if (!countryInvalid && !dateRangeInvalid && !dateRangeTooLong && !isWaitingDownloadResponse) {
      setDownloadStatus(SubmitStatus.Loading);
      setIsWaitingDownloadResponse(true);
      try {
        await download.getDownLoadCountryData(country, start, end).then((res) => {
          // only download if there is data
          if (res && res.length > 0) {
            setDownloadStatus(SubmitStatus.Success);
            setIsWaitingDownloadResponse(false);
            DownloadPortalOperations.downloadJsonFile(res, country);
          } else {
            setDownloadStatus(SubmitStatus.Error);
            setIsWaitingDownloadResponse(false);
          }
        });
      } catch (err) {
        throw new Error(err instanceof Error ? err.message : String(err));
      }
    }
  };

  useEffect(() => {
    console.log('countries', countries);
  }, [countries]);

  return (
    <div className="flex flex-col gap-4 justify-center flex-wrap pb-8">
      <h6>{DESCRIPTION}</h6>

      <form className="flex flex-col md:flex-row space-y-2 md:space-y-0" onSubmit={handleSubmit}>
        <Autocomplete
          size="md"
          variant="bordered"
          isInvalid={isCountryInvalid}
          errorMessage={COUNTRY_ERROR_MSG}
          isRequired
          label="Country"
          placeholder="Select a country"
          className="flex-1 mr-4"
          defaultItems={countries}
          onSelectionChange={(key) => handleCountrySelection(key)}
        >
          {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
        </Autocomplete>

        <DateRangePicker
          size="md"
          variant="bordered"
          isInvalid={isDateRangeInvalid}
          errorMessage={isDateRangeTooLong ? DATE_RANGE_TOO_LONG_ERROR_MSG : DATE_RANGE_ERROR_MSG}
          isRequired
          label="Select date Range"
          className="flex-1 mr-4"
          visibleMonths={2}
          value={value}
          onChange={(selectDateRangeEvent) => setValue(selectDateRangeEvent)}
        />

        <SubmitButton
          label={DOWNLOAD_DATA}
          submitStatus={downloadStatus}
          className="h-14 bg-subscribeText dark:bg-subscribeText text-white dark:text-black shadow-lg border-gray-200"
        />
      </form>
    </div>
  );
}

import { parseDate } from '@internationalized/date';
import { Autocomplete, AutocompleteItem, Button, DateRangePicker } from '@nextui-org/react';
import React, { FormEvent, useState } from 'react';

import CustomAccordion from '@/components/Accordions/Accordion';
import container from '@/container';
import {
  COUNTRY_ERROR_MSG,
  DATE_RANGE_ERROR_MSG,
  DATE_RANGE_TOO_LONG_ERROR_MSG,
  DESCRIPTION,
  MOCK_COUNTRIES,
  TITLE,
} from '@/domain/entities/download/Country';
import DownloadRepository from '@/domain/repositories/DownloadRepository';
import { DownloadPortalOperations } from '@/operations/download-portal/DownloadPortalOperations';

export default function DownloadCountryAccordion() {
  const download = container.resolve<DownloadRepository>('DownloadRepository');
  const [country, setCountry] = useState('');
  const [isCountryInvalid, setIsCountryInvalid] = useState(false);
  const [isDateRangeInvalid, setIsDateRangeInvalid] = useState(false);
  const [isDateRangeTooLong, setIsDateRangeTooLong] = useState(false);
  const [value, setValue] = useState({
    start: parseDate(new Date().toISOString().split('T')[0]),
    end: parseDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
  }); // Default to 7 days
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('>>> country', country, value);
    if (!country || !value) {
      setIsCountryInvalid(!country);
      setIsDateRangeInvalid(!value);
    }

    const { start, end } = value;
    const diffDays = DownloadPortalOperations.calculateDateRange(start, end);

    if (diffDays > 500) {
      setIsDateRangeTooLong(true);
    }

    try {
      const data = await download.getDownLoadCountryData(country, start, end);

      DownloadPortalOperations.downloadJsonFile(data, country);
    } catch {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <CustomAccordion
        items={[
          {
            title: TITLE,
            content: (
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
                    defaultItems={MOCK_COUNTRIES.map((c) => ({ label: c, value: c }))}
                    onSelectionChange={(item) => setCountry(item as string)}
                  >
                    {(item) => <AutocompleteItem key={item.label}>{item.value}</AutocompleteItem>}
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
                    onChange={setValue}
                  />

                  <Button
                    className="h-14 border-gray-200 dark:border-white hover:bg-blue-100 dark:hover:bg-gray-600"
                    variant="bordered"
                    type="submit"
                    isLoading={isLoading}
                  >
                    {isLoading ? 'Fetching Data...' : 'Download Data'}
                  </Button>
                </form>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

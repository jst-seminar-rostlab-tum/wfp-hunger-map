import { parseDate } from '@internationalized/date';
import { Autocomplete, AutocompleteItem, Button, DateRangePicker } from '@nextui-org/react';
import React, { FormEvent, useState } from 'react';

import CustomAccordion from '@/components/Accordions/Accordion';
import { DownloadPortalOperations } from '@/operations/download-portal/DownloadPortalOperations';
import { DESCRIPTION, MOCK_COUNTRIES, TITLE } from '@/domain/entities/download/Country';

export default function DownloadCountryAccordion() {
  const [country, setCountry] = useState('');
  const [value, setValue] = useState({
    start: parseDate(new Date().toISOString().split('T')[0]),
    end: parseDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),
  }); // Default to 7 days
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!country || !value) {
      setIsLoading(false);
      return;
    }
    // const daysDiff = (endDate - startDate) / (1000 * 60 * 60 * 24);

    if (daysDiff > 500) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.hungermapdata.org/v1/foodsecurity/country/${country}/region?date_start=${startDate.toISOString().split('T')[0]}&date_end=${endDate.toISOString().split('T')[0]}`
      );
      const data = await response.json();

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
                    isRequired
                    label="Country"
                    placeholder="Select a country"
                    className="flex-1 mr-4"
                    defaultItems={MOCK_COUNTRIES.map((c) => ({ label: c, value: c }))}
                  >
                    {(item) => <AutocompleteItem key={item.label}>{item.value}</AutocompleteItem>}
                  </Autocomplete>

                  <DateRangePicker
                    size="md"
                    variant="bordered"
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

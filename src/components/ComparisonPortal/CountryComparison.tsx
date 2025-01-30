'use client';

import { Tab, Tabs } from '@nextui-org/react';
import { useState } from 'react';

import RegionComparisonAccordion from '@/components/ComparisonPortal/RegionComparisonAccordion';
import { useSelectedCountries, useSelectedRegions, useSelectedTab } from '@/domain/hooks/queryParamsHooks.ts';
import CountryPortalProps from '@/domain/props/CountryComparisonProps';

import { ShareFloatingActionButton } from '../Share/ShareFloatingActionButton';
import CountryComparisonAccordion from './CountryComparisonAccordion';
import CountrySelection from './CountrySelection';
import RegionSelection from './RegionSelection';

/**
 * The `CountryComparison` component is the parent component for the country and region comparison features.
 * It contains the state for the selected countries, regions as well as the current tab.
 * As far as needed, those are synchronized with the query parameters using dedicated hooks.
 *
 * @param {CountryPortalProps} props Props for the CountryComparison component
 * @param {CountryMapDataWrapper} props.countryMapData Country map data
 * @param {GlobalFcsData} props.globalFcsData National FCS Data of all countries
 * @returns {JSX.Element} The CountryComparison component
 */
export default function ComparisonPortal({ countryMapData, globalFcsData }: CountryPortalProps): JSX.Element {
  const [selectedCountries, setSelectedCountries] = useSelectedCountries(countryMapData);
  const [disabledCountryIds, setDisabledCountryIds] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useSelectedTab();
  const { selectedRegions, setSelectedRegions, selectedRegionComparisonCountry, setSelectedRegionComparisonCountry } =
    useSelectedRegions();

  return (
    <div className="flex w-full flex-col">
      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key as string)}
        size="md"
        variant="underlined"
        classNames={{
          base: 'justify-center px-1',
          cursor: 'w-full',
        }}
        fullWidth
      >
        <Tab key="country" title="Country Comparison">
          <CountrySelection
            countryMapData={countryMapData}
            globalFcsData={globalFcsData}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            disabledCountryIds={disabledCountryIds}
          />
          <CountryComparisonAccordion
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            setDisabledCountryIds={setDisabledCountryIds}
          />
        </Tab>
        <Tab key="region" title="Region Comparison">
          <RegionSelection
            countryMapData={countryMapData}
            globalFcsData={globalFcsData}
            selectedRegionComparisonCountry={selectedRegionComparisonCountry}
            setSelectedRegionComparisonCountry={setSelectedRegionComparisonCountry}
            selectedRegions={selectedRegions}
            setSelectedRegions={setSelectedRegions}
          />
          <RegionComparisonAccordion
            selectedRegionComparisonCountry={selectedRegionComparisonCountry}
            selectedRegions={selectedRegions}
          />
        </Tab>
      </Tabs>
      <ShareFloatingActionButton />
    </div>
  );
}

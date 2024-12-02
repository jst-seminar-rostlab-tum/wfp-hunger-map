import AccordionContainer from '@/components/Accordions/AccordionContainer';
import DownloadCountryAccordion from '@/components/DownloadCountryAccordions/DownloadCountryAccordions';
import CountryReports from '@/components/DownloadPortal/CountryReports';
import container from '@/container';
import { TITLE } from '@/domain/entities/download/Country';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';

export default async function DownloadPortal() {
  const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');
  const countryMapDataPromise = globalRepo.getMapDataForCountries();
  const countryCodesPromise = globalRepo.getCountryCodes();
  const [countryCodesData, countryMapData] = await Promise.all([countryCodesPromise, countryMapDataPromise]);

  const countries =
    countryMapData?.features.map((feature) => ({
      id: feature.properties.adm0_id,
      name: feature.properties.adm0_name,
      iso3: feature.properties.iso3,
      iso2: feature.properties.STSCOD,
    })) || [];

  return (
    <div>
      <h1>Download Portal</h1>
      <div>
        <AccordionContainer
          items={[
            {
              title: 'Country Reports',
              content: <CountryReports countryCodesData={countryCodesData} />,
            },
            {
              title: TITLE,
              content: <DownloadCountryAccordion countries={countries} />,
            },
          ]}
        />
      </div>
    </div>
  );
}

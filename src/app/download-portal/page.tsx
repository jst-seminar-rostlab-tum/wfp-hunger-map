import AccordionContainer from '@/components/Accordions/AccordionContainer';
import DownloadCountryAccordion from '@/components/DownloadCountryAccordions/DownloadCountryAccordions';
import CountryReports from '@/components/DownloadPortal/CountryReports';
import YearInReviewReports from '@/components/DownloadPortal/YearInReviewReports';
import container from '@/container';
import { GlobalDataRepository } from '@/domain/repositories/GlobalDataRepository';
import {
  COUNTRY_REPORTS_TITLE,
  EXPORT_COUNTRY_DATA_TITLE,
  YEAR_IN_REVIEW_REPORTS_TITLE,
} from '@/operations/download-portal/DownloadPortalConstants';

export default async function DownloadPortal() {
  const globalRepo = container.resolve<GlobalDataRepository>('GlobalDataRepository');
  const countryMapDataPromise = globalRepo.getMapDataForCountries();
  const countryCodesPromise = globalRepo.getCountryCodes();
  const yearInReviewsPromise = globalRepo.getYearInReviews();
  const [countryCodesData, countryMapData, yearInReviews] = await Promise.all([
    countryCodesPromise,
    countryMapDataPromise,
    yearInReviewsPromise,
  ]);

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
          multipleSelectionMode
          items={[
            {
              title: YEAR_IN_REVIEW_REPORTS_TITLE,
              content: <YearInReviewReports yearInReviewReports={yearInReviews} />,
            },
            {
              title: COUNTRY_REPORTS_TITLE,
              content: <CountryReports countryCodesData={countryCodesData} />,
            },
            {
              title: EXPORT_COUNTRY_DATA_TITLE,
              content: <DownloadCountryAccordion countries={countries} />,
            },
          ]}
        />
      </div>
    </div>
  );
}

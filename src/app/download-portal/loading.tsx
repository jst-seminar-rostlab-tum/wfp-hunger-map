import AccordionContainer from '@/components/Accordions/AccordionContainer';
import {
  COUNTRY_REPORTS_TITLE,
  EXPORT_COUNTRY_DATA_TITLE,
  YEAR_IN_REVIEW_REPORTS_TITLE,
} from '@/operations/download-portal/DownloadPortalConstants';

export default function Loading() {
  const loading = true;

  return (
    <div>
      <h1>Download Portal</h1>
      <AccordionContainer
        items={[
          {
            title: YEAR_IN_REVIEW_REPORTS_TITLE,
          },
          {
            title: COUNTRY_REPORTS_TITLE,
          },
          {
            title: EXPORT_COUNTRY_DATA_TITLE,
          },
        ]}
        loading={loading}
      />
    </div>
  );
}

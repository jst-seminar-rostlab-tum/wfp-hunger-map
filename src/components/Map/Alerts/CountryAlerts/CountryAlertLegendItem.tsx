import { countryAlertsColors, countryAlertsLabels } from '@/domain/constant/alerts/CountryAlertsConstants';
import { CountryAlertType } from '@/domain/enums/CountryAlertType';
import PointLegendRecord from '@/domain/props/PointLegendRecord';

export function CountryAlertLegendItem({ record }: { record: PointLegendRecord }) {
  return (
    <div className="flex gap-3 items-baseline" key={record.label}>
      <div>
        <div className={`w-3 h-3 bg-${countryAlertsColors[record.label as CountryAlertType]} rounded-full relative`}>
          <div
            className={`w-4 h-4 bg-${countryAlertsColors[record.label as CountryAlertType]} rounded-full animate-pulsingAlert absolute -inset-0.5`}
          />
        </div>
      </div>
      <span>{countryAlertsLabels[record.label as CountryAlertType]}</span>
    </div>
  );
}

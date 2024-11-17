import { HazardSeverity } from '@/domain/enums/HazardSeverity';
import PointLegendRecord from '@/domain/props/PointLegendRecord';
import HazardOperations from '@/operations/alerts/HazardOperations';

export function HazardLegendItem({ record }: { record: PointLegendRecord }) {
  const lowerCaseName = record.label.toLowerCase();
  return (
    <div key={record.label} className="flex gap-1 items-center">
      <img
        src={`https://static.hungermapdata.org/hungermap/img/pdc_marker_${lowerCaseName}.png`}
        alt={lowerCaseName}
        width={26}
        height={26}
      />
      <span className={`text-${HazardOperations.hazardSeverityColors[record.label as HazardSeverity]} text-lg`}>
        {record.label.charAt(0) + lowerCaseName.slice(1)}
      </span>
    </div>
  );
}

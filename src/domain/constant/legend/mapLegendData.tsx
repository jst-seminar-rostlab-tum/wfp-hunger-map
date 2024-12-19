import { DataSourcePopover } from '@/components/Legend/DataSourcePopover';
import { CountryAlertLegendItem } from '@/components/Map/Alerts/CountryAlerts/CountryAlertLegendItem';
import { HazardLegendItem } from '@/components/Map/Alerts/HazardLegendItem';
import { AlertType } from '@/domain/enums/AlertType.ts';
import { ConflictType } from '@/domain/enums/ConflictType';
import { CountryAlertType } from '@/domain/enums/CountryAlertType';
import { GlobalInsight } from '@/domain/enums/GlobalInsight.ts';
import { HazardSeverity } from '@/domain/enums/HazardSeverity';
import { IpcPhases } from '@/domain/enums/IpcPhases';
import { NutritionData } from '@/domain/enums/NutritionData';
import { GradientLegendContainerItem } from '@/domain/props/GradientLegendContainerItem';
import PointLegendContainerItem from '@/domain/props/PointLegendContainerItem';

import descriptions from '../dataSources/dataSourceDescriptions';

export function mapLegendData(
  selectedMapType: GlobalInsight,
  selectedAlert: AlertType | null,
  selectedCountryId: number | null
): (PointLegendContainerItem | GradientLegendContainerItem)[] {
  const legendData: (PointLegendContainerItem | GradientLegendContainerItem)[] = [];

  switch (selectedAlert) {
    case AlertType.CONFLICTS:
      legendData.push({
        title: 'Type of conflict',
        popoverInfo: <DataSourcePopover dataSourceKeys="conflicts" />,
        records: [
          { label: ConflictType.BATTLES, color: 'conflictBattle' },
          { label: ConflictType.CIVIL_VIOLENCE, color: 'conflictCivil' },
          { label: ConflictType.EXPLOSIONS, color: 'conflictExplosion' },
          { label: ConflictType.RIOTS, color: 'conflictRiot' },
          { label: ConflictType.PROTESTS, color: 'conflictProtest' },
          { label: ConflictType.STRATEGIC, color: 'conflictStrategic' },
        ],
      });
      break;
    case AlertType.HAZARDS:
      legendData.push({
        title: 'Severity of hazards',
        popoverInfo: <DataSourcePopover dataSourceKeys="hazards" />,
        records: [
          { label: HazardSeverity.WARNING, color: 'hazardWarning' },
          { label: HazardSeverity.WATCH, color: 'hazardWatch' },
          { label: HazardSeverity.ADVISORY, color: 'hazarAdvisory' },
          { label: HazardSeverity.INFORMATION, color: 'hazardInformation' },
          { label: HazardSeverity.TERMINATION, color: 'hazardTermination' },
        ],
        renderItem: HazardLegendItem,
      });
      break;
    case AlertType.COUNTRY_ALERTS:
      legendData.push({
        title: 'Country alerts',
        popoverInfo: (
          <div>
            <p>Alerts on a country level.</p>
          </div>
        ),
        records: [
          { label: CountryAlertType.FATALITY, color: 'fatalityAlert' },
          { label: CountryAlertType.CLIMATE_WET, color: 'climateWetAlert' },
          { label: CountryAlertType.CLIMATE_DRY, color: 'climateDryAlert' },
        ],
        renderItem: CountryAlertLegendItem,
      });
      break;
    default:
  }
  switch (selectedMapType) {
    case GlobalInsight.FOOD:
      legendData.push({
        title: descriptions.fcs.title,
        hasNotAnalyzedPoint: true,
        colorsData: [
          { color: 'fcsGradient1', title: 'Very Low', value: '0-5%' },
          { color: 'fcsGradient2', title: 'Low', value: '5-10%' },
          { color: 'fcsGradient3', title: 'Moderately Low', value: '10-20%' },
          { color: 'fcsGradient4', title: 'Moderately High', value: '20-30%' },
          { color: 'fcsGradient5', title: 'High', value: '30-40%' },
          { color: 'fcsGradient6', title: 'Very High', value: 'Above 40%' },
        ],
        startLabel: '0%',
        endLabel: 'above 40%',
        popoverInfo: <DataSourcePopover dataSourceKeys="fcs" />,
      });
      break;
    case GlobalInsight.RAINFALL:
      legendData.push({
        title: descriptions.rainfall.title,
        colorsData: [
          { color: 'vegetationGradient1', value: '<40%' },
          { color: 'vegetationGradient2', value: '40-60%' },
          { color: 'vegetationGradient3', value: '60-80%' },
          { color: 'vegetationGradient4', value: '80-90%' },
          { color: 'vegetationGradient5', value: '90-110%' },
          { color: 'rainfallGradient6', value: '110-120%' },
          { color: 'rainfallGradient7', value: '120-140%' },
          { color: 'rainfallGradient8', value: '140-180%' },
          { color: 'rainfallGradient9', value: '>180%' },
        ],
        startLabel: '<40%',
        endLabel: '>180%',
        popoverInfo: <DataSourcePopover dataSourceKeys="rainfall" />,
      });
      break;
    case GlobalInsight.VEGETATION:
      legendData.push({
        title: descriptions.vegetation.title,
        colorsData: [
          { color: 'vegetationGradient1', value: '<50%' },
          { color: 'vegetationGradient2', value: '50-70%' },
          { color: 'vegetationGradient3', value: '70-80%' },
          { color: 'vegetationGradient4', value: '80-90%' },
          { color: 'vegetationGradient5', value: '90-110%' },
          { color: 'vegetationGradient6', value: '110-120%' },
          { color: 'vegetationGradient7', value: '120-130%' },
          { color: 'vegetationGradient8', value: '130-150%' },
          { color: 'vegetationGradient9', value: '>150%' },
        ],
        startLabel: '<50%',
        endLabel: '>150%',
        popoverInfo: <DataSourcePopover dataSourceKeys="vegetation" />,
      });
      break;
    case GlobalInsight.IPC:
      if (!selectedCountryId) {
        legendData.push({
          title: 'Number of people in IPC/CH Phase 3 or above (millions)',
          hasNotAnalyzedPoint: true,
          colorsData: [
            { color: 'ipcGradient1', value: '0-0.099' },
            { color: 'ipcGradient2', value: '0.1-0.49' },
            { color: 'ipcGradient3', value: '0.5-0.99' },
            { color: 'ipcGradient4', value: '1.0-2.99' },
            { color: 'ipcGradient5', value: '3.0-4.99' },
            { color: 'ipcGradient6', value: '5.0-9.99' },
            { color: 'ipcGradient7', value: '>10' },
          ],
          startLabel: '0',
          endLabel: '>10',
          popoverInfo: <DataSourcePopover dataSourceKeys="ipcCh" />,
        });
      } else {
        legendData.push({
          title: 'Acute food insecurity phase classification',
          popoverInfo: <DataSourcePopover dataSourceKeys="ipcCh" />,
          records: [
            { label: IpcPhases.PHASE_1, color: 'ipcPhase1' },
            { label: IpcPhases.PHASE_2, color: 'ipcPhase2' },
            { label: IpcPhases.PHASE_3, color: 'ipcPhase3' },
            { label: IpcPhases.PHASE_4, color: 'ipcPhase4' },
            { label: IpcPhases.PHASE_5, color: 'ipcPhase5' },
            { label: NutritionData.NOT_ANALYZED_DATA, color: 'notAnalyzed' },
          ],
        });
      }
      break;
    case GlobalInsight.NUTRITION:
      if (!selectedCountryId) {
        legendData.push({
          title: 'MIMI Analysis Distribution',
          popoverInfo: <DataSourcePopover dataSourceKeys="micronutrients" />,
          records: [
            { label: NutritionData.ACTUAL_DATA, color: 'nutritionActual' },
            { label: NutritionData.PREDICTED_DATA, color: 'nutritionPredicted' },
            { label: NutritionData.NOT_ANALYZED_DATA, color: 'notAnalyzed' },
          ],
        });
      } else {
        legendData.push({
          title: 'Risk of Inadequate Micronutrient Intake',
          hasNotAnalyzedPoint: true,
          colorsData: [
            { color: 'ipcGradient1', title: 'Lowest', value: '0-19%' },
            { color: 'ipcGradient2', title: 'Low', value: '20-39%' },
            { color: 'ipcGradient3', title: 'Moderate', value: '40-59%' },
            { color: 'ipcGradient4', title: 'High', value: '60-79%' },
            { color: 'ipcGradient5', title: 'Highest', value: '80-100%' },
          ],
          startLabel: '0%',
          endLabel: '100%',
          popoverInfo: <DataSourcePopover dataSourceKeys="micronutrients" />,
        });
      }
      break;
    default:
  }

  return legendData;
}

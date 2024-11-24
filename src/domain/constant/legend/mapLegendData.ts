import { CountryAlertLegendItem } from '@/components/Map/Alerts/CountryAlerts/CountryAlertLegendItem';
import { HazardLegendItem } from '@/components/Map/Alerts/HazardLegendItem';
import { AlertType } from '@/domain/enums/AlertType.ts';
import { ConflictType } from '@/domain/enums/ConflictType.ts';
import { CountryAlertType } from '@/domain/enums/CountryAlertType';
import { GlobalInsight } from '@/domain/enums/GlobalInsight.ts';
import { HazardSeverity } from '@/domain/enums/HazardSeverity.ts';
import { GradientLegendContainerItem } from '@/domain/props/GradientLegendContainerItem.ts';
import PointLegendContainerItem from '@/domain/props/PointLegendContainerItem.ts';

export function mapLegendData(
  selectedMapType: GlobalInsight,
  selectedAlert: AlertType | null
): (PointLegendContainerItem | GradientLegendContainerItem)[] {
  const legendData: (PointLegendContainerItem | GradientLegendContainerItem)[] = [];

  switch (selectedAlert) {
    case AlertType.CONFLICTS:
      legendData.push({
        title: 'Types of conflict',
        tooltipInfo:
          'All reported violence and conflicts across Africa, the Middle East, South and South East Asia, Eastern and Southeastern Europe and the Balkans.',
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
        tooltipInfo:
          'Current hazards information: Active Volcanoes; Active/Forecast Wind Radii (39, 58, 74); Previous, Current and Forecast Storm Positions; 3- and 5-day Potential Track Area of Storms; Recent Earthquakes; MODIS Hotspots; Tsunami Travel Time; GLIDE Events; H1N1 Affected Countries; Country Boundaries and Labels; Global Shaded Relief; Global Population Density; and PDC integrated hazards.',
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
        tooltipInfo: 'Alerts on a country level.',
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
        title: 'Prevalence of insufficient food consumption',
        startColor: 'fcsGreen',
        endColor: 'fcsRed',
        startLabel: '0%',
        endLabel: 'above 40%',
        middleColor: 'fcsOrange',
        tooltipInfo:
          'People with insufficient food consumption refers to those with poor or borderline food consumption, according to the Food Consumption Score (FCS).' +
          '\n' +
          '\n' +
          "The Food Consumption Score (FCS) is a proxy of household's food access and a core WFP indicator used to classify households into different groups based on the adequacy of the foods consumed in the week prior to being surveyed. " +
          "FCS is the most commonly used food security indicator by WFP and partners. This indicator is a composite score based on household's dietary diversity, food frequency, and relative nutritional importance of different food groups. " +
          'The FCS is calculated using the frequency of consumption of eight food groups by a household during the 7 days before the survey using standardized weights for each of the food groups reflecting its respective nutrient density,and then classifies households as having ‘poor’, ‘borderline’ or ‘acceptable’ food consumption. ' +
          'Poor food consumption: Typically refers to households that are not consuming staples and vegetables every day and never or very seldom consume protein-rich food such as meat and dairy (FCS of less than 28). ' +
          'Borderline food consumption: Typically refers to households that are consuming staples and vegetables every day, accompanied by oil and pulses a few times a week (FCS of less than 42). ' +
          'Acceptable food consumption: Typically refers to households that are consuming staples and vegetables every day, frequently accompanied by oil and pulses, and occasionally meat, fish and dairy (FCS greater than 42).\n' +
          'Data source: World Food Programme - (i) near real-time food security monitoring systems (where available), based on mobile Vulnerability Analysis and Mapping (mVAM) surveys; (ii) HungerMapLIVE predictive model; or Proteus index.\n' +
          'Updated: Daily (low and lower-middle income countries), Annually (upper-middle and high income countries).',
      });
      break;
    case GlobalInsight.RAINFALL:
      legendData.push({
        title: 'Rainfall',
        startColor: 'rainfallLow',
        middleColor: 'rainfallNormal',
        endColor: 'rainfallHigh',
        startLabel: '<40%',
        endLabel: '>180%',
        tooltipInfo:
          'This layer shows the cumulative rainfall in the previous month compared to the 20-year average. ' +
          'Variations between 90% and 110% are considered as having an inconsequential impact for crops or pasture and these are represented in white. ' +
          'Otherwise, brown shades indicate below-average rainfall and blue shades indicate above-average seasonal rainfall.',
      });
      break;
    case GlobalInsight.VEGETATION:
      legendData.push({
        title: 'Vegetation',
        startColor: 'vegetationLow',
        middleColor: 'vegetationNormal',
        endColor: 'vegetationHigh',
        startLabel: '<50%',
        endLabel: '>150%',
        tooltipInfo:
          'The Normalized Difference Vegetation Index (NDVI) shows the recent vegetation development compared to the average. ' +
          'Green shades show areas where vegetation cover is above average, whilst orange and brown shades identify areas where vegetation cover is below normal. ' +
          'Values between 90% and 110% are considered as being within the range of normal variability.',
      });
      break;
    case GlobalInsight.IPC:
      legendData.push({
        title: 'Number of people in IPC/CH Phase 3 or above (millions)',
        startColor: 'ipcStart',
        middleColor: 'ipcMiddle',
        endColor: 'ipcEnd',
        startLabel: '0',
        endLabel: '>10',
        tooltipInfo: `
          Developed by a global partnership, the Integrated Food Security Phase Classification (IPC) / Cadre Harmonisé (CH) is a set of tools and procedures to classify food insecurity.\n
          It classifies the populations in five different phases according to the severity of the food insecurity and malnutrition situation:\n
          - Minimal\n
          - Stressed\n
          - Crisis\n
          - Emergency\n
          - Catastrophe/Famine.\n
          \n
          Data source: Integrated Food Security Phase Classification (IPC) / Cadre Harmonisé (CH) www.ipcinfo.org\n
          \n
          Updated: N/A
          `,
      });
      break;
    default:
  }

  return legendData;
}

import { Link } from '@nextui-org/link';

import { CountryAlertLegendItem } from '@/components/Map/Alerts/CountryAlerts/CountryAlertLegendItem';
import { HazardLegendItem } from '@/components/Map/Alerts/HazardLegendItem';
import { ReadMore } from '@/components/ReadMore/ReadMore';
import { AlertType } from '@/domain/enums/AlertType.ts';
import { ConflictType } from '@/domain/enums/ConflictType.ts';
import { CountryAlertType } from '@/domain/enums/CountryAlertType';
import { GlobalInsight } from '@/domain/enums/GlobalInsight.ts';
import { HazardSeverity } from '@/domain/enums/HazardSeverity.ts';
import { IpcPhases } from '@/domain/enums/IpcPhases';
import { NutritionData } from '@/domain/enums/NutritionData';
import { GradientLegendContainerItem } from '@/domain/props/GradientLegendContainerItem.ts';
import PointLegendContainerItem from '@/domain/props/PointLegendContainerItem.ts';

export function mapLegendData(
  selectedMapType: GlobalInsight,
  selectedAlert: AlertType | null,
  selectedCountryId: number | null
): (PointLegendContainerItem | GradientLegendContainerItem)[] {
  const legendData: (PointLegendContainerItem | GradientLegendContainerItem)[] = [];

  switch (selectedAlert) {
    case AlertType.CONFLICTS:
      legendData.push({
        title: 'Types of conflict',
        popoverInfo: (
          <ReadMore maxHeight={100}>
            <div>
              <p className="mb-3">
                All reported violence and conflicts across Africa, the Middle East, South and South East Asia, Eastern
                and Southeastern Europe and the Balkans.
              </p>
              <p className="mb-3">
                <b>Data source:</b> Armed Conflict Location & Event Data Project (ACLED)
                <br />
                <Link href="https://acleddata.com" isExternal size="sm">
                  acleddata.com
                </Link>
              </p>
              <p className="mb-3">
                <b>Updated:</b> Daily, displaying data from the last 30 days
              </p>
            </div>
          </ReadMore>
        ),
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
        popoverInfo: (
          <ReadMore maxHeight={100}>
            <div>
              <p className="mb-3">
                <b>Current hazards information:</b> Active Volcanoes; Active/Forecast Wind Radii (39, 58, 74); Previous,
                Current and Forecast Storm Positions; 3- and 5-day Potential Track Area of Storms; Recent Earthquakes;
                MODIS Hotspots; Tsunami Travel Time; GLIDE Events; H1N1 Affected Countries; Country Boundaries and
                Labels; Global Shaded Relief; Global Population Density; and PDC integrated hazards.
              </p>
              <p className="mb-3">
                <b>Data source:</b> Pacific Disaster Centre (PDC)- Active Hazards Map Service{' '}
                <Link href="https://www.pdc.org" isExternal>
                  www.pdc.org
                </Link>
              </p>
              <p className="mb-3">
                <b>Updated:</b> Real-time (every hour)
              </p>
            </div>
          </ReadMore>
        ),
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
          <ReadMore maxHeight={100}>
            <div>
              <p className="mb-3">Alerts on a country level.</p>
            </div>
          </ReadMore>
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
        title: 'Prevalence of insufficient food consumption',
        colors: ['fcsGradient1', 'fcsGradient2', 'fcsGradient3', 'fcsGradient4', 'fcsGradient5', 'fcsGradient6'],
        startLabel: '0%',
        endLabel: 'above 40%',
        popoverInfo: (
          <ReadMore maxHeight={100}>
            <div>
              <p className="mb-3">
                <b>People with insufficient food consumption</b> refers to those with poor or borderline food
                consumption, according to the Food Consumption Score (FCS).
              </p>
              <p className="mb-3">
                The <b>Food Consumption Score (FCS)</b> is a proxy of household&apos;s food access and a core WFP
                indicator used to classify households into different groups based on the adequacy of the foods consumed
                in the week prior to being surveyed. FCS is the most commonly used food security indicator by WFP and
                partners. This indicator is a composite score based on household&apos;s dietary diversity, food
                frequency, and relative nutritional importance of different food groups. The FCS is calculated using the
                frequency of consumption of eight food groups by a household during the 7 days before the survey using
                standardized weights for each of the food groups reflecting its respective nutrient density,and then
                classifies households as having ‘poor’, ‘borderline’ or ‘acceptable’ food consumption.
              </p>
              <p className="mb-3">
                <b>Poor food consumption:</b> Typically refers to households that are not consuming staples and
                vegetables every day and never or very seldom consume protein-rich food such as meat and dairy (FCS of
                less than 28).
              </p>
              <p className="mb-3">
                <b>Borderline food consumption:</b> Typically refers to households that are consuming staples and
                vegetables every day, accompanied by oil and pulses a few times a week (FCS of less than 42).
              </p>
              <p className="mb-3">
                <b>Acceptable food consumption:</b> Typically refers to households that are consuming staples and
                vegetables every day, frequently accompanied by oil and pulses, and occasionally meat, fish and dairy
                (FCS greater than 42).
              </p>
              <p className="mb-3">
                <b>Data source:</b> World Food Programme - (i) near real-time food security monitoring systems (where
                available), based on mobile Vulnerability Analysis and Mapping (mVAM) surveys; (ii) HungerMapLIVE
                predictive model; or{' '}
                <Link
                  size="sm"
                  href="https://www.sciencedirect.com/science/article/abs/pii/S0305750X19303572"
                  isExternal
                >
                  Proteus index
                </Link>
                .
              </p>
              <p className="mb-3">
                <b>Updated:</b> Daily (low and lower-middle income countries), Annually (upper-middle and high income
                countries).
              </p>
            </div>
          </ReadMore>
        ),
      });
      break;
    case GlobalInsight.RAINFALL:
      legendData.push({
        title: 'Rainfall',
        colors: [
          'vegetationGradient1',
          'vegetationGradient2',
          'vegetationGradient3',
          'vegetationGradient4',
          'vegetationGradient5',
          'rainfallGradient6',
          'rainfallGradient7',
          'rainfallGradient8',
          'rainfallGradient9',
        ],
        startLabel: '<40%',
        endLabel: '>180%',
        popoverInfo: (
          <ReadMore maxHeight={100}>
            <div>
              <p className="mb-3">
                The <b>1-month rainfall anomaly layer</b> shows cumulative seasonal rainfall as a percentage of the
                20-year average every ten days. Values below 100% indicate drier than average conditions, above 100%
                indicate wetter than average conditions. Variations between 90% and 110% are considered as having an
                inconsequential impact for crops or pasture and these are represented in white. Otherwise, brown shades
                indicate below-average rainfall and blue shades indicate above-average seasonal rainfall. Users can
                evaluate whether the season is becoming drier than average (blue shades turning darker or brown shades
                getting lighter) or wetter than average (brown shades turning darker or blue shades getting lighter).
              </p>
              <p className="mb-3">
                <b>Data source:</b> CHIRPS rainfall estimates, Climate Hazards Group, University of California at Santa
                Barbara, processed by WFP-VAM
              </p>
              <p className="mb-3">
                <b>Updated:</b> Every 10 days
              </p>
            </div>
          </ReadMore>
        ),
      });
      break;
    case GlobalInsight.VEGETATION:
      legendData.push({
        title: 'Vegetation',
        colors: [
          'vegetationGradient1',
          'vegetationGradient2',
          'vegetationGradient3',
          'vegetationGradient4',
          'vegetationGradient5',
          'vegetationGradient6',
          'vegetationGradient7',
          'vegetationGradient8',
          'vegetationGradient9',
        ],
        startLabel: '<50%',
        endLabel: '>150%',
        popoverInfo: (
          <ReadMore maxHeight={100}>
            <div>
              <p className="mb-3">
                The <b>Normalized Difference Vegetation Index (NDVI)</b> layer shows the recent vegetation development
                compared to the average. Green shades show areas where vegetation cover is above average, whilst orange
                and brown shades identify areas where vegetation cover is below normal. Users can evaluate whether
                vegetation cover is becoming sparser (darkening greens or lightening oranges) or denser (darkening
                oranges and lightening greens). Values between 90% and 110% are considered as being within the range of
                normal variability.
              </p>
              <p className="mb-3">
                <b>Data source:</b> MODIS platforms Terra and Aqua. MODIS NDVI CMG data product retrieved from Earthdata
                Search, courtesy of NASA EOSDIS Land Processes Distributed Active Archive Center (LP DAAC), USGS/Earth
                Resources Observation and Science (EROS) Center and Sioux Falls, South Dakota, USA.
              </p>
              <p className="mb-3">
                <b>Updated:</b> Every 8 days
              </p>
            </div>
          </ReadMore>
        ),
      });
      break;
    case GlobalInsight.IPC:
      if (!selectedCountryId) {
        legendData.push({
          title: 'Number of people in IPC/CH Phase 3 or above (millions)',
          hasNotAnalyzedPoint: true,
          colors: [
            'ipcGradient1',
            'ipcGradient2',
            'ipcGradient3',
            'ipcGradient4',
            'ipcGradient5',
            'ipcGradient6',
            'ipcGradient7',
          ],
          startLabel: '0',
          endLabel: '>10',
          popoverInfo: (
            <ReadMore maxHeight={100}>
              <div>
                <p className="mb-3">
                  Developed by a global partnership, the{' '}
                  <b>Integrated Food Security Phase Classification (IPC) / Cadre Harmonisé (CH)</b> is a set of tools
                  and procedures to classify food insecurity. It classifies the populations in five different phases
                  according to the severity of the food insecurity and malnutrition situation: Minimal, Stressed, Criss,
                  Emergency, and Catastrophe/Famine.
                </p>
                <p className="mb-3">
                  <b>Data source:</b> Integrated Food Security Phase Classification (IPC) / Cadre Harmonisé (CH){' '}
                  <Link isExternal href="http://www.ipcinfo.org" size="sm">
                    www.ipcinfo.org
                  </Link>
                </p>
                <p className="mb-3">
                  <b>Updated:</b> N/A
                </p>
              </div>
            </ReadMore>
          ),
        });
      } else {
        legendData.push({
          title: 'Acute food insecurity phase classification',
          popoverInfo: (
            <ReadMore maxHeight={100}>
              <div>
                <p className="mb-3">
                  Developed by a global partnership, the{' '}
                  <b>Integrated Food Security Phase Classification (IPC) / Cadre Harmonisé (CH)</b> is a set of tools
                  and procedures to classify food insecurity. It classifies the populations in five different phases
                  according to the severity of the food insecurity and malnutrition situation: Minimal, Stressed, Criss,
                  Emergency, and Catastrophe/Famine.
                </p>
                <p className="mb-3">
                  <b>Data source:</b> Integrated Food Security Phase Classification (IPC) / Cadre Harmonisé (CH){' '}
                  <Link isExternal href="http://www.ipcinfo.org" size="sm">
                    www.ipcinfo.org
                  </Link>
                </p>
                <p className="mb-3">
                  <b>Updated:</b> N/A
                </p>
              </div>
            </ReadMore>
          ),
          records: [
            { label: IpcPhases.PHASE_1, color: 'ipcPhase1' },
            { label: IpcPhases.PHASE_2, color: 'ipcPhase2' },
            { label: IpcPhases.PHASE_3, color: 'ipcPhase3' },
            { label: IpcPhases.PHASE_4, color: 'ipcPhase4' },
            { label: IpcPhases.PHASE_5, color: 'ipcPhase5' },
          ],
        });
      }

      break;

    case GlobalInsight.NUTRITION:
      if (!selectedCountryId) {
        legendData.push({
          title: 'Analysis Distribution',
          popoverInfo: (
            <ReadMore maxHeight={100}>
              <div>
                <p className="mb-3">
                  <b>About the MIMI Index </b>
                </p>
                <p className="mb-3">
                  MIMI is helping to close gaps in the nutrition data landscape by applying novel approaches to model
                  and map the RISK OF INADEQUATE MICRONUTRIENT INTAKE and potential contribution from fortification
                  scenarios, to inform decision making and advocacy for fortification and other micronutrient programmes
                  in the short-medium term.{' '}
                </p>

                <p className="mb-3">
                  <b>Key components of the current MIMI project:</b>
                </p>

                <ul>
                  <li>
                    Qualitative research to understand key policy questions and evidence needs for food fortification
                    policy and programmes
                  </li>
                  <li>
                    Preparation and analysis of secondary household survey data to estimate risk of inadequate intake in
                    Ethiopia, India and Nigeria
                  </li>
                  <li>
                    Training machine-learning (ML) models to predict risk of inadequate micronutrient intake and
                    potential contribution to improving intake
                  </li>
                  <li>
                    Interactive, subnational map visualisations to make data outputs relevant and accessible to
                    decision-makers and advisors
                  </li>
                  <li>
                    Workshops and Capacity Strengthening to ensure outputs are policy-relevant and can inform advocacy
                    and decision-making
                  </li>
                </ul>
              </div>
            </ReadMore>
          ),
          records: [
            { label: NutritionData.ACTUAL_DATA, color: 'nutritionActual' },
            { label: NutritionData.PREDICTED_DATA, color: 'nutritionPredicted' },
            { label: NutritionData.NOT_ANALYZED_DATA, color: 'nutritionNotAnalyzed' },
          ],
        });
      } else {
        legendData.push({
          title: 'Risk of Inadequate Micronutrient Intake',
          colors: ['ipcGradient1', 'ipcGradient2', 'ipcGradient3', 'ipcGradient4', 'ipcGradient5'],
          startLabel: '0%',
          endLabel: '100%',
          popoverInfo: (
            <ReadMore maxHeight={100}>
              <div>
                <p className="mb-3">
                  <b>About the MIMI Index </b>
                </p>
                <p className="mb-3">
                  MIMI is helping to close gaps in the nutrition data landscape by applying novel approaches to model
                  and map the RISK OF INADEQUATE MICRONUTRIENT INTAKE and potential contribution from fortification
                  scenarios, to inform decision making and advocacy for fortification and other micronutrient programmes
                  in the short-medium term.{' '}
                </p>

                <p className="mb-3">
                  <b>Key components of the current MIMI project:</b>
                </p>

                <ul>
                  <li>
                    Qualitative research to understand key policy questions and evidence needs for food fortification
                    policy and programmes
                  </li>
                  <li>
                    Preparation and analysis of secondary household survey data to estimate risk of inadequate intake in
                    Ethiopia, India and Nigeria
                  </li>
                  <li>
                    Training machine-learning (ML) models to predict risk of inadequate micronutrient intake and
                    potential contribution to improving intake
                  </li>
                  <li>
                    Interactive, subnational map visualisations to make data outputs relevant and accessible to
                    decision-makers and advisors
                  </li>
                  <li>
                    Workshops and Capacity Strengthening to ensure outputs are policy-relevant and can inform advocacy
                    and decision-making
                  </li>
                </ul>
              </div>
            </ReadMore>
          ),
        });
      }

      break;
    default:
  }

  return legendData;
}

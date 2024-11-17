import { GlobalInsight } from '@/domain/enums/GlobalInsight.ts';
import { GradientLegendContainerItem } from '@/domain/props/GradientLegendContainerItem.ts';
import PointLegendContainerItem from '@/domain/props/PointLegendContainerItem.ts';

export function mapLegendData(
  selectedMapType: GlobalInsight
): (PointLegendContainerItem | GradientLegendContainerItem)[] {
  switch (selectedMapType) {
    case GlobalInsight.FOOD:
      return [
        {
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
        },
      ];

    case GlobalInsight.IPC:
      return [
        {
          title: 'Number of people in IPC/CH Phase 3 or above (millions)',
          startColor: 'ipcStartColor',
          middleColor: 'ipcMiddleColor',
          endColor: 'ipcEndColor',
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
        },
      ];
    default:
      return [];
  }
}

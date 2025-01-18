import clsx from 'clsx';

import { CategoricalChart } from '@/components/Charts/CategoricalChart';
import { ContinuousChart } from '@/components/Charts/ContinuousChart';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { DataSourcePopover } from '@/components/Legend/DataSourcePopover';
import descriptions from '@/domain/constant/dataSources/dataSourceDescriptions';
import { AccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData';
import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData';
import { RegionComparisonChartData } from '@/domain/entities/comparison/RegionComparisonChartData';
import { AdditionalCountryData } from '@/domain/entities/country/AdditionalCountryData';
import { RegionProperties } from '@/domain/entities/region/RegionProperties';
import { ContinuousChartDataType } from '@/domain/enums/ContinuousChartDataType';
import { formatToMillion } from '@/utils/formatting';

export class RegionComparisonOperations {
  static getComparisonAccordionItems({
    fcsBarChartData,
    rcsiBarChartData,
    fcsGraphData,
  }: RegionComparisonChartData): AccordionItemProps[] {
    return [
      {
        title: 'Current Food Security',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys={['fcs', 'rCsi']} />,
        content: (
          <div
            className={clsx('grid gap-6', {
              // only allow two columns if there aren't so many regions selected
              'md:grid-cols-2': fcsBarChartData && fcsBarChartData?.categories.length < 12,
            })}
          >
            {fcsBarChartData && (
              <CategoricalChart title={descriptions.fcs.legendTitle} data={fcsBarChartData} transparentBackground />
            )}
            {rcsiBarChartData && (
              <CategoricalChart title={descriptions.rCsi.legendTitle} data={rcsiBarChartData} transparentBackground />
            )}
          </div>
        ),
      },
      {
        title: 'Trend of insufficient food consumption',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys={['fcs', 'rCsi']} />,
        content: (
          <div>
            {fcsGraphData && (
              <ContinuousChart
                title={descriptions.fcs.legendTitle}
                data={fcsGraphData}
                transparentBackground
                disableBarChartSwitch
              />
            )}
          </div>
        ),
      },
    ];
  }

  static getChartData(
    regionData: AdditionalCountryData | undefined,
    selectedRegions: string[],
    showRelativeNumbers: boolean
  ): RegionComparisonChartData {
    if (!regionData) return {};
    const selectedRegionsSet = new Set(selectedRegions);
    const selectedRegionProperties: RegionProperties[] = regionData.features
      .filter((feature) => selectedRegionsSet.has(feature.id))
      .map((feature) => feature.properties);

    return {
      fcsBarChartData: this.getBarChartData('fcs', selectedRegionProperties, showRelativeNumbers),
      rcsiBarChartData: this.getBarChartData('rcsi', selectedRegionProperties, showRelativeNumbers),
      fcsGraphData: this.getFcsGraph(selectedRegionProperties),
    };
  }

  private static getBarChartData(
    type: 'fcs' | 'rcsi',
    selectedRegionProperties: RegionProperties[],
    showRelativeNumbers: boolean
  ): CategoricalChartData {
    return {
      yAxisLabel: showRelativeNumbers ? '% of population' : 'Mill',
      categories: selectedRegionProperties.map((region) => ({
        name: region.Name,
        dataPoint: { y: showRelativeNumbers ? region[type].ratio : region[type].people },
      })),
    };
  }

  private static getFcsGraph(selectedRegionProperties: RegionProperties[]): ContinuousChartData {
    return {
      type: ContinuousChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: selectedRegionProperties.map((region) => {
        return {
          name: region.Name,
          showRange: true,
          dataPoints: region.fcsGraph.map((fcsChartData) => ({
            x: new Date(fcsChartData.x).getTime(),
            y: formatToMillion(fcsChartData.fcs),
          })),
        };
      }),
    };
  }
}

import clsx from 'clsx';

import { CategoricalChart } from '@/components/Charts/CategoricalChart';
import { ContinuousChart } from '@/components/Charts/ContinuousChart';
import NoDataAlert from '@/components/ComparisonPortal/NoDataAlert';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { DataSourcePopover } from '@/components/Legend/DataSourcePopover';
import descriptions from '@/domain/constant/dataSources/dataSourceDescriptions';
import { AccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData';
import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData';
import { Feature } from '@/domain/entities/common/Feature';
import { RegionComparisonChartData } from '@/domain/entities/comparison/RegionComparisonChartData';
import { AdditionalCountryData } from '@/domain/entities/country/AdditionalCountryData';
import { RegionProperties } from '@/domain/entities/region/RegionProperties';
import { ContinuousChartDataType } from '@/domain/enums/ContinuousChartDataType';
import { CountryComparisonOperations } from '@/operations/comparison-portal/CountryComparisonOperations';
import { formatToMillion } from '@/utils/formatting';

export class RegionComparisonOperations {
  static getComparisonAccordionItems(
    { fcsBarChartData, rcsiBarChartData, fcsGraphData }: RegionComparisonChartData,
    selectedRegions: string[] | 'all',
    regionFeatures: (Feature<RegionProperties> & { id?: string })[]
  ): AccordionItemProps[] {
    const selectedRegionFeatures =
      selectedRegions === 'all'
        ? regionFeatures
        : regionFeatures.filter(
            (regionFeature) => regionFeature.id && selectedRegions.includes(regionFeature.id?.toString())
          );
    const selectedRegionNames = selectedRegionFeatures.map((regionFeature) => regionFeature.properties.Name);
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
              <div>
                <CategoricalChart title={descriptions.fcs.legendTitle} data={fcsBarChartData} transparentBackground />
                <NoDataAlert chartData={fcsBarChartData} requestedChartCategories={selectedRegionNames} />
              </div>
            )}
            {rcsiBarChartData && (
              <div>
                <CategoricalChart title={descriptions.rCsi.legendTitle} data={rcsiBarChartData} transparentBackground />
                <NoDataAlert chartData={rcsiBarChartData} requestedChartCategories={selectedRegionNames} />
              </div>
            )}
          </div>
        ),
      },
      {
        title: 'Trend of insufficient food consumption',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys={['fcs', 'rCsi']} />,
        content: fcsGraphData && (
          <div>
            <ContinuousChart
              title={descriptions.fcs.legendTitle}
              data={fcsGraphData}
              transparentBackground
              disableBarChartSwitch
            />
            <NoDataAlert chartData={fcsGraphData} requestedChartCategories={selectedRegionNames} />
          </div>
        ),
      },
    ];
  }

  static getChartData(regionData: AdditionalCountryData, selectedRegions: string[] | 'all'): RegionComparisonChartData {
    let selectedRegionFeatures = regionData.features;
    if (selectedRegions !== 'all') {
      const selectedRegionsSet = new Set(selectedRegions);
      selectedRegionFeatures = selectedRegionFeatures.filter((feature) =>
        selectedRegionsSet.has(feature.properties.Code.toString())
      );
    }
    const selectedRegionProperties = selectedRegionFeatures.map((feature) => feature.properties);

    return {
      fcsBarChartData: this.getBarChartData('fcs', selectedRegionProperties),
      rcsiBarChartData: this.getBarChartData('rcsi', selectedRegionProperties),
      fcsGraphData: this.getFcsGraph(selectedRegionProperties),
    };
  }

  private static getBarChartData(
    type: 'fcs' | 'rcsi',
    selectedRegionProperties: RegionProperties[]
  ): CategoricalChartData {
    return {
      yAxisLabel: 'Mill',
      categories: selectedRegionProperties
        .filter((region) => region[type] !== null && region[type]!.ratio !== null && region[type]!.people !== null)
        .map((region) => ({
          name: region.Name,
          dataPoint: {
            y: formatToMillion(region[type]!.people)!,
            yRangeMin: formatToMillion(region[type]!.peopleLow)!,
            yRangeMax: formatToMillion(region[type]!.peopleHigh)!,
            yRelative: region[type]!.ratio!,
            yRangeMinRelative: region[type]!.ratioLow!,
            yRangeMaxRelative: region[type]!.ratioHigh!,
          },
        })),
    };
  }

  private static getFcsGraph(selectedRegionProperties: RegionProperties[]): ContinuousChartData {
    const showErrorMargins = selectedRegionProperties.length <= 5;
    return CountryComparisonOperations.chartWithoutEmptyLines({
      type: ContinuousChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: selectedRegionProperties.map((region) => {
        return {
          name: region.Name,
          showRange: true,
          dataPoints:
            region.fcsGraph?.map((fcsChartData) => {
              return {
                x: new Date(fcsChartData.x).getTime(),
                y: formatToMillion(fcsChartData.fcs),
                ...(showErrorMargins
                  ? {
                      yRangeMin: formatToMillion(fcsChartData.fcsLow),
                      yRangeMax: formatToMillion(fcsChartData.fcsHigh),
                    }
                  : {}),
              };
            }) ?? [],
        };
      }),
    });
  }
}

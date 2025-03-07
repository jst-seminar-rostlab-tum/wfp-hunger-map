import { Spacer } from '@nextui-org/react';
import { UseQueryResult } from '@tanstack/react-query';

import { CategoricalChart } from '@/components/Charts/CategoricalChart';
import { ContinuousChart } from '@/components/Charts/ContinuousChart';
import NoDataAlert from '@/components/ComparisonPortal/NoDataAlert';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { DataSourcePopover } from '@/components/Legend/DataSourcePopover';
import descriptions from '@/domain/constant/dataSources/dataSourceDescriptions';
import { AccordionItemProps } from '@/domain/entities/accordions/Accordions';
import { CategoricalChartData } from '@/domain/entities/charts/CategoricalChartData';
import { ContinuousChartData } from '@/domain/entities/charts/ContinuousChartData.ts';
import { ChartData } from '@/domain/entities/common/ChartData.ts';
import { CountryComparisonChartData } from '@/domain/entities/comparison/CountryComparisonChartdata';
import { CountryComparisonData } from '@/domain/entities/comparison/CountryComparisonData';
import { CountryDataRecord } from '@/domain/entities/country/CountryData';
import { CountryIso3DataRecord } from '@/domain/entities/country/CountryIso3Data.ts';
import { CountryMapData } from '@/domain/entities/country/CountryMapData';
import { SNACKBAR_SHORT_DURATION } from '@/domain/entities/snackbar/Snackbar';
import { ContinuousChartDataType } from '@/domain/enums/ContinuousChartDataType.ts';
import { SnackbarPosition, SnackbarStatus } from '@/domain/enums/Snackbar';
import { SnackbarProps } from '@/domain/props/SnackbarProps';
import { formatToMillion } from '@/utils/formatting.ts';

export class CountryComparisonOperations {
  static getCountryNameById(id: number, countryMapData: CountryMapData[]): string {
    return countryMapData.find((country) => country.properties.adm0_id === id)?.properties.adm0_name || '';
  }

  static getCountryNameByIso3(iso3: string, countryMapData: CountryMapData[]): string {
    return countryMapData.find((country) => country.properties.iso3 === iso3)?.properties.adm0_name || '';
  }

  static getChartData(
    countryDataList: CountryDataRecord[],
    countryIso3DataList: CountryIso3DataRecord[],
    selectedCountries: CountryMapData[]
  ): CountryComparisonChartData {
    return {
      fcsChartData: countryDataList.length > 1 ? this.getFcsChartData(countryDataList, selectedCountries) : undefined,
      rcsiChartData: countryDataList.length > 1 ? this.getRcsiChartData(countryDataList, selectedCountries) : undefined,
      foodSecurityBarChartData:
        countryDataList.length > 1 ? this.getFoodSecurityBarChartData(countryDataList, selectedCountries) : undefined,
      populationBarChartData:
        countryDataList.length > 1 ? this.getPopulationBarChartData(countryDataList, selectedCountries) : undefined,
      importDependencyBarChartData:
        countryDataList.length > 1
          ? this.getImportDependencyBarChartData(countryDataList, selectedCountries)
          : undefined,
      balanceOfTradeData:
        countryIso3DataList.length > 1 ? this.getBalanceOfTradeData(countryIso3DataList, selectedCountries) : undefined,
      headlineInflationData:
        countryIso3DataList.length > 1
          ? this.getInflationData(countryIso3DataList, selectedCountries, 'headline')
          : undefined,
      foodInflationData:
        countryIso3DataList.length > 1
          ? this.getInflationData(countryIso3DataList, selectedCountries, 'food')
          : undefined,
    };
  }

  static getFilteredCountryData(
    countryDataQuery: UseQueryResult<CountryDataRecord | null>[],
    countryIso3DataQuery: UseQueryResult<CountryIso3DataRecord | null>[]
  ): CountryComparisonData {
    const countryDataList: CountryDataRecord[] = countryDataQuery
      .map((result) => result.data)
      .filter((data): data is CountryDataRecord => data !== null && data !== undefined);

    const countryIso3DataList: CountryIso3DataRecord[] = countryIso3DataQuery
      .map((result) => result.data)
      .filter((data): data is CountryIso3DataRecord => data !== null && data !== undefined);

    return { countryDataList, countryIso3DataList };
  }

  static showDataNotFoundSnackBar(showSnackBar: (props: SnackbarProps) => void, countryName: string): void {
    showSnackBar({
      message: `Error fetching country data for ${countryName}`,
      status: SnackbarStatus.Error,
      position: SnackbarPosition.BottomMiddle,
      duration: SNACKBAR_SHORT_DURATION,
    });
  }

  static getComparisonAccordionItems(
    {
      fcsChartData,
      rcsiChartData,
      foodSecurityBarChartData,
      populationBarChartData,
      importDependencyBarChartData,
      balanceOfTradeData,
      headlineInflationData,
      foodInflationData,
    }: CountryComparisonChartData,
    selectedCountryNames: string[],
    isLoading: boolean
  ): AccordionItemProps[] {
    return [
      {
        title: 'Current Food Security',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys={['population', 'fcs']} />,
        content: (
          <div className="grid md:grid-cols-2 gap-6">
            {foodSecurityBarChartData && (
              <CategoricalChart
                title={descriptions.fcs.legendTitle}
                data={foodSecurityBarChartData}
                transparentBackground
              />
            )}
            {populationBarChartData && (
              <CategoricalChart
                title={descriptions.population.title}
                data={populationBarChartData}
                transparentBackground
              />
            )}
          </div>
        ),
      },
      {
        title: 'Food Security Trends',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys={['fcs', 'rCsi']} />,
        content: (
          <div>
            {fcsChartData && (
              <>
                <ContinuousChart
                  title={descriptions.fcs.legendTitle}
                  data={fcsChartData}
                  small
                  noPadding
                  transparentBackground
                  chartHeight={300}
                />
                <NoDataAlert
                  chartData={fcsChartData}
                  requestedChartCategories={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
            )}
            <Spacer y={6} />
            {rcsiChartData && (
              <>
                <ContinuousChart
                  title={descriptions.rCsi.legendTitle}
                  data={rcsiChartData}
                  small
                  noPadding
                  transparentBackground
                  chartHeight={300}
                />
                <NoDataAlert
                  chartData={rcsiChartData}
                  requestedChartCategories={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>
        ),
      },
      {
        title: descriptions.importDependency.title,
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys="importDependency" />,
        content: (
          <div>
            {importDependencyBarChartData && (
              <>
                <CategoricalChart data={importDependencyBarChartData} transparentBackground />
                <NoDataAlert
                  chartData={importDependencyBarChartData}
                  requestedChartCategories={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>
        ),
      },
      {
        title: descriptions.balanceOfTrade.title,
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys="balanceOfTrade" />,
        content: (
          <div>
            {balanceOfTradeData && (
              <>
                <ContinuousChart data={balanceOfTradeData} small noPadding transparentBackground chartHeight={300} />
                <NoDataAlert
                  chartData={balanceOfTradeData}
                  requestedChartCategories={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>
        ),
      },
      {
        title: 'Food and Headline Inflation',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: <DataSourcePopover dataSourceKeys={['headlineInflation', 'foodInflation']} />,
        content: (
          <div>
            {headlineInflationData && (
              <>
                <ContinuousChart
                  title={descriptions.headlineInflation.title}
                  data={headlineInflationData}
                  small
                  noPadding
                  transparentBackground
                  chartHeight={300}
                />
                <NoDataAlert
                  chartData={headlineInflationData}
                  requestedChartCategories={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
            )}
            {foodInflationData && (
              <>
                <ContinuousChart
                  title={descriptions.foodInflation.title}
                  data={foodInflationData}
                  small
                  noPadding
                  transparentBackground
                  chartHeight={300}
                />
                <NoDataAlert
                  chartData={foodInflationData}
                  requestedChartCategories={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>
        ),
      },
    ];
  }

  private static getFcsChartData(
    countryDataList: CountryDataRecord[],
    countryMapData: CountryMapData[]
  ): ContinuousChartData {
    return this.chartWithoutEmptyLines({
      type: ContinuousChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: countryDataList.map((countryData) => ({
        name: this.getCountryNameById(countryData.id, countryMapData),
        showRange: true,
        dataPoints: countryData.fcsGraph.map((fcsChartData) => ({
          x: new Date(fcsChartData.x).getTime(),
          y: formatToMillion(fcsChartData.fcs),
          yRangeMin: formatToMillion(fcsChartData.fcsLow),
          yRangeMax: formatToMillion(fcsChartData.fcsHigh),
        })),
      })),
    });
  }

  private static getRcsiChartData(
    countryDataList: CountryDataRecord[],
    countryMapData: CountryMapData[]
  ): ContinuousChartData {
    return this.chartWithoutEmptyLines({
      type: ContinuousChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: countryDataList.map((countryData) => ({
        name: this.getCountryNameById(countryData.id, countryMapData),
        showRange: true,
        dataPoints: countryData.rcsiGraph
          .filter((rcsiChartData) => rcsiChartData.rcsi !== null)
          .map((rcsiChartData) => ({
            x: new Date(rcsiChartData.x).getTime(),
            y: formatToMillion(rcsiChartData.rcsi),
            yRangeMin: formatToMillion(rcsiChartData.rcsiLow),
            yRangeMax: formatToMillion(rcsiChartData.rcsiHigh),
          })),
      })),
    });
  }

  private static getPopulationBarChartData(
    countryDataList: CountryDataRecord[],
    countryMapData: CountryMapData[]
  ): CategoricalChartData {
    return {
      yAxisLabel: 'Mill',
      categories: countryDataList.map((countryData) => ({
        name: this.getCountryNameById(countryData.id, countryMapData),
        dataPoint: {
          y: countryData.population,
        },
      })),
    };
  }

  private static getFoodSecurityBarChartData(
    countryDataList: CountryDataRecord[],
    countryMapData: CountryMapData[]
  ): CategoricalChartData {
    return {
      yAxisLabel: 'Mill',
      categories: countryDataList.map((countryData) => ({
        name: this.getCountryNameById(countryData.id, countryMapData),
        dataPoint: {
          y: countryData.fcs,
          yRelative: Math.round((countryData.fcs / countryData.population) * 1000) / 10,
        },
      })),
    };
  }

  private static getImportDependencyBarChartData(
    countryDataList: CountryDataRecord[],
    selectedCountries: CountryMapData[]
  ): CategoricalChartData {
    return {
      yAxisLabel: '% of Cereals',
      categories: countryDataList
        .filter((countryData) => countryData.importDependency !== null)
        .map((countryData) => ({
          name: this.getCountryNameById(countryData.id, selectedCountries),
          dataPoint: {
            y: countryData.importDependency!,
          },
        })),
    };
  }

  private static getBalanceOfTradeData(
    countryIso3DataList: CountryIso3DataRecord[],
    selectedCountries: CountryMapData[]
  ): ContinuousChartData {
    return this.chartWithoutEmptyLines({
      type: ContinuousChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill USD',
      lines: countryIso3DataList.map((countryIso3Data) => ({
        name: this.getCountryNameByIso3(countryIso3Data.id, selectedCountries),
        dataPoints: countryIso3Data.balanceOfTradeGraph.data.map((p) => {
          return { x: new Date(p.x).getTime(), y: formatToMillion(p.y) };
        }),
      })),
    });
  }

  private static getInflationData(
    countryIso3DataList: CountryIso3DataRecord[],
    selectedCountries: CountryMapData[],
    type: 'headline' | 'food'
  ): ContinuousChartData {
    return this.chartWithoutEmptyLines({
      type: ContinuousChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Rate in %',
      lines: countryIso3DataList
        .filter((countryIso3Data) => countryIso3Data.inflationGraphs[type].data !== undefined)
        .map((countryIso3Data) => ({
          name: this.getCountryNameByIso3(countryIso3Data.id, selectedCountries),
          dataPoints: (countryIso3Data.inflationGraphs[type].data as ChartData[]).map((p) => {
            return { x: new Date(p.x).getTime(), y: p.y };
          }),
        })),
    });
  }

  static chartWithoutEmptyLines(chart: ContinuousChartData): ContinuousChartData {
    return {
      ...chart,
      lines: chart.lines.filter((line) => line.dataPoints.length > 0),
    };
  }
}

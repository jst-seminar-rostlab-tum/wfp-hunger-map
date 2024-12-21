import { Spacer } from '@nextui-org/react';
import { UseQueryResult } from '@tanstack/react-query';

import { CategoricalChart } from '@/components/Charts/CategoricalChart';
import { ContinuousChart } from '@/components/Charts/ContinuousChart';
import NoDataHint from '@/components/ComparisonPortal/NoDataHint';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
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
import { FcsAccordionOperations } from '@/operations/map/FcsAccordionOperations';
import { formatToMillion } from '@/utils/formatting.ts';

export class CountryComparisonOperations {
  static getFcsChartData(countryDataList: CountryDataRecord[], countryMapData: CountryMapData[]): ContinuousChartData {
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

  static getRcsiChartData(countryDataList: CountryDataRecord[], countryMapData: CountryMapData[]): ContinuousChartData {
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

  static getPopulationBarChartData(
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

  static getFoodSecurityBarChartData(
    countryDataList: CountryDataRecord[],
    countryMapData: CountryMapData[]
  ): CategoricalChartData {
    return {
      yAxisLabel: 'Mill',
      categories: countryDataList.map((countryData) => ({
        name: this.getCountryNameById(countryData.id, countryMapData),
        dataPoint: {
          y: countryData.fcs,
        },
      })),
    };
  }

  static getImportDependencyBarChartData(
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

  static getBalanceOfTradeData(
    countryIso3DataList: CountryIso3DataRecord[],
    selectedCountries: CountryMapData[]
  ): ContinuousChartData {
    return this.chartWithoutEmptyLines({
      type: ContinuousChartDataType.LINE_CHART_DATA,
      xAxisType: 'datetime',
      yAxisLabel: 'Mill',
      lines: countryIso3DataList.map((countryIso3Data) => ({
        name: this.getCountryNameByIso3(countryIso3Data.id, selectedCountries),
        dataPoints: countryIso3Data.balanceOfTradeGraph.data.map((p) => {
          return { x: new Date(p.x).getTime(), y: formatToMillion(p.y) };
        }),
      })),
    });
  }

  static getInflationData(
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

  static getCountryNameById(id: number, countryMapData: CountryMapData[]): string {
    return countryMapData.find((country) => country.properties.adm0_id === id)?.properties.adm0_name || '';
  }

  static getCountryNameByIso3(iso3: string, countryMapData: CountryMapData[]): string {
    return countryMapData.find((country) => country.properties.iso3 === iso3)?.properties.adm0_name || '';
  }

  static chartWithoutEmptyLines(chart: ContinuousChartData): ContinuousChartData {
    return {
      ...chart,
      lines: chart.lines.filter((line) => line.dataPoints.length > 0),
    };
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
        title: 'Food Security',
        content: (
          <div className="grid md:grid-cols-2 gap-6">
            {foodSecurityBarChartData && (
              <CategoricalChart
                title="Number of people with insufficient food consumption"
                data={foodSecurityBarChartData}
                transparentBackground
              />
            )}
            {populationBarChartData && (
              <CategoricalChart title="Population" data={populationBarChartData} transparentBackground />
            )}
          </div>
        ),
      },
      {
        title: 'Food Security Trends',
        content: (
          <div>
            {fcsChartData && (
              <>
                <ContinuousChart
                  title="Trend of the number of people with insufficient food consumption"
                  data={fcsChartData}
                  small
                  noPadding
                  transparentBackground
                  chartHeight={300}
                />
                <NoDataHint
                  chartData={fcsChartData}
                  selectedCountryNames={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
            )}
            <Spacer y={6} />
            {rcsiChartData && (
              <>
                <ContinuousChart
                  title="Trend of the number of people using crisis or above crisis food-based coping"
                  data={rcsiChartData}
                  small
                  noPadding
                  transparentBackground
                  chartHeight={300}
                />
                <NoDataHint
                  chartData={rcsiChartData}
                  selectedCountryNames={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>
        ),
      },
      {
        title: 'Macro-economic',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: FcsAccordionOperations.getMacroEconomicPopoverInfo(),
        content: (
          <div>
            {importDependencyBarChartData && (
              <>
                <CategoricalChart title="Import Dependency" data={importDependencyBarChartData} transparentBackground />
                <NoDataHint
                  chartData={importDependencyBarChartData}
                  selectedCountryNames={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>
        ),
      },
      {
        title: 'Balance of Trade',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: FcsAccordionOperations.getBalanceOfTradePopoverInfo(),
        content: (
          <div>
            {balanceOfTradeData && (
              <>
                <ContinuousChart data={balanceOfTradeData} small noPadding transparentBackground chartHeight={300} />
                <NoDataHint
                  chartData={balanceOfTradeData}
                  selectedCountryNames={selectedCountryNames}
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
        popoverInfo: FcsAccordionOperations.getHeadlineAndFoodInflationPopoverInfo(),
        content: (
          <div>
            {headlineInflationData && (
              <>
                <ContinuousChart
                  title="Headline Inflation"
                  data={headlineInflationData}
                  small
                  noPadding
                  transparentBackground
                  chartHeight={300}
                />
                <NoDataHint
                  chartData={headlineInflationData}
                  selectedCountryNames={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
            )}
            {foodInflationData && (
              <>
                <ContinuousChart
                  title="Food Inflation"
                  data={foodInflationData}
                  small
                  noPadding
                  transparentBackground
                  chartHeight={300}
                />
                <NoDataHint
                  chartData={foodInflationData}
                  selectedCountryNames={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>
        ),
      },
    ];
  }
}

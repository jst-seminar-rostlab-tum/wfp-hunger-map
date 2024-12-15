import { Spacer } from '@nextui-org/react';
import { UseQueryResult } from '@tanstack/react-query';

import { LineChart } from '@/components/Charts/LineChart';
import NoDataHint from '@/components/ComparisonPortal/NoDataHint';
import CustomInfoCircle from '@/components/CustomInfoCircle/CustomInfoCircle';
import { LineChartData } from '@/domain/entities/charts/LineChartData';
import { ChartData } from '@/domain/entities/common/ChartData.ts';
import { CountryComparisonChartData } from '@/domain/entities/comparison/CountryComparisonChartdata';
import { CountryComparisonData } from '@/domain/entities/comparison/CountryComparisonData';
import { CountryDataRecord } from '@/domain/entities/country/CountryData';
import { CountryIso3DataRecord } from '@/domain/entities/country/CountryIso3Data.ts';
import { CountryMapData } from '@/domain/entities/country/CountryMapData';
import { SNACKBAR_SHORT_DURATION } from '@/domain/entities/snackbar/Snackbar';
import { LineChartDataType } from '@/domain/enums/LineChartDataType';
import { SnackbarPosition, SnackbarStatus } from '@/domain/enums/Snackbar';
import { SnackbarProps } from '@/domain/props/SnackbarProps';
import { FcsAccordionOperations } from '@/operations/map/FcsAccordionOperations';
import { formatToMillion } from '@/utils/formatting.ts';

export class CountryComparisonOperations {
  static getFcsChartData(countryDataList: CountryDataRecord[], countryMapData: CountryMapData[]): LineChartData {
    return this.chartWithoutEmptyLines({
      type: LineChartDataType.LINE_CHART_DATA,
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

  static getRcsiChartData(countryDataList: CountryDataRecord[], countryMapData: CountryMapData[]): LineChartData {
    return this.chartWithoutEmptyLines({
      type: LineChartDataType.LINE_CHART_DATA,
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

  static getFoodSecurityBarChartData(
    countryDataList: CountryDataRecord[],
    countryMapData: CountryMapData[]
  ): LineChartData {
    return {
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'category',
      yAxisLabel: 'Mill',
      lines: countryDataList.map((countryData) => ({
        name: this.getCountryNameById(countryData.id, countryMapData),
        showRange: false,
        dataPoints: [
          {
            x: 0, // TODO: f-165 this should be 'population'
            y: countryData.population,
          },
          {
            x: 1, // TODO: f-165 this should be 'people with insufficient food consumption'
            y: countryData.fcs,
          },
        ],
      })),
    };
  }

  static getImportDependencyBarChartData(
    countryDataList: CountryDataRecord[],
    selectedCountries: CountryMapData[]
  ): LineChartData {
    return this.chartWithoutEmptyLines({
      type: LineChartDataType.LINE_CHART_DATA,
      xAxisType: 'category',
      yAxisLabel: '% of Cereals',
      lines: countryDataList.map((countryData) => ({
        name: this.getCountryNameById(countryData.id, selectedCountries),
        showRange: false,
        dataPoints:
          countryData.importDependency !== null
            ? [
                {
                  x: 0, // TODO: f-165: should be the individual value of the country variable
                  y: countryData.importDependency,
                },
              ]
            : [],
      })),
    });
  }

  static getBalanceOfTradeData(
    countryIso3DataList: CountryIso3DataRecord[],
    selectedCountries: CountryMapData[]
  ): LineChartData {
    return this.chartWithoutEmptyLines({
      type: LineChartDataType.LINE_CHART_DATA,
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
  ): LineChartData {
    return this.chartWithoutEmptyLines({
      type: LineChartDataType.LINE_CHART_DATA,
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

  static chartWithoutEmptyLines(chart: LineChartData): LineChartData {
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
      importDependencyBarChartData,
      balanceOfTradeData,
      headlineInflationData,
      foodInflationData,
    }: CountryComparisonChartData,
    selectedCountryNames: string[],
    isLoading: boolean
  ) {
    return [
      {
        title: 'Food Security',
        content: (
          <div>
            {foodSecurityBarChartData && (
              <>
                <LineChart
                  data={foodSecurityBarChartData}
                  expandable
                  small
                  noPadding
                  transparentBackground
                  // TODO: f-165 bar chart
                />
                <NoDataHint
                  lineChartData={foodSecurityBarChartData}
                  selectedCountryNames={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
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
                <LineChart
                  title="Trend of the number of people with insufficient food consumption"
                  data={fcsChartData}
                  expandable
                  xAxisSlider
                  small
                  noPadding
                  transparentBackground
                />
                <NoDataHint
                  lineChartData={fcsChartData}
                  selectedCountryNames={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
            )}
            <Spacer y={6} />
            {rcsiChartData && (
              <>
                <LineChart
                  title="Trend of the number of people using crisis or above crisis food-based coping"
                  data={rcsiChartData}
                  expandable
                  xAxisSlider
                  small
                  noPadding
                  transparentBackground
                />
                <NoDataHint
                  lineChartData={rcsiChartData}
                  selectedCountryNames={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>
        ),
      },
      {
        title: 'Import Dependency',
        infoIcon: <CustomInfoCircle />,
        popoverInfo: FcsAccordionOperations.getMacroEconomicPopoverInfo(),
        content: (
          <div>
            {importDependencyBarChartData && (
              <>
                <LineChart data={importDependencyBarChartData} expandable small noPadding transparentBackground />
                <NoDataHint
                  lineChartData={importDependencyBarChartData}
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
                <LineChart data={balanceOfTradeData} expandable xAxisSlider small noPadding transparentBackground />
                <NoDataHint
                  lineChartData={balanceOfTradeData}
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
                <LineChart
                  title="Headline Inflation"
                  data={headlineInflationData}
                  expandable
                  xAxisSlider
                  small
                  noPadding
                  transparentBackground
                />
                <NoDataHint
                  lineChartData={headlineInflationData}
                  selectedCountryNames={selectedCountryNames}
                  isLoading={isLoading}
                />
              </>
            )}
            {foodInflationData && (
              <>
                <LineChart
                  title="Food Inflation"
                  data={foodInflationData}
                  expandable
                  xAxisSlider
                  small
                  noPadding
                  transparentBackground
                />
                <NoDataHint
                  lineChartData={foodInflationData}
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

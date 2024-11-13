import CustomAccordion from '@/components/Accordions/Accordion';
import { CustomButton } from '@/components/Buttons/CustomButton';
import { LineChart } from '@/components/Charts/LineChart';
import LegendContainer from '@/components/Legend/LegendContainer';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { BalanceOfTradeGraph } from '@/domain/entities/charts/BalanceOfTradeGraph.ts';
import { CurrencyExchangeGraph } from '@/domain/entities/charts/CurrencyExchangeGraph.ts';
import { InflationGraphs } from '@/domain/entities/charts/InflationGraphs.ts';
import { LineChartData } from '@/domain/entities/charts/LineChartData.ts';
import AccordionsOperations from '@/operations/accordions/AccordionOperations';

import PopupPreview from './PopupPreview';

/**
 * You can use this page to try and show off your components.
 * It's not accessible from the UI, but you can reach it by manually navigating to /elements
 */
export default async function Elements() {
  const simpleAndSmallLineChartData: LineChartData = {
    type: 'LineChartData',
    xAxisType: 'linear',
    lines: [
      {
        name: 'Category A',
        dataPoints: [
          { x: '0', y: 1 },
          { x: '1', y: 2 },
          { x: '2', y: 4 },
          { x: '3', y: 4 },
        ],
      },
    ],
  };

  const simpleLineChartData: LineChartData = {
    type: 'LineChartData',
    xAxisType: 'linear',
    yAxisLabel: 'yield',
    roundLines: true,
    lines: [
      {
        name: 'Category A',
        dataPoints: [
          { x: '0', y: 1 },
          { x: '1', y: 2 },
          { x: '2', y: 4 },
          { x: '3', y: 8 },
        ],
      },
    ],
  };

  const maxedOutLineChartData: LineChartData = {
    type: 'LineChartData',
    xAxisType: 'linear',
    yAxisLabel: 'yield',
    lines: [
      {
        name: 'Category A',
        showRange: true,
        dataPoints: [
          { x: '0', y: 1, yRangeMin: 0, yRangeMax: 2 },
          { x: '1', y: 3, yRangeMin: 2, yRangeMax: 4 },
          { x: '2', y: 4, yRangeMin: 3.5, yRangeMax: 4.5 },
          { x: '3', y: 8, yRangeMin: 7.5, yRangeMax: 8.5 },
        ],
      },
      {
        name: 'Category B',
        dataPoints: [
          { x: '0', y: 4 },
          { x: '1', y: 7 },
          { x: '2', y: 5 },
          { x: '3', y: 2 },
        ],
      },
      {
        name: 'Category C',
        dataPoints: [
          { x: '0', y: 7 },
          { x: '1', y: 2 },
          { x: '2', y: 3 },
          { x: '3', y: 3 },
        ],
      },
    ],
  };

  const balanceOfTradeGraphData: BalanceOfTradeGraph = {
    type: 'BalanceOfTradeGraph',
    data: [
      {
        x: '2023-10-01',
        y: -5345789,
      },
      {
        x: '2023-12-01',
        y: -1235478,
      },
      {
        x: '2024-02-01',
        y: 690234,
      },
      {
        x: '2024-04-01',
        y: 3945574,
      },
    ],
  };

  const currencyExchangeGraphData: CurrencyExchangeGraph = {
    type: 'CurrencyExchangeGraph',
    name: 'Exchange Rate (USD/NGN)',
    source: '',
    updated: '',
    data: [
      {
        x: '2023-10-01',
        y: 1.421234,
      },
      {
        x: '2023-12-01',
        y: 1.597552,
      },
      {
        x: '2024-02-01',
        y: 1.687564,
      },
      {
        x: '2024-04-01',
        y: 1.665345,
      },
    ],
  };

  const inflationGraphsData: InflationGraphs = {
    type: 'InflationGraphs',
    headline: {
      data: [
        {
          x: '2023-10-01',
          y: 26.2,
        },
        {
          x: '2023-12-01',
          y: 30.2,
        },
        {
          x: '2024-02-01',
          y: 37.1,
        },
        {
          x: '2024-04-01',
          y: 37.9,
        },
      ],
    },
    food: {
      data: [
        {
          x: '2023-10-01',
          y: 25.2,
        },
        {
          x: '2023-12-01',
          y: 29.2,
        },
        {
          x: '2024-02-01',
          y: 36.1,
        },
        {
          x: '2024-04-01',
          y: 36.9,
        },
      ],
    },
  };

  const legendItems = [
    {
      title: 'Hunger alerts',
      tooltipInfo: 'Information regarding this legend',
      records: [
        {
          color: 'warning',
          label: 'Hunger',
        },
        {
          color: 'danger',
          label: 'Severe Hunger',
        },
      ],
    },
    {
      startColor: 'warning',
      endColor: 'danger',
      title: 'Prevalence of insufficient food consumption',
      startLabel: '0%',
      endLabel: '100%',
      tooltipInfo: 'Information regarding this legend',
    },
  ];

  const tooltipTestBox = (
    <div className="w-full h-fit flex flex-row flex-wrap gap-10 justify-around px-8 pt-40 pb-16 border-b border-gray-800">
      <Tooltip text="Lorem ipsum dolor">
        <div className="border-1 p-2">simple tooltip</div>
      </Tooltip>
      <Tooltip
        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod."
        title="Lorem ipsum dolor sit ame"
      >
        <div className="border-1 p-2">
          <p>tooltip with</p>
          title
        </div>
      </Tooltip>
      <Tooltip text="Dolore magna aliquyam erat, sed diam voluptua." warning>
        <div className="border-1 p-2">tooltip and warning</div>
      </Tooltip>
      <Tooltip
        text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
        title="dolore magna aliquyam erat"
        warning
      >
        <div className="border-1 p-2">maxed out tooltip</div>
      </Tooltip>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <CustomButton variant="solid">Test</CustomButton>
      <CustomButton variant="bordered">Test</CustomButton>
      <CustomButton variant="flat">Test</CustomButton>
      <CustomAccordion items={AccordionsOperations.getAccordionData()} />
      <div className="w-full h-fit flex flex-row flex-wrap gap-10 justify-around px-8 pt-40 pb-16 border-b border-gray-800">
        <div className="w-250px h-fit">
          <LineChart data={simpleAndSmallLineChartData} small />
        </div>
        <div className="w-250px h-fit">
          <LineChart
            title="Small Rounded Line Chart"
            description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
            data={simpleLineChartData}
            expandable
            small
          />
        </div>
        <div className="w-400px h-fit">
          <LineChart
            title="Maxed Out Line Chart"
            description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
            data={maxedOutLineChartData}
            expandable
          />
        </div>
        <div className="w-400px h-fit">
          <LineChart title="Balance of trade" data={balanceOfTradeGraphData} expandable />
        </div>
        <div className="w-400px h-fit">
          <LineChart title="Currency exchange" data={currencyExchangeGraphData} expandable />
        </div>
        <div className="w-400px h-fit">
          <LineChart title="Headline and food inflation" data={inflationGraphsData} expandable />
        </div>
      </div>
      <LegendContainer items={legendItems} />
      {tooltipTestBox}
      <PopupPreview />
    </div>
  );
}

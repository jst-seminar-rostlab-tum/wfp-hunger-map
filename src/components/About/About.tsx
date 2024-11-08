'use client';

// 'use client' is necessary because of an unresolved bug in NextUI Table
// https://github.com/nextui-org/nextui/issues/1403#issuecomment-1678863519

import { Link } from '@nextui-org/link';
import React from 'react';

import HungerMapLiveSuperscript from '@/components/About/HungerMapLiveSuperscript';
import GroupedTable from '@/components/Table/GroupedTable';
import { GroupedTableColumns, GroupedTableData } from '@/domain/props/GroupedTableProps';

const accuracyTableColumns = [
  { columnId: 'mainColumn', label: 'Measure' },
  { columnId: 'withPast', label: 'With past data' },
  { columnId: 'FCS', label: 'FCS' },
  { columnId: 'rCSI', label: 'rCSI' },
] as GroupedTableColumns;

const accuracyTableData = [
  {
    groupKey: '1',
    groupName: (
      <>
        {' '}
        <Link href="#" size="md">
          Coefficient of determination (R²)
        </Link>{' '}
        (higher is better)
      </>
    ),
    attributeRows: [
      { withPast: true, FCS: 0.75, rCSI: 0.78 },
      { withPast: false, FCS: 0.63, rCSI: 0.73 },
    ],
  },
  {
    groupKey: '2',
    groupName: (
      <>
        <Link href="#" size="md">
          Mean Absolute Error
        </Link>{' '}
        (lower is better)
      </>
    ),
    attributeRows: [
      { withPast: true, FCS: 0.08, rCSI: 0.06 },
      { withPast: false, FCS: 0.09, rCSI: 0.07 },
    ],
  },
] as GroupedTableData;

export function About() {
  return (
    <main className="flex flex-col gap-6 lg:gap-10 p-5">
      <h1>
        About <HungerMapLiveSuperscript />
      </h1>
      <section>
        <p>
          <b>
            <HungerMapLiveSuperscript /> is the World Food Programme (WFP)’s global hunger monitoring system.
          </b>{' '}
          It combines key metrics from various data sources – such as food security information, weather, population
          size, conflict, hazards, nutrition information and macro-economic data – to help assess, monitor and predict
          the magnitude and severity of hunger in near real-time. The resulting analysis is displayed on an interactive
          map that helps WFP staff, key decision makers and the broader humanitarian community to make more informed and
          timely decisions relating to food security.
        </p>
        <p>
          The platform covers 94 countries, including countries where WFP has operations as well as most{' '}
          <Link
            isExternal
            size="lg"
            underline="hover"
            href="https://datahelpdesk.worldbank.org/knowledgebase/articles/906519-world-bank-country-and-lending-groups"
            className="inline"
          >
            lower and lower-middle income countries
          </Link>{' '}
          (as classified by the World Bank). For any questions, comments, or if you would like further information,
          please get in touch by sending an email to{' '}
          <Link isExternal size="lg" underline="hover" href="mailto:wfp.mvam@wfp.org" className="inline">
            wfp.mvam@wfp.org
          </Link>
          .
        </p>
      </section>
      <section>
        <GroupedTable
          columns={accuracyTableColumns}
          data={accuracyTableData}
          ariaLabel="Performance measures of the prediction algorithms"
        />
      </section>
    </main>
  );
}

export default About;

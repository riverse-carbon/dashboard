import Head from 'next/head';
import { useState } from 'react';

import getFilters from 'components/db/getFilters';
import WidgetWrapper from 'components/widgets/WidgetWrapper';
import Filters from 'components/widgets/Filters';
import WidgetsGrid from 'components/WidgetsGrid';
import Projects from 'components/widgets/Projects';

import type { AppliedFilters, Filter } from 'components/types/filters';

// TODO:
// 1. get new filters
// 2. get data corresponding to filters

type PagePropsType = {
  filtersData: Filter[];
};

// 8 columns 2 rows
const gridTemplateAreas = {
  all: '"pr pr pr pr pr pr fltr fltr"',
};

export default function Home({ filtersData }: PagePropsType): JSX.Element {
  const [appliedFilters, setAppliedFilters] = useState({} as AppliedFilters);

  return (
    <>
      <Head>
        <title>Riverse projects</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <WidgetsGrid gridTemplateAreas={gridTemplateAreas}>
        <>
          <WidgetWrapper areaName='pr'>
            <Projects withFilters={true} appliedFilters={appliedFilters} />
          </WidgetWrapper>
          <WidgetWrapper areaName='fltr'>
            <Filters data={filtersData} setFilters={setAppliedFilters} appliedFilters={appliedFilters} />
          </WidgetWrapper>
        </>
      </WidgetsGrid>
    </>
  );
}

export async function getStaticProps() {
  const filtersArray = ['sectors', 'mechanism', 'country'];

  const data = await getFilters(process.env.AIRTABLE_API_KEY, process.env.AIRTABLE_PROJECTS_VIEW, filtersArray);

  const staticFilters = [
    {
      name: 'years',
      label: 'Vintage year',
      values: [2021, 2022, 2023, 2024, 2025, 2026],
    },
  ];

  return {
    props: {
      filtersData: [...data, ...staticFilters],
    },
    revalidate: 860,
  };

  // Example
  // [
  //   {
  //     name: 'sectors',
  //     values: [
  //       'Waste',
  //       'Agriculture',
  //       'Mobility & transport',
  //       'Construction & housing',
  //       'Industry',
  //       'Energy'
  //     ],
  //     label: 'Sectors'
  //   },
  //   {
  //     name: 'mechanism',
  //     values: ['Avoidance', 'Reduction', 'Removal'],
  //     label: 'Mechanism'
  //   },
  //   {
  //     name: 'country',
  //     values: ['France', 'Belgium', 'United Kingdom'],
  //     label: 'Country'
  //   }
  // ]
}

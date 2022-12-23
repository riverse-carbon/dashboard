import Head from 'next/head';

import getFilters from 'components/db/getFilters';

import { useState } from 'react';
import ProjectsWithFilters from 'components/ProjectsWithFilters';
import WidgetWrapper from 'components/widgets/WidgetWrapper';
import Filters from 'components/Filters.widget';
import WidgetsGrid from 'components/WidgetsGrid';

// TODO:
// 1. get filters!!!

type FilterType = {
  name: string;
  label: string;
  values: string[] | number[];
};

type PagePropsType = {
  filtersData: FilterType[];
};

// 8 columns 2 rows
const gridTemplateAreas = {
  all: '"pr pr pr pr pr pr fltr fltr"',
};

export default function Home({ filtersData }: PagePropsType): JSX.Element {
  const [appliedFilters, setAppliedFilters] = useState({});

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
            <ProjectsWithFilters appliedFilters={appliedFilters} />
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

  const data = await getFilters(process.env.API_KEY, process.env.DB_VIEW, filtersArray);

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
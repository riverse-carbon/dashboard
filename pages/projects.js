import Head from 'next/head'
import { createContext } from 'react'
import styles from '../styles/Projects.page.module.css'
import widgetStyles from '../styles/WidgetStyles.module.css'
import ProjectsWithFilters from '../components/ProjectsWithFilters'
import WidgetWrapper from '../components/WidgetWrapper'
import TotalCreditsWidget from '../components/TotalCredits.widget'

// TODO:
export const FiltersData = createContext([])

export default function Home ({ filtersData, test }) {
  return (
    <>
      <Head>
        <title>Riverse projects</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main
        className={`${widgetStyles['widgets-wrapper']} main-container ${styles['project-page']}`}
      >
        <FiltersData.Provider value={filtersData}>
          <WidgetWrapper columns={3} areaName='projects'>
            <ProjectsWithFilters />
          </WidgetWrapper>
        </FiltersData.Provider>
        <WidgetWrapper columns={1} areaName='credits'>
          <TotalCreditsWidget />
        </WidgetWrapper>
      </main>
    </>
  )
}

export async function getStaticProps () {
  const filtersArray = ['sectors', 'mechanism', 'country']
  const URL =
    (process.env.AUTH0_BASE_URL || process.env.NEXT_PUBLIC_AUTH0_BASE_URL) +
    '/api/protected/getAllFilters'
  const res = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ filters: filtersArray })
  })
  const test = await res.json()

  const filtersData = test.data.map(filter => {
    filter.label = filter.name.charAt(0).toUpperCase() + filter.name.slice(1)
    return filter
  })

  return {
    props: {
      filtersData
    }
  }
}

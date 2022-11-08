import Head from 'next/head'

import Airtable from 'airtable'

import { createContext } from 'react'
import styles from '../styles/Projects.page.module.css'
import widgetStyles from '../styles/WidgetStyles.module.css'
import ProjectsWithFilters from '../components/ProjectsWithFilters'
import WidgetWrapper from '../components/WidgetWrapper'
import TotalCreditsWidget from '../components/TotalCredits.widget'

// TODO:
// 1. get filters!!!

export const FiltersData = createContext([])

export default function Home ({ filtersData }) {
  return (
    <>
      <Head>
        <title>Riverse projects</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main
        className={`${widgetStyles['widgets-wrapper']} main-container ${styles.page}`}
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

  const dataSets = {}
  filtersArray.forEach(filter => {
    dataSets[filter] = new Set()
  })

  const getFilters = () => {
    const data = []
    // Connect to db
    const base = new Airtable({ apiKey: process.env.API_KEY }).base(
      'apptpGktGToVH41dj'
    )
    // get records

    base('tblRCb5aZpcAw36Wa')
      .select({
        view: 'Dashboard projects'
      })
      .eachPage(
        function page (records, fetchNextPage) {
          records.forEach(record => {
            const { fields } = record
            filtersArray.forEach(filter => {
              var value = fields[filter]
              if (Array.isArray(value)) {
                value.forEach(val => {
                  dataSets[filter].add(val)
                })
              } else {
                dataSets[filter].add(value)
              }
            })
          })
          fetchNextPage()
        },
        function done (err) {
          if (err) {
            throw err
          }
          if (dataSets.length === 0) return null
          const filtersData = Object.entries(dataSets).map(entry => {
            const key = entry[0]
            const values = []
            entry[1].forEach(val => {
              values.push(val)
            })
            return { name: key, values }
          })
          filtersData.forEach(filter => {
            filter.label =
              filter.name.charAt(0).toUpperCase() + filter.name.slice(1)
            data.push(filter)
          })
        }
      )
    return data
  }

  getFilters()

  return {
    props: {
      filtersData: [
        {
          name: 'sectors',
          values: [
            'Waste',
            'Agriculture',
            'Mobility & transport',
            'Construction & housing',
            'Industry',
            'Energy'
          ],
          label: 'Sectors'
        },
        {
          name: 'mechanism',
          values: ['Avoidance', 'Reduction', 'Removal'],
          label: 'Mechanism'
        },
        {
          name: 'country',
          values: ['France', 'Belgium', 'United Kingdom'],
          label: 'Country'
        }
      ]
    }
  }
}

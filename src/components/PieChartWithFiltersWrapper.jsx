import { useState } from 'react'
import PieChart from './PieChart'
import FiltersPicker from './FiltersPicker'
import styles from '../styles/Contribution.module.css'

// TODO:
// 1. add aria-controls on filters wrapper

const FILTERSLIST = [
  { label: 'Mechanism', value: 'mechanism' },
  { label: 'Sectors', value: 'sectors' },
  { label: 'Country', value: 'country' },
  { label: 'Vintage year', value: 'vintageYear' }
]
const DEFAULTCHECKED = 0

function PieChartWithFiltersWrapper ({ data }) {
  const [currentFilter, setCurrentFilter] = useState(
    FILTERSLIST[DEFAULTCHECKED]
  )
  return (
    <>
      <FiltersPicker
        filters={FILTERSLIST}
        setCurrentFilter={setCurrentFilter}
        groupName='pie-chart-filters'
        defaultValue={DEFAULTCHECKED}
        styles={styles}
      />
      <PieChart rawData={data} filter={currentFilter} />
    </>
  )
}

export default PieChartWithFiltersWrapper

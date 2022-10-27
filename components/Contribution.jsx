import styles from '../styles/Contribution.module.css'
import SdgsList from './SdgsList'
import PieChartWithFiltersWrapper from './PieChartWithFiltersWrapper'

// TODO:
// 1.check 'before useMemo article'
// 2.add logic for array of values in filter
// 3.maybe use SQL to query data in a usable format instead of
//   formatting data on client side

function Contribution ({ projects, sdgs }) {
  return (
    <div className={styles.container}>
      <h3>Contribution summary</h3>
      <div className={styles['charts-wrapper']}>
        <div className={styles['pie-chart']}>
          <PieChartWithFiltersWrapper data={projects} />
        </div>
        <div className={styles['sdgs-chart']}>
          Sdgs list
          <SdgsList projects={projects} sdgs={sdgs} />
        </div>
        <div className={styles['bar-chart']}></div>
      </div>
    </div>
  )
}

export default Contribution

import styles from '../styles/Dashboard.module.css'
import Contribution from './Contribution'
import Projects from './Projects'

import data from '../db'

// TODO:
// 1.Delete dashboard.module (a whole css file for 1 rule, what a shame)

function DashBoard ({}) {
  return (
    <div className={styles.container}>
      <Contribution projects={data.projects} sdgs={data.sdgs} />
      <Projects projects={data.projects} />
    </div>
  )
}

export default DashBoard

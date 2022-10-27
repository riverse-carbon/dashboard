import styles from '../styles/Projects.module.css'
import ProjectListView from './ProjectListView'

// TODO:

function Projects ({ projects }) {
  return (
    <div className={styles.container}>
      <h3>Contributed projects</h3>
      <div className={styles['list-wrapper']}>
        <div aria-hidden={true} className={styles['contribution-column']}>
          CO2 contribution
        </div>
        <div aria-hidden={true} className={styles['total-column']}>
          Total
        </div>
        <ul role='list' className='list'>
          {projects.map(project => (
            <ProjectListView key={project.id} project={project} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Projects

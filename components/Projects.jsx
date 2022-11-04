import styles from '../styles/Projects.module.css'
import ProjectNode from './ProjectNode'
import useSWR from 'swr'
import { useState, useEffect } from 'react'

// TODO: maxRecords?

function Projects ({ limit = '' }) {
  const fetcher = url => fetch(url).then(res => res.json())
  const API =
    process.env.NEXT_PUBLIC_AUTH0_BASE_URL +
    '/api/protected/projects?' +
    (limit ? 'limit=' + limit : '')
  const { data, error } = useSWR(API, fetcher)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    if (data && !data.error && data.data) {
      const projectsList = data.data.map(project => (
        <ProjectNode key={project.id} data={project.fields} />
      ))
      setProjects(projectsList)
    }
  }, [data])

  if (data && data.error)
    return `${data.error}. Contact us if the problem persists`
  if (error) return 'An error has occurred. Contact us if the problem persists'
  if (!data)
    return (
      <h3>
        Contributed projects
        <br />
        Loading...
      </h3>
    )

  return (
    <>
      <h3>Contributed projects</h3>
      <div className={styles['list-wrapper']}>
        <ul role='list' className='list'>
          {projects}
        </ul>
      </div>
    </>
  )
}

export default Projects

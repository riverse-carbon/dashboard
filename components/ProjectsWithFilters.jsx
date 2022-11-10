import styles from '../styles/Projects.module.css'
import ProjectNode from './ProjectWithFiltersNode'
import useSWR from 'swr'
import { useState, useEffect, useMemo } from 'react'
import Filters from './Filters'

// TODO:
// 1. maxRecords 100 is enough?
// 2. check if strict comparison is better ?

function ProjectsWithFilters ({ limit = 100 }) {
  const fetcher = url => fetch(url).then(res => res.json())
  const API = '/api/protected/projects'
  const { data, error } = useSWR(API, fetcher)
  const [projects, setProjects] = useState([])
  const [projectsFiltered, setProjectsFiltered] = useState([])
  const [appliedFilters, setAppliedFilters] = useState({})

  useMemo(() => {
    if (data && !data.error) {
      const projectsList = data.data
        .slice(0, limit)
        .map(project => <ProjectNode key={project.id} data={project.fields} />)
      setProjects(projectsList)
    }
  }, [data, limit])

  useEffect(() => {
    const filteredProjectsArray = projects.filter(project => {
      const { data } = project.props
      return Object.keys(appliedFilters).every(key => {
        if (appliedFilters[key].length === 0) {
          return true
        }
        return appliedFilters[key].some(value => {
          if (Array.isArray(data[key])) {
            return data[key].includes(value)
          }
          return data[key] === value
        })
      })
    })
    setProjectsFiltered(filteredProjectsArray)
  }, [projects, appliedFilters])

  if (data && data.error)
    return `${data.error}. Contact us if the problem persists`
  if (error) return 'An error has occurred. Contact us if the problem persists'
  if (!data)
    return (
      <h3>
        Loading <span className='visually-hidden'>all projects</span>...
      </h3>
    )

  return (
    <>
      <h3 className='visually-hidden'>All projects</h3>
      <Filters setFilters={setAppliedFilters} appliedFilters={appliedFilters} />
      <div className={styles['list-wrapper']}>
        <ul role='list' className='list'>
          {projectsFiltered.length !== 0 ? (
            projectsFiltered
          ) : (
            <h4>No project correspond to applied filters</h4>
          )}
        </ul>
      </div>
    </>
  )
}

export default ProjectsWithFilters

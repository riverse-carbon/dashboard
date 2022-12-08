import styles from '../styles/Projects.module.css'
import ProjectNode from './ProjectWithFiltersNode'
import useSWR from 'swr'
import { useState, useEffect, useMemo } from 'react'

// TODO:
// 1. maxRecords 100 is enough?
// 2. check if strict comparison is better ?

function ProjectsWithFilters ({ limit = 100, appliedFilters }) {
  const fetcher = url => fetch(url).then(res => res.json())
  const API = '/api/protected/projects'
  const { data, error } = useSWR(API, fetcher)
  const [projects, setProjects] = useState([])
  const [projectsFiltered, setProjectsFiltered] = useState([])

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
        if (key === 'priceRange') {
          const filterMin = +appliedFilters[key][0]
          const filterMax = +appliedFilters[key][1]
          const projectMin = +data[key][0]
          const projectMax = +data[key][1]

          const inRange = projectMin <= filterMax && projectMax >= filterMin
          return inRange
        }
        return appliedFilters[key].some(value => {
          if (Array.isArray(data[key])) {
            return data[key].includes(value)
          }
          return data[key] == value
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
      <h2>
        Loading <span className='visually-hidden'>all projects</span>...
      </h2>
    )

  return (
    <>
      <h2>Available carbon credits</h2>
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

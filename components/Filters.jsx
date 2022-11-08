import { HtmlContext } from 'next/dist/shared/lib/html-context'
import { useContext, useMemo, useState, useEffect } from 'react'
import { FiltersData } from '../pages/projects'
import styles from '../styles/Filters.module.css'

// TODO:
// 1. Check a11y and add aria-expanded

const MultiselectFilter = ({
  filterObject,
  setFilterValues,
  appliedFilters = []
}) => {
  const { label, name, values } = filterObject

  const handleChange = e => {
    var checked = e.target.checked
    var value = e.target.value
    var updatedValues = [...appliedFilters]
    if (checked) {
      updatedValues.push(value)
      setFilterValues(name, updatedValues)
    }
    if (!checked) {
      const withoutExcludedValue = updatedValues.filter(val => val !== value)
      setFilterValues(name, withoutExcludedValue)
    }
  }

  const buttons = values.map(value => (
    <div key={value} className={styles['checkbox-wrapper']}>
      <input
        className='visually-hidden'
        type='checkbox'
        name={name}
        value={value}
        id={`${name}-${value}`}
        onChange={handleChange}
      />
      <label htmlFor={`${name}-${value}`}>{value}</label>
    </div>
  ))
  return (
    <fieldset tabIndex={0} name={name} className={styles['filter-fieldset']}>
      <legend>{label}:</legend>
      <div className={styles['values-wrapper']}>{buttons}</div>
    </fieldset>
  )
}

const Filters = ({ setFilters, appliedFilters }) => {
  const filters = useContext(FiltersData)
  const [filtersComponents, setFiltersComponents] = useState([])

  const handleFiltersToggle = e => {
    const expanded = e.target.getAttribute('aria-expanded')
    if (expanded === 'true') {
      e.target.setAttribute('aria-expanded', 'false')
    } else {
      e.target.setAttribute('aria-expanded', 'true')
    }
  }

  useEffect(() => {
    const handleFilterChange = (filter, values) => {
      setFilters({ ...appliedFilters, [filter]: values })
    }
    if (filters.length !== 0) {
      const filtersComponentsArray = filters.map(filter => {
        return (
          <MultiselectFilter
            key={filter.name}
            filterObject={filter}
            appliedFilters={appliedFilters[filter.name]}
            setFilterValues={handleFilterChange}
          />
        )
      })
      setFiltersComponents(filtersComponentsArray)
    }
  }, [filters, appliedFilters, setFilters])

  if (filters.length === 0) {
    return <></>
  }
  return (
    <div className={styles['filters-wrapper']}>
      <button
        className={styles['toggle-button']}
        onClick={handleFiltersToggle}
        aria-expanded={false}
      >
        Project Filters
        <span aria-hidden={true}>&#9660;</span>
      </button>
      <div className={styles['filters-body']}>{filtersComponents}</div>
    </div>
  )
}

export default Filters

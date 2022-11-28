import { HtmlContext } from 'next/dist/shared/lib/html-context'
import { useContext, useId, useState, useEffect } from 'react'
import { FiltersData } from '../pages/projects'
import styles from '../styles/Filters.module.css'
import FilterSVG from '../public/icons/FilterSVG'
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


// TODO:
// 1. Check a11y and add aria-expanded

const addedFilters = [
  {
    style: 'range',
    name: 'price',
    label: 'Price',
    values: [30, 120],
    valuesSign: '€',
    step: 1
  },
  {
    style: 'range',
    name: 'year',
    label: 'Vintage year',
    values: [2021, 2025],
    step: 1
  }
]


const RangeSlider = ({ filterObject }) => {
  const { label, name, values } = filterObject
  const valuesSign = filterObject.valuesSign || ''

  const labelId = useId()
  const [value, setValue] = React.useState([values[0], values[1]]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box component='fieldset'
    className={`${styles['filter-fieldset']} ${styles['fieldset--range']}`}
    sx={{ width: 300 }}>
      <legend id={labelId}>{label}:</legend>
      <div className={styles['values-wrapper']}>
      <div className={styles.labels}>
          <span>
            {values[0]}
            {valuesSign}
          </span>
          <span>
            {values[1]}
            {valuesSign}
          </span>
        </div>
      <Slider
      className={styles.slider}
        aria-labelledby={labelId}
        min={values[0]}
        max={values[1]}
        valueLabelDisplay='auto'
        value={value}
        onChange={handleChange}
        getAriaValueText={(value) => value}
      />
      </div>
    </Box>
  );
}

// const RangeFilter = ({ filterObject }) => {
//   const { label, name, values } = filterObject
//   const [currentValue, setCurrentValue] = useState(values[1])
//   const valuesSign = filterObject.valuesSign || ''
//   const step = filterObject.step || 1

//   const handleValueChange = e => {
//     setCurrentValue(e.target.value)
//   }
//   return (
//     <fieldset
//       tabIndex={0}
//       name={name}
//       className={`${styles['filter-fieldset']} ${styles['fieldset--range']}`}
//     >
//       <legend>{label}:</legend>
//       <div className={styles['values-wrapper']}>
//         <div className={styles.labels}>
//           <span>
//             {values[0]}
//             {valuesSign}
//           </span>
//           <span>
//             {currentValue}
//             {valuesSign}
//           </span>
//         </div>
//         <input
//           type='range'
//           name={name}
//           min={values[0]}
//           value={currentValue}
//           onChange={handleValueChange}
//           max={values[1]}
//           step={step}
//         />
//       </div>
//     </fieldset>
//   )
// }

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
        <FilterSVG />
        Project Filters
      </button>
      <div className={styles['filters-body']}>
        <div className='flow-spacer'>
          {addedFilters.map(filter => (
            <RangeSlider key={filter.name} filterObject={filter} />
            // <RangeFilter key={filter.name} filterObject={filter} />
          ))}
        </div>
        <div className='flow-spacer'>{filtersComponents}</div>
      </div>
    </div>
  )
}

export default Filters

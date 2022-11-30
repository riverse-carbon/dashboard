import { useId, useState, useEffect } from 'react'
import styles from '../styles/Filters.module.css'
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
    style: 'multiselect',
    name: 'year',
    label: 'Vintage year',
    values: [2021, 2022, 2023, 2024, 2025],
  }
]


const RangeSlider = ({ filterObject, setFilterValues,
  appliedFilters = [] }) => {
  const { label, name, values } = filterObject
  const valuesSign = filterObject.valuesSign || ''

  const labelId = useId()
  const [value, setValue] = useState([values[0], values[1]]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box component='fieldset'
    className={`${styles['filter-fieldset']} ${styles['fieldset--range']}`}
    sx={{ width: '100%' }}>
      <legend id={labelId} className='text-bold'>{label}:</legend>
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
      <legend className='text-bold'>{label}:</legend>
      <div className={styles['values-wrapper']}>{buttons}</div>
    </fieldset>
  )
}

const Filters = ({ setFilters, appliedFilters, data }) => {
  const filters = data

  const [filtersComponents, setFiltersComponents] = useState([])

  // const handleFiltersToggle = e => {
  //   const expanded = e.target.getAttribute('aria-expanded')
  //   if (expanded === 'true') {
  //     e.target.setAttribute('aria-expanded', 'false')
  //   } else {
  //     e.target.setAttribute('aria-expanded', 'true')
  //   }
  // }

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
      const fakeFilters = addedFilters.map(filter => {
        return (filter.style === 'range' 
        ? <RangeSlider key={filter.name} filterObject={filter} appliedFilters={appliedFilters[filter.name]}
        setFilterValues={handleFilterChange} />
        : <MultiselectFilter
        key={filter.name}
        filterObject={filter}
        appliedFilters={appliedFilters[filter.name]}
        setFilterValues={handleFilterChange}
      />
        )
      }
        )
      setFiltersComponents([...fakeFilters, ...filtersComponentsArray])
    }
  }, [filters, appliedFilters, setFilters])

  if (filters.length === 0) {
    return <></>
  }
  return (
    <>
    <h2 className={styles.title}>Filters</h2>
      <div className={`${styles.body} flow-spacer`}>
        {filtersComponents}
      </div>
    </>
  )
}

export default Filters

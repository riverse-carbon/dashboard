function FiltersPicker ({
  filters,
  setCurrentFilter,
  groupName,
  defaultValue = 0,
  styles
}) {
  function handleFilterChange (e) {
    setCurrentFilter({ label: e.target.dataset.label, value: e.target.value })
  }

  return (
    <div className={styles['filters-list']}>
      {filters.map((filter, index) => {
        return (
          <div key={filter.value} className={styles['filter-label-wrapper']}>
            <input
              id={`${groupName}-${filter.value}`}
              className='visually-hidden'
              data-label={filter.label}
              type='radio'
              name={groupName}
              value={filter.value}
              onClick={handleFilterChange}
              defaultChecked={index === defaultValue}
            ></input>
            <label htmlFor={`${groupName}-${filter.value}`}>
              {filter.label}
            </label>
          </div>
        )
      })}
    </div>
  )
}

export default FiltersPicker

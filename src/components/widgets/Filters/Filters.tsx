import { useMemo } from 'react';

import type { AppliedFilters, Filter } from 'components/types/filters';

import RangeSlider from './RangeSlider';
import MultiselectFilter from './Multiselect';

// TODO:
// 1. Check a11y

const addedFilters = [
  {
    style: 'range',
    name: 'priceRange',
    label: 'Price',
    values: [30, 120],
    valuesSign: '€',
  },
];

type FiltersProps = {
  data: Filter[];
  setFilters: (appliedFilters: AppliedFilters) => void;
  appliedFilters: AppliedFilters;
};

const Filters = ({ setFilters, appliedFilters, data }: FiltersProps) => {
  const filters = data;

  const filtersComponents = useMemo(() => {
    const handleFilterChange = (filter: string, values: (string | number)[]) => {
      setFilters({ ...appliedFilters, [filter]: values });
    };

    if (filters.length !== 0) {
      const filtersComponentsArray = filters.map(filter => {
        return (
          <MultiselectFilter
            key={filter.name}
            filterObject={filter}
            appliedFilters={appliedFilters[filter.name] || []}
            setFilterValues={handleFilterChange}
          />
        );
      });
      const fakeFilters = addedFilters.map(filter => {
        return filter.style === 'range' ? (
          <RangeSlider key={filter.name} filterObject={filter} setFilterValues={handleFilterChange} />
        ) : (
          <MultiselectFilter
            key={filter.name}
            filterObject={filter}
            appliedFilters={appliedFilters[filter.name] || []}
            setFilterValues={handleFilterChange}
          />
        );
      });
      return [...fakeFilters, ...filtersComponentsArray];
    }
  }, [filters, appliedFilters, setFilters]);

  if (filters.length === 0) {
    return <p className='text-center text-base'>Error while loading filters</p>;
  }

  return (
    <>
      <h2>Filters</h2>
      <div className='space-y-5'>{filtersComponents}</div>
    </>
  );
};

export default Filters;

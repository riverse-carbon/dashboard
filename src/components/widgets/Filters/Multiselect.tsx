import { Filter } from 'components/types/filters';
import { ChangeEventHandler } from 'react';

type MultiselectFilterProps = {
  filterObject: Filter;
  setFilterValues: (filter: string, values: (string | number)[]) => void;
  appliedFilters: (string | number)[];
};

const MultiselectFilter = ({
  filterObject,
  setFilterValues,
  appliedFilters = [],
}: MultiselectFilterProps): JSX.Element => {
  const { label, name, values } = filterObject;

  const handleChange: ChangeEventHandler = e => {
    const element = e.target as HTMLInputElement;
    const checked = element.checked;
    const value = element.value;
    const updatedValues = [...appliedFilters];

    if (checked) {
      // append value to the array of applied filters
      updatedValues.push(value);
      setFilterValues(name, updatedValues);
    }
    if (!checked) {
      // exclude value from the array of applied filters
      const withoutExcludedValue = updatedValues.filter(val => val !== value);
      setFilterValues(name, withoutExcludedValue);
    }
  };

  const buttons = values.map(value => (
    <div key={value} className='flex items-center'>
      <input
        type='checkbox'
        name={name}
        value={value}
        id={`${name}-${value}`}
        onChange={handleChange}
        className='appearance-none h-5 w-5 inline-block align-text-bottom relative rounded border-2 before:absolute before:top-1/2 disabled:opacity-40 before:left-1/2 before:w-2.5 before:h-2.5 before:overflow-hidden before:bg-transparent before:-translate-x-1/2 before:-translate-y-1/2 checked:before:bg-current'
      />
      <label className='cursor-pointer p-1' htmlFor={`${name}-${value}`}>
        {value}
      </label>
    </div>
  ));
  return (
    <fieldset tabIndex={0} name={name} className='py-2.5'>
      <legend className='text-base font-medium'>{label}:</legend>
      <div>{buttons}</div>
    </fieldset>
  );
};

export default MultiselectFilter;

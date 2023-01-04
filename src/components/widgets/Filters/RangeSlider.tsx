import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Filter } from 'components/types/filters';
import { useId, useState } from 'react';

type RangeFilter = Filter & {
  valuesSign?: string;
  values: number[];
};

type RangeSliderProps = {
  filterObject: RangeFilter;
  setFilterValues: (filter: string, values: number[]) => void;
};

const RangeSlider = ({ filterObject, setFilterValues }: RangeSliderProps) => {
  const { label, name, values } = filterObject;
  const [value, setValue] = useState([values[0]!, values[1]!]);
  const valuesSign = filterObject.valuesSign || '';
  const labelId = useId();

  const handleChange = (_event: Event, newValue: number | number[]) => {
    const valuesArray = typeof newValue === 'number' ? [newValue] : newValue;
    setFilterValues(name, valuesArray);
    setValue(valuesArray);
  };

  return (
    <Box component='fieldset' tabIndex={0} className='py-2.5'>
      <legend id={labelId} className='font-medium text-base'>
        {label}:
      </legend>
      <div>
        <div className='flex justify-between text-base font-normal'>
          <span className='block'>
            {values[0]}
            {valuesSign}
          </span>
          <span>
            {values[1]}
            {valuesSign}
          </span>
        </div>
        <Slider
          className='!mx-2.5 !w-[calc(100%_-_20px)] !text-primary'
          aria-labelledby={labelId}
          min={values[0]}
          max={values[1]}
          valueLabelDisplay='auto'
          value={value}
          onChange={handleChange}
          getAriaValueText={value => `${value}`}
        />
      </div>
    </Box>
  );
};

export default RangeSlider;

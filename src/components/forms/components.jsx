import { Formik, Field, Form, useField } from 'formik'
import formStyles from '../../styles/FormStyles.module.css'
import { useId } from 'react'

export const TextInput = ({ label, className = '', ...props }) => {
  const [field, meta] = useField(props)
  const inputId = useId()
  return (
    <div className={`${className} ${formStyles['input--text-wrapper']}`}>
      <label htmlFor={inputId}>{label}</label>
      <input
        type='text'
        className='input--text'
        id={inputId}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={`${formStyles['input--error']}`}>{meta.error}</div>
      ) : null}
    </div>
  )
}

export const SelectInput = ({ label, className, options = [], ...props }) => {
  const [field, meta] = useField(props)
  const inputId = useId()

  return (
    <div className={`${className} ${formStyles['input--select-wrapper']}`}>
      <label htmlFor={inputId}>{label}</label>
      <select {...field} id={inputId} {...props}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className={`${formStyles['input--error']}`}>{meta.error}</div>
      ) : null}
    </div>
  )
}

import { Formik, Field, Form, useField } from 'formik'

 export const TextInput = ({ label, className = '', ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className={className + ' input--text-wrapper'}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className='input--text' {...field} {...props} />
      {meta.touched && meta.error ?
        (<div className='input--error'>{meta.error}</div>)  
        :null
    }
    </div>
  )
}

export const SelectInput = ({ label, className, ...props}) => {
  const [field, meta] = useField(props)
  return (
    <div className={className + ' input--select-wrapper'}>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error
      ? (<div className='input--error'>{meta.error}</div>)
      : null}
    </div>
  )
}
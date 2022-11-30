
import { Formik, Field, Form } from 'formik'
import { TextInput, SelectInput} from './components'
import * as Yup from 'yup'
import axios from 'axios'
import formStyles from '../../styles/FormStyles.module.css'

export const AddNewUsersForm = ({ rolesList=['buyer','viewer'], styles='', revalidate =() => {} }) => {
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          role: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          role: Yup.string()
            .oneOf(
              rolesList,'Invalid role'
              )
            .required('Required')
        })}
        onSubmit={async (values, { setSubmitting}) => {
          try {
            const api = '/api/protected/create-new-user'
            const res = await axios.post(api, values)
          } catch (err) {
            alert(err.message && err.response?.data?.error)
          } finally {
            revalidate()
            setSubmitting(false)
          }
        }}
        >
          {({isSubmitting}) => (<Form className={`${formStyles['add-new-user']} ${styles}`}>
            
          <TextInput 
            label='Email'
            name='email'
            type='text'
            placeholder='jeandujardin@gmail.com'
            className={styles['input-wrapper'] || ''} />

          <SelectInput 
            label='Role'
            name='role'
            className={styles['select-wrapper'] || ''}>
              <option value=''>Select Role</option>
              {rolesList.map(role => (<option key={role} value={role}>{role}</option>))}
            </SelectInput>

            <button type='submit' disabled={isSubmitting} >{isSubmitting? 'Loading...' : 'Add user'}</button>

            </Form>
          )}
        </Formik>
    </>
  )
}

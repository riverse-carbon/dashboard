
import { Formik, Field, Form } from 'formik'
import { TextInput, SelectInput} from './components'
import * as Yup from 'yup'



export const AddNewUsersForm = ({ orgId='', rolesList=['buyer','viewer'], styles='' }) => {
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          role: '',
          orgId: orgId,
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          role: Yup.string()
            .oneOf(
              rolesList,'Invalid role'
              )
            .required('Required'),
          orgId: Yup.string()
              .required('Required')
        })}
        onSubmit={async (values) => {
          const method = 'POST'
          const api = '/api/protected/create-new-user'
          await fetch(api, {method, body: values})
        }}
        >
          <Form>
            
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

            <button type='submit'>Add users</button>

            </Form>
        </Formik>
    </>
  )
}

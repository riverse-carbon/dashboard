import { Formik, Field, Form } from 'formik'
import { TextInput, SelectInput } from './components'
import * as Yup from 'yup'
import axios from 'axios'
import formStyles from '../../styles/FormStyles.module.css'
import { useState } from 'react'
import { useCart } from './cart'

export const AddNewUsersForm = ({
  rolesList = ['buyer', 'viewer'],
  styles = '',
  revalidate = () => {}
}) => {
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          role: ''
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          role: Yup.string()
            .oneOf(rolesList, 'Invalid role')
            .required('Required')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const api = '/api/protected/create-new-user'
            await axios.post(api, values)
          } catch (err) {
            alert(err.message && err.response?.data?.error)
          } finally {
            revalidate()
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={`${formStyles['add-new-user']} ${styles}`}>
            <TextInput
              label='Email'
              name='email'
              type='text'
              placeholder='jeandujardin@gmail.com'
              className={styles['input-wrapper'] || ''}
            />

            <SelectInput
              label='Role'
              name='role'
              className={styles['select-wrapper'] || ''}
              options={rolesList}
            ></SelectInput>

            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Loading...' : 'Add user'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

// TODO: pass max credits and vintage years to validator from project data
export const CreditsTransaction = ({
  transactionTypes = ['purchase', 'transfer'],
  project,
  projectId,
  styles = '',
  addToProject
}) => {
  const { years, pricesPerYear, creditsPerYear } = project
  const mechanismList = ['sequestration', 'avoidance']

  const [currentYearPrice, setCurrentYearPrice] = useState(pricesPerYear[0])
  const [currentYearMaxCredits, setCurrentYearMaxCredits] = useState(
    pricesPerYear[0]
  )

  // const { addToCart } = useCart()

  // const handleTransactionAdd = async values => {

  //   const total = currentYearPrice * values.credits
  //   addToCart({ ...values, currentYearPrice, total, transactionId })
  // }

  return (
    <>
      <Formik
        initialValues={{
          projectId: [projectId],
          actionType: 'purchase',
          credits: '',
          mechanism: mechanismList[0],
          year: years[0]
        }}
        validationSchema={Yup.object({
          actionType: Yup.string()
            .oneOf(transactionTypes, 'Invalid transaction type')
            .required('Required'),
          credits: Yup.number()
            .positive('at least 1')
            .integer('integers only')
            .required('Required'),
          mechanism: Yup.string().oneOf(mechanismList).required('Required'),
          year: Yup.string().oneOf(years).required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          const total = currentYearPrice * values.credits
          addToProject({ ...values, currentYearPrice, total })
          // addToCart({ ...values, currentYearPrice, total, transactionId })
          setSubmitting(false)
          // try {
          //   await handleTransactionAdd(values)
          // } catch (err) {
          //   alert(err.message && err.response?.data?.error)
          // } finally {
          //   setSubmitting(false)
          // }
        }}
      >
        {({ handleChange, values }) => (
          <Form className={`${formStyles['add-new-user']} ${styles}`}>
            <SelectInput
              label='Mechanism'
              name='mechanism'
              className={styles['select-wrapper'] || 'select-wrapper'}
              options={mechanismList}
            />
            <SelectInput
              label='Vintage year'
              name='year'
              className={styles['select-wrapper'] || 'select-wrapper'}
              options={years}
              onChange={e => {
                handleChange(e)
                const value = e.target.value
                const index = years.findIndex(year => year == value)
                setCurrentYearMaxCredits(creditsPerYear[index])
                setCurrentYearPrice(pricesPerYear[index])
              }}
            />
            <TextInput
              label='Credits'
              name='credits'
              type='number'
              inputMode='numeric'
              placeholder='000'
              min={1}
              max={currentYearMaxCredits}
              className={styles['input-wrapper'] || 'input-wrapper'}
            />
            <button type='submit'>
              Add<span className='visually-hidden'>to project cart</span>
            </button>
            <span className='block'>
              Price per 1CC <span>{currentYearPrice}€</span>
            </span>
            <span className='block'>
              Available credits <span>{currentYearMaxCredits}</span>
            </span>
            <span className='block'>
              Total <span>{(values.credits || 0) * currentYearPrice}€</span>
            </span>
          </Form>
        )}
      </Formik>
    </>
  )
}
// status(Pending,Validated,Cancelled), actionType(purchase,transfer) project credits vintage mechanism comment(?) buyer inventory(?should come from other fields?)

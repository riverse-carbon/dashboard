import { useState, useEffect, useContext } from 'react';

import CarbonCreditsSVG from '../../public/icons/CarbonCreditsSVG';
import InformationSVG from '../../public/icons/InformationSVG';
import styles from 'styles/BuyCreditsWidget.module.css';

import { DialogCallback } from './ModalDialog';

// TODO:
// 1. replace fake data
// 2. get description to credits
// 3. price? rcc/ccc? issue year? available credits?
// 4. what is 'total CO2' = credits*1tonneCO2
// 5.change total cost title
// 6. control input data (integers only, >=0 && <= maxCredits). useRef to control both input and buttons!

// TODO: callbackOnClose (don't show confirmation window next time)
const BuyCreditsWidget = ({ project }) => {
  const { tagline, name, 'CCC - Total': ccc, 'RCC - Total': rcc } = project
  const price = project.price || 50

  // const dialogObject = useContext(DialogCallback)

  const buyCreditInfoByType = {
    sequestration: {
      name: 'sequestration',
      totalCO: ccc || 0,
      creditsAvailable: 100 || 0,
      totalLabel: 'Total CO2 sequestrated',
      nameLabel: 'CO2 Sequestration',
      vintageYears: [2022, 2023, 2024, 2025, 2026]
    },
    avoidance: {
      name: 'avoidance',
      totalCO: rcc || 0,
      creditsAvailable: 100 || 0,
      totalLabel: 'Total CO2 avoided',
      nameLabel: 'CO2 Avoidance',
      vintageYears: [2022, 2023, 2024, 2025, 2026]
    }
  }

  const [ showConfirmationWidget, setShowConfirmationWidget ] = useState(false)

  const [ formInputs, setFormInputs ] = useState({tagline: tagline || '', name: name || '', creditType: 'sequestration', creditsPurchased: 0, price: price, vintageYear: 0})
  // const totalToPay = {formInputs} try object destructuring
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setTotalPrice(price*formInputs.creditsPurchased)
  }, [price, formInputs.creditsPurchased])

  const updateFormInput = (inputName, inputValue) => {
    setFormInputs({...formInputs, [inputName]: inputValue})

  }

  const resetState = () => {
    setShowConfirmationWidget(false)
    setFormInputs({tagline: tagline || '', name: name || '', creditType: 'sequestration', creditsPurchased: 0, price: price, vintageYear: 0})
  }


  const handleCCNumberChange = e => {
    var newValue = e.target.valueAsNumber
    var maxValue = e.target.max
    var minValue = e.target.min
    if (Number.isNaN(newValue)) {
      updateFormInput('creditsPurchased', minValue)
      return
    } else if (newValue < minValue) {
      newValue = minValue
    } else if (newValue > maxValue) {
      newValue = maxValue
    }
    updateFormInput('creditsPurchased', newValue)
  }

  // TODO: popup with info: 'max credits available', 'wrong symbol', ...
  // put logic to a proper function
  const handleButtonClick = e => {
    var newValue = +e.target.value + formInputs.creditsPurchased
    var maxValue = buyCreditInfoByType[formInputs.creditType].creditsAvailable
    var minValue = 0
    if (Number.isNaN(newValue)) {
    updateFormInput('creditsPurchased', minValue)
      return
    } else if (newValue < minValue) {
      newValue = minValue
    } else if (newValue > maxValue) {
      newValue = maxValue
    }
    updateFormInput('creditsPurchased', newValue)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    setShowConfirmationWidget(true)
  }

  return (
    <div className={`${styles['widget-wrapper']} ${styles['text-bold']}`}>
      {showConfirmationWidget? <ConfirmationWidget transactionInfo={formInputs} totalPrice={totalPrice} cancelPurchase={() => setShowConfirmationWidget(false)} resetInputs={resetState} /> :
      <>
      <div className={`${styles.title}`}>
        <CarbonCreditsSVG />
        <div>
          <h2>Buy carbon credits</h2>
          <p className={styles.subtitle}>
            <span className='block'>
              <span>
                Project:{' '}
                <span className={`${styles['text-normal']}`}>{tagline}</span>
              </span>
            </span>
            <span className='block'>
              <span>
                Developer:{' '}
                <span className={`${styles['text-normal']}`}>{name}</span>
              </span>
            </span>
          </p>
        </div>
      </div>
      <div className={styles.body}>
        <form
          // TOCHECK: leave onSubmit only or can we mix both approaches
          // (noJS action/method and withJS onSubmit)?
          id='buy-credits-form'
          onSubmit={handleFormSubmit}
        ></form>
        <RadioFieldSet
            updateInput={updateFormInput}
          sequestration={buyCreditInfoByType.sequestration}
          avoidance={buyCreditInfoByType.avoidance}
        />
        <div
          className={`${styles['tab-content-wrapper']} flow-spacer spacer-xs`}
        >
          <p className={styles['total-wrapper']}>
            <span>{buyCreditInfoByType[formInputs.creditType].totalLabel}</span>
            <span>
              {buyCreditInfoByType[formInputs.creditType].totalCO}
              <span className={`${styles['text-normal']}`}> tCO2</span>
            </span>
          </p>
          <p className={styles['available-wrapper']}>
            <span>Carbon credits available</span>
            <span>{buyCreditInfoByType[formInputs.creditType].creditsAvailable}</span>
          </p>
          <p className={styles['price-wrapper']}>
            <span>Price</span>
            <span>{formInputs.price}€</span>
          </p>
          <p>
            <span>Vintage year</span>
            <VintageYearSelect
            updateInput={updateFormInput}
              years={buyCreditInfoByType[formInputs.creditType].vintageYears}
            />
          </p>
          <div className={styles['add-input-wrapper']}>
            <label htmlFor='add-cc-input'>Add Carbon Credits</label>
            <div className={styles['controls-wrapper']}>
              <button
                className={styles['plus-button']}
                onClick={handleButtonClick}
                value='1'
              >
                <span aria-hidden='true'>+</span>
                <span className='visually-hidden'>Add 1 credit</span>
              </button>
              <button
                className={styles['minus-button']}
                onClick={handleButtonClick}
                value='-1'
              >
                <span aria-hidden='true'>-</span>
                <span className='visually-hidden'>Remove 1 credit</span>
              </button>
              <input
                className={`${styles['cc-input']} ${styles['text-normal']}`}
                type='number'
                id='add-cc-input'
                name='cc-number'
                inputMode='numeric'
                pattern='[0-9]+'
                onChange={handleCCNumberChange}
                value={formInputs.creditsPurchased}
                min={0}
                max={buyCreditInfoByType[formInputs.creditType].creditsAvailable}
              />
            </div>
          </div>
          <button
            className={`${styles.submit}`}
            type='submit'
            form='buy-credits-form'
          >
            Start transaction
          </button>
          <p className={styles['purchase-total-wrapper']}>
            <span title='Riverse service fee: 10% of the carbon credit price is collected by Riverse to continue its work on eco-sustainability projects.'>
              Total cost
              <InformationSVG />
            </span>
            <span className={styles['text-normal']}>
              {totalPrice}€
            </span>
          </p>
        </div>
      </div>
      </>
      }
    </div>
  )
}

// const CreditsDetailed = ({ data }) => {
//   const credits = data.map(credit => (
//     <p key={credit.name} className={styles['credit']}>
//       <span
//         className={styles['credit-name']}
//         title={getCreditTypeDescription(credit.name)}
//       >
//         {credit.name}
//         <InformationSVG />
//       </span>
//       <span className={styles['credit-value']}>{credit.amount}</span>
//     </p>
//   ))
//   return <div className={styles['credits-wrapper']}>{credits}</div>
// }

const VintageYearSelect = ({ years, updateInput }) => {
  const options = years.map(year => (
    <option key={year} value={year}>
      {year}
    </option>
  ))
  useEffect(() => {
    updateInput('vintageYear', years[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    updateInput('vintageYear', e.target.value)
  }
  return <select className={styles['vintage-year-select']} onChange={handleChange}>{options}</select>
}

const RadioFieldSet = ({ updateInput, sequestration, avoidance }) => {
  const handleChange = e => {
    updateInput('creditType', e.target.value)
  }

  return (
    <fieldset name='credit-type' className={styles['tabs-wrapper']}>
      <legend className='visually-hidden'>CO2 credit type</legend>
      <div className={styles['radio-label-wrapper']}>
        <input
          className='visually-hidden'
          type='radio'
          id={sequestration.name}
          value={sequestration.name}
          name='credit-type'
          onChange={handleChange}
          defaultChecked={sequestration.totalCO}
          disabled={!sequestration.totalCO}
        />
        <label htmlFor={sequestration.name}>{sequestration.nameLabel}</label>
      </div>
      <div className={styles['radio-label-wrapper']}>
        <input
          className='visually-hidden'
          type='radio'
          id={avoidance.name}
          value={avoidance.name}
          name='credit-type'
          onChange={handleChange}
          defaultChecked={!sequestration.totalCO}
          disabled={!avoidance.totalCO}
        />
        <label htmlFor={avoidance.name}>{avoidance.nameLabel}</label>
      </div>
    </fieldset>
  )
}


const ConfirmationWidget = ({ transactionInfo, totalPrice, cancelPurchase, resetInputs }) => {
  const { tagline, name, creditType, creditsPurchased, price, vintageYear} = transactionInfo


  const [ transaction, setTransaction ] = useState(null)

  const resetState = () => {
    resetInputs()
    setTransaction(null)
  }
  const handleCreditPurchase = async () => {
    const data = { projectName: name, creditType, creditsPurchased, vintageYear}
    const JSONdata = JSON.stringify(data)
    const apiUrl = '/api/protected/buy-credits'
    const options = {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata
    }

    const response = await fetch(apiUrl, options)
    const result = await response.json()
    setTransaction(result)
  }

  return (
    <div className={`${styles['text-bold']} flow-spacer ${styles['confirmation-widget']}`}>
      {transaction ? <TransactionResult  success={transaction.success} resetInputs={resetState} />
      : <>
  <h2>Your order</h2>
  <p>Project:<span className={styles['text-normal']}>{tagline}</span></p>
  <p>Developer:<span>{name}</span></p>
  <p>CO2 type:<span>{creditType}</span></p>
  <p>Carbon credits selected:<span>{creditsPurchased}</span></p>
  <p>Price:<span>{price} €</span></p>
  <p>Vintage year:<span>{vintageYear}</span></p>
  <p className={styles['confirmation--total']}>Total<span className={styles['confirmation--price-with-icon']} title='Riverse service fee: 10% of the carbon credit price is collected by Riverse to continue its work on eco-sustainability projects.'>{totalPrice} €<InformationSVG /></span></p>
  <div className={styles['confirmation--buttons-wrapper']}>
    <button className={styles['confirmation--submit']} onClick={handleCreditPurchase} >Start transaction</button>
    <button className={styles['confirmation--cancel']} onClick={cancelPurchase}>Cancel transaction</button>
  </div>
  </>  }

    </div>
  )
}

// display correct error message?
const TransactionResult = ({success, resetInputs }) => {
  const dialogCloseCallback = useContext(DialogCallback).dialogCallbackOnClose
  const handleButtonClick = () => {
    dialogCloseCallback(() => {
      resetInputs()
    })
  }
  return (
  <>
  <h2 className='text-center'>{success ? 'Successful transaction' : 'Something went wrong, please contact us if the problem persists'}</h2>
    <button onClick={handleButtonClick} className={styles['transaction--button']}>Ok</button>
  </>
  )
}

export default BuyCreditsWidget

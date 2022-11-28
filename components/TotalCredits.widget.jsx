import styles from '../styles/TotalCreditsWidget.module.css'

import CarbonCreditsSVG from '../public/icons/CarbonCreditsSVG'
import CardSVG from '../public/icons/CardSVG'
import TransferSVG from '../public/icons/TransferSVG'
import Link from 'next/link'
import InformationSVG from '../public/icons/InformationSVG'
import StatsSVG from '../public/icons/StatsSVG'

// TODO:
// 1. replace fake data
// 2. get description to credits

const fakeData = {
  credits: [
    { name: 'Ex-ante', amount: 26 },
    { name: 'Ex-post', amount: 6 },
    { name: 'Retired', amount: 10 }
  ]
}

const getCreditTypeDescription = creditName => {
  switch (creditName) {
    case 'Ex-ante':
      return 'before the event'
    case 'Ex-post':
      return 'after the event'
    case 'Retired':
      return 'already used'
  }
}

const CreditsDetailed = ({ data }) => {
  const credits = data.map(credit => (
    <p key={credit.name} className={styles['credit']}>
      <span
        className={styles['credit-name']}
        title={getCreditTypeDescription(credit.name)}
      >
        {credit.name}
        <InformationSVG />
      </span>
      <span className={styles['credit-value']}>{credit.amount}</span>
    </p>
  ))
  return <div className={styles['credits-wrapper']}>{credits}</div>
}

const TotalCreditsWidget = ({}) => {
  const totalCredits = fakeData.credits.reduce((prev, next) => {
    return (prev += next.amount)
  }, 0)
  return (
    <>
      <h2 className={styles.title}> Total credits purchased</h2>
      <div className={styles.body}>
        <p className={styles.total}>
          <span>{totalCredits}</span>

          <CarbonCreditsSVG />
        </p>
        <CreditsDetailed data={fakeData.credits} />

        <div className={styles['credits-links-wrapper']}>
          <Link href='/projects'>
            <a className='button-style link-with-icon link-with-icon--centered'>
              <CardSVG />
              Buy credits
            </a>
          </Link>
          <Link href='#'>
            <a className='button-style link-with-icon link-with-icon--centered'>
              <TransferSVG />
              Transfer credits
            </a>
          </Link>
          <Link href='#'>
            <a className='button-style link-with-icon link-with-icon--centered'>
              <StatsSVG />
              Manage credits
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default TotalCreditsWidget

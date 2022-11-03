import styles from '../styles/TotalCreditsWidget.module.css'

import CarbonCreditsSVG from '../public/icons/CarbonCreditsSVG'

const fakeData = {
  credits: [
    { name: 'Ex-ante', amount: 26 },
    { name: 'Ex-post', amount: 6 },
    { name: 'Retired', amount: 10 }
  ]
}

const TotalCreditsWidget = ({}) => {
  const totalCredits = fakeData.credits.reduce((prev, next) => {
    return (prev += next.amount)
  }, 0)
  return (
    <>
      <h3 className={styles.title}> Total credits purchased</h3>
      <div className={styles.body}>
        <p className={styles.total}>
          <span>{totalCredits}</span>

          <CarbonCreditsSVG />
        </p>
      </div>
    </>
  )
}

export default TotalCreditsWidget

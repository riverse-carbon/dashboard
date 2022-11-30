import styles from '../styles/ContributionWidget.module.css'

// TODO: replace fake data

const fakeData = {
  total: '2100'
}

const ContributionWidget = ({}) => {
  return (
    <>
      <h2 className={styles.title}>Contributed in total</h2>
      <div className={styles.body}>{fakeData.total} €</div>
    </>
  )
}

export default ContributionWidget

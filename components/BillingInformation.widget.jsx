import styles from '../styles/BillingInformation.widget.module.css'

const fakeData = {
  address: '1, place Bellecours, 69001 Lyon',
  benef: 'IBAN 120938 880312880  128...',
  name: 'Riverse SAS'
}

const BillingInformation = () => {
  const { address, benef, name } = fakeData
  return (
    <>
      <h3 className={styles.title}>Billing information</h3>
      <div>
        <div className={`${styles.body} flow-spacer`}>
          <section>
            <h4>Name</h4>
            <span>{name}</span>
          </section>
          <section>
            <h4>Bank</h4>
            <span>{benef}</span>
          </section>
          <section>
            <h4>Billing address</h4>
            <span>{address}</span>
          </section>
        </div>
      </div>
    </>
  )
}

export default BillingInformation

import styles from '../styles/BillingInformation.widget.module.css';

const BillingInformation = ({ data }) => {
  const { address, siren, vatNumber, country } = data;
  return (
    <>
      <h2 className={styles.title}>Billing information</h2>
      <div>
        <div className={`${styles.body}`}>
          <section>
            <h3>SIREN</h3>
            <span>{siren}</span>
          </section>
          <section>
            <h3>VAT number</h3>
            <span>{vatNumber}</span>
          </section>
          <section>
            <h3>Billing address</h3>
            <span>
              {address}, {country}
            </span>
          </section>
        </div>
      </div>
    </>
  );
};

export default BillingInformation;

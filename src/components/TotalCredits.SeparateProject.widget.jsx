import Link from 'next/link';
import { useContext } from 'react';

import styles from 'styles/TotalCreditsWidget.module.css';

import { CarbonCreditsSVG, CartSVG, TransferSVG, InformationSVG, StatsSVG } from 'components/icons';
import { handleModalOpen, ModalId } from './ModalDialog';

// TODO:
// 1. replace fake data
// 2. get description to credits

const fakeData = {
  credits: [
    { name: 'Ex-ante', amount: 6 },
    { name: 'Ex-post', amount: 1 },
    { name: 'Retired', amount: 3 },
  ],
};

const getCreditTypeDescription = creditName => {
  switch (creditName) {
    case 'Ex-ante':
      return 'before the event';
    case 'Ex-post':
      return 'after the event';
    case 'Retired':
      return 'already used';
  }
};

const CreditsDetailed = ({ data }) => {
  const credits = data.map(credit => (
    <p key={credit.name} className={styles['credit']}>
      <span className={styles['credit-name']} title={getCreditTypeDescription(credit.name)}>
        {credit.name}
        <InformationSVG />
      </span>
      <span className={styles['credit-value']}>{credit.amount}</span>
    </p>
  ));
  return <div className={styles['credits-wrapper']}>{credits}</div>;
};

const TotalCreditsWidget = ({}) => {
  const modalId = useContext(ModalId);
  const handleBuyCredit = () => {
    handleModalOpen(modalId);
  };
  const totalCredits = fakeData.credits.reduce((prev, next) => {
    return (prev += next.amount);
  }, 0);
  return (
    <>
      <h2 className={`${styles.title}`}>Credits</h2>
      <div className={styles.body}>
        <p className={styles.total}>
          <span>{totalCredits}</span>

          <CarbonCreditsSVG />
        </p>
        <CreditsDetailed data={fakeData.credits} />

        <div className={styles['credits-links-wrapper']}>
          <button onClick={handleBuyCredit} className='link-with-icon link-with-icon--centered'>
            <CartSVG />
            Buy credits
          </button>
          <Link href='/projects'>
            <a className='button link-with-icon link-with-icon--centered'>
              <TransferSVG />
              Transfer credits
            </a>
          </Link>
          <Link href='/projects'>
            <a className='button link-with-icon link-with-icon--centered'>
              <StatsSVG />
              Retire credits
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TotalCreditsWidget;

import { ApartmentSVG, CalendarApprovedSVG, CalendarSVG, CarbonCreditsSVG, CloudSVG, HubSVG } from 'components/icons';
import type { Transaction } from 'components/types/transactions';
import dayjs from 'dayjs';

type TransactionDetailsProps = {
  data: Omit<Transaction, 'project'>;
};

const TransactionDetails = ({ data }: TransactionDetailsProps): JSX.Element => {
  const { carbonAmount, buyer, credits, purchaseDate, type, validationDate } = data;
  return (
    <>
      <h2 className='text-xl'>Transaction details</h2>
      <div>
        <div className='grid items-center gap-2.5 grid-cols-2 px-5 py-2.5 bg-bg-secondary'>
          <span className='flex gap-2.5 items-center'>
            <CarbonCreditsSVG />
            Credits purchased:
          </span>
          <span className='font-medium'>{credits}</span>
        </div>
        <div className='grid items-center gap-2.5 grid-cols-2 px-5 py-2.5'>
          <span className='flex gap-2.5 items-center'>
            <ApartmentSVG /> Buyer name:
          </span>
          <span className='font-medium'>{buyer}</span>
        </div>
        <div className='grid items-center gap-2.5 grid-cols-2 px-5 py-2.5 bg-bg-secondary'>
          <span className='flex gap-2.5 items-center'>
            <CloudSVG />
            CO2 ordered:
          </span>
          <span className='font-medium'>{carbonAmount} t CO2</span>
        </div>
        <div className='grid items-center gap-2.5 grid-cols-2 px-5 py-2.5'>
          <span className='flex gap-2.5 items-center'>
            <HubSVG /> Type of procedure:
          </span>
          <span className='font-medium'>{type}</span>
        </div>
        <div className='grid items-center gap-2.5 grid-cols-2 px-5 py-2.5 bg-bg-secondary'>
          <span className='flex gap-2.5 items-center'>
            <CalendarSVG /> Date of purchase:
          </span>
          <span className='font-medium'>{dayjs(purchaseDate).format('D MMM YYYY')}</span>
        </div>
        <div className='grid items-center gap-2.5 grid-cols-2 px-5 py-2.5'>
          <span className='flex gap-2.5 items-center'>
            <CalendarApprovedSVG /> Date of validation:
          </span>
          <span className='font-medium'>{dayjs(validationDate).format('D MMM YYYY')}</span>
        </div>
      </div>
    </>
  );
};

export default TransactionDetails;

import type { Transaction } from 'components/types/transactions';
import Image from 'next/future/image';
import Link from 'next/link';

// TODO: replace placeholder image with a real one.
// TODO: image quality problem

type TransactionNodeProps = {
  data: Transaction;
};

const TransactionNode = ({ data }: TransactionNodeProps): JSX.Element => {
  const { carbonAmount, credits, id } = data;
  const { tagline, cover_picture: cover } = data.project;

  return (
    <Link href={`/transactions/${id}`}>
      <a className='no-underline p-2.5 sm:p-0 grid sm:grid-cols-[60px_1fr_max-content] gap-2.5 bg-bg-secondary rounded-lg'>
        <span className='relative overflow-hidden rounded-l-lg hidden sm:block'>
          <Image src={cover} alt='' fill sizes='60px' className='object-cover' />
        </span>
        <span className='sm:py-2.5'>
          <span className='block font-medium text-base mb-1'>{tagline}</span>
          <span>
            Carbon credits purchased: <span className='py-0.5 px-2.5 bg-primary-100 rounded-lg ml-2.5'>{credits}</span>
          </span>
        </span>
        <span className='flex sm:max-md:flex-col items-center sm:max-md:justify-center pr-2.5'>
          CO2 contributed
          <span className='py-0.5 px-4 bg-primary-100 rounded-lg md:ml-4 text-base'>{carbonAmount} t CO2</span>
        </span>
      </a>
    </Link>
  );
};

export default TransactionNode;

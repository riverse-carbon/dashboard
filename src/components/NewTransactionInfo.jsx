import { useCart } from './forms/cart';

const NewTransactionInfo = ({ index, mechanism, year, credits, total, handleRemove }) => {
  // const { removeFromCart } = useCart()

  // TODO: check ARIA for remove button label

  return (
    <div>
      <p>
        <span className='block'>{mechanism}</span>
        <span className='block'>{year}</span>
        <span className='block'>{credits} credits</span>
        <span className='block text-bold'>{total}€</span>
      </p>
      <button
        onClick={() => {
          handleRemove(index);
        }}>
        X<span className='visually-hidden'>Remove from cart</span>
      </button>
    </div>
  );
};

export default NewTransactionInfo;

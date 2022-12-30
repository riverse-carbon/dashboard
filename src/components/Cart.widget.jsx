import axios from 'axios';
import { useMemo } from 'react';
import useSWR from 'swr';
import styles from '../styles/Cart.module.css';
import { useCart } from './forms/cart';

// const allProjectsUrl = 'api/protected/get-cart-info'
// const fetcher = (url, projectIdList) => axios.post(url, { projectIdList })

const CartTransaction = ({ data }) => {
  const { removeFromCart } = useCart();

  const { id } = data;
  const { mechanism, year, credits } = data.fields;
  const projectId = data.fields.projectId[0];
  return (
    <>
      <li>
        <p>
          <span className='block'>{mechanism}</span>
          <span className='block'>{year}</span>
          <span className='block'>{credits} credits</span>
          {/* <span className='block text-bold'>{total}€</span> */}
        </p>
        <button
          onClick={() => {
            removeFromCart(projectId, id);
          }}>
          X<span className='sr-only'>Remove from cart</span>
        </button>
      </li>
    </>
  );
};

const CartProjectNode = ({ project }) => {
  const transactions = useMemo(
    () => project.transactions.map(transaction => <CartTransaction key={transaction.id} data={transaction} />),
    [project.transactions]
  );
  return (
    <>
      <h3>{project.projectId}</h3>
      <ul>{transactions}</ul>
    </>
  );
};

const Cart = ({}) => {
  const { cartItems, emptyCart, validateCart } = useCart();

  const nodes = cartItems.map(node => <CartProjectNode key={node.projectId} project={node} />);

  const handleDeleteAll = () => {
    emptyCart();
  };

  const handleCheckOut = async () => {
    const res = await validateCart();
  };

  // const projects = useMemo(() => {
  //   var transactionsGroupedByProject = []

  //   cartItems.forEach(transaction => {
  //     var { projectId } = transaction
  //     const projectGroup = transactionsGroupedByProject.find(
  //       project => project.id === projectId
  //     )
  //     if (!projectGroup) {
  //       transactionsGroupedByProject.push({
  //         id: projectId,
  //         transactions: [transaction]
  //       })
  //     } else {
  //       projectGroup.push(transaction)
  //     }
  //   })

  //   return transactionsGroupedByProject
  // }, [cartItems])

  // find projects by id
  // const { data, error } = useSWR(
  //   [allProjectsUrl, projects.map(project => project.id)],
  //   fetcher
  // )

  // if (error) {
  //   return (
  //     <h2 className={styles.title}>
  //       An error has occurred. Contact us if the problem persists
  //     </h2>
  //   )
  // }
  // if (!data) {
  //   return (
  //     <h2 className={styles.title}>
  //       Cart
  //       <br />
  //       Loading...
  //     </h2>
  //   )
  // }

  return (
    <>
      <h2 className={styles.title}>Cart</h2>
      <div className={styles.body}>
        <div className={`${styles['about']} flow-spacer text-bold`}>{nodes}</div>
        <button onClick={handleDeleteAll}>Delete all</button>
        <button disabled={cartItems.length < 1} onClick={handleCheckOut}>
          Check out
        </button>
      </div>
    </>
  );
};

export default Cart;

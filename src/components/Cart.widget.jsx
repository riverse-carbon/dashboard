import axios from 'axios';
import Image from 'next/future/image';
import Link from 'next/link';
import { useCallback, useMemo, useRef } from 'react';
import useSWR from 'swr';
import styles from '../styles/Cart.module.css';
import { getCart, removeFromCart, useCart } from './forms/cart';

// const allProjectsUrl = 'api/protected/get-cart-info'
// const fetcher = (url, projectIdList) => axios.post(url, { projectIdList })

const CartTransaction = ({ data }) => {
  const { id } = data;
  const { mechanism, year, credits, price } = data.fields;
  return (
    <>
      <li>
        <p>
          <span className='block'>{mechanism}</span>
          <span className='block'>{year}</span>
          <span className='block'>{credits} credits</span>
          <span className='block text-bold'>{price * credits}€</span>
        </p>
        <button
          onClick={() => {
            removeFromCart(id);
          }}>
          <span aria-hidden='true'>X</span>
          <span className='visually-hidden'>Remove from cart</span>
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

  const handleDelete = useCallback(() => {
    const idList = project.transactions.map(transaction => transaction.id);
    removeFromCart(idList);
  }, [project.transactions, removeFromCart]);

  return (
    <>
      <section>
        <div>
          <div>
            <Image src={project.cover} width='200' height='150' alt={project.name + ' workplace'} />
          </div>
          <div>
            <h3>{project.tagline}</h3>
            <p>Sectors: {project.sectors.join(', ')}</p>
            <ul>{transactions}</ul>
          </div>
          <div>
            <button data-type='delete-all' onClick={handleDelete}>
              Delete All
            </button>
            <Link href={`/projects/${project.uid}`}>Buy more credits from this project</Link>
          </div>
        </div>
      </section>
    </>
  );
};

const api = 'api/protected/get-cart-info';
const fetcher = (api, data) => axios.post(api, data).then(res => res);

const Cart = ({}) => {
  const { cartItems, emptyCart, validateCart } = useCart();

  const { data, error } = useSWR(...getCart());

  const nodesRef = useRef();

  if (data && data.error) return `${data.error}. Contact us if the problem persists`;
  if (error) return 'An error has occurred. Contact us if the problem persists';
  if (!data)
    return (
      <h2>
        Cart
        <br />
        Loading...
      </h2>
    );

  const nodes = data.data.data.map(node => <CartProjectNode key={node.id} project={node} />);

  const handleDeleteAll = () => {
    const deleteButtons = nodesRef.current.querySelectorAll(`button[data-type='delete-all']`);
    deleteButtons.forEach(button => {
      button.click();
    });
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
  // console.log(data)

  return (
    <>
      <h2 className={styles.title}>Cart</h2>
      <div className={styles.body}>
        <div ref={nodesRef} className={`${styles['about']} flow-spacer text-bold`}>
          {nodes}
        </div>
        <button onClick={handleDeleteAll}>Delete all</button>
        <button disabled={cartItems.length < 1} onClick={handleCheckOut}>
          Check out
        </button>
      </div>
    </>
  );
};

export default Cart;

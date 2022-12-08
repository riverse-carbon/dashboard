import axios from 'axios';
import { useState, useCallback, useMemo } from 'react';

import styles from 'styles/BuyCreditsWidget.module.css';
import CarbonCreditsSVG from '../../public/icons/CarbonCreditsSVG';

import { CreditsTransaction } from './forms/forms';
import { useModal } from './ModalDialog';
import NewTransactionInfo from './NewTransactionInfo';
import { useCart } from './forms/cart';

const BuyCreditsNew = ({ project, id }) => {
  const { tagline, name } = project
  // TODO: add cover image?

  const [total, setTotal] = useState(0)
  const [addedToDB, setAddedToDB] = useState(false)

  const [transactions, setTransactions] = useState([])

  const { cartItems, addToCart } = useCart()
  const { dialogCallbackOnClose } = useModal()

  const handleCancel = useCallback(() => {
    dialogCallbackOnClose()
  }, [dialogCallbackOnClose])

  const handleAddToCart = useCallback(async () => {
    try {
      const api = '/api/protected/add-to-cart'
      const res = await axios.post(api, { data: transactions })
      const { data } = res.data
      if (!data || data.length === 0) {
        throw new Error('Transaction failed')
      }
      addToCart({ projectId: id, transactions: data })
      setAddedToDB(true)
    } catch (err) {
      alert(
        'Something went wrong. please contact us at support@riverse.io . ' +
          (err.message || 'Unknown error')
      )
    }
    // const transactionId = res.data.transactionId
    // if (!transactionId) {
    //   throw new Error(
    //     'There was a problem while adding transaction to the cart'
    //   )
    // }
  }, [transactions, id, addToCart])

  const handleAddToProject = useCallback(transactionObj => {
    setTransactions(trans => [...trans, transactionObj])
  }, [])

  const handleRemoveFromProject = useCallback(index => {
    setTransactions(trans => trans.filter((transaction, i) => i !== index))
  }, [])

  const items = useMemo(() => {
    var totalCounter = 0
    const nodes = transactions.reduce((result, transaction, index) => {
      const { mechanism, year, total, credits } = transaction
      totalCounter += total
      result.push(
        <NewTransactionInfo
          key={`${mechanism}-${year}-${credits}-${totalCounter}`}
          index={index}
          mechanism={mechanism}
          year={year}
          credits={credits}
          total={total}
          handleRemove={handleRemoveFromProject}
        />
      )
      return result
    }, [])
    // return nodes
    // const nodes = cartItems.reduce((result, transaction) => {
    //   // add only transactions within this project
    //   if (transaction.projectId[0] === id) {
    //     total = total + transaction.total
    //     result.push(
    //       <NewTransactionInfo
    //         key={transaction.transactionId}
    //         id={transaction.transactionId}
    //         mechanism={transaction.mechanism}
    //         year={transaction.year}
    //         credits={transaction.credits}
    //         total={transaction.total}
    //       />
    //     )
    //   }
    //   return result
    // }, [])
    setTotal(totalCounter)
    return nodes
  }, [transactions, handleRemoveFromProject])

  return (
    <div className={`${styles['widget-wrapper']} ${styles['text-bold']}`}>
      <div className={`${styles.title}`}>
        <CarbonCreditsSVG />
        <div>
          <h2>Buy carbon credits</h2>
          <p className={styles.subtitle}>
            <span className='block'>
              <span>
                Project:{' '}
                <span className={`${styles['text-normal']}`}>{tagline}</span>
              </span>
            </span>
            <span className='block'>
              <span>
                Developer:{' '}
                <span className={`${styles['text-normal']}`}>{name}</span>
              </span>
            </span>
          </p>
        </div>
      </div>
      <div className={styles.body}>
        <div>
          <h3>Create your order</h3>
          <CreditsTransaction
            project={project}
            projectId={id}
            addToProject={handleAddToProject}
          />
        </div>
        <div>
          <h3>Your Order</h3>
          {items}
          <div className={styles.subtotal}>
            <span>Subtotal:</span> {total}€{' '}
          </div>
        </div>
        <button onClick={handleCancel} className={styles['cancel-button']}>
          Cancel
        </button>
        <button
          onClick={handleAddToCart}
          disabled={transactions.length < 1}
          className={styles['add-to-cart-button']}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default BuyCreditsNew

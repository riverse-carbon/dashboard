import styles from '../styles/Organization.module.css'
import profile1 from '../public/profile1.png'
import profile2 from '../public/profile2.png'
import profile3 from '../public/profilePlaceholder.min.png'
import ActiveUserSVG from '../public/icons/activeUserSVG'
import { useUser } from '@auth0/nextjs-auth0'

// TODO:

const Organization = ({data}) => {
  const { user } = useUser()
  const currentUserEmail = user.email || ''
  const { name, contribution, cccTotal, users } = data
  const usersHTML = users.map(user => (
    <li key={user.firstName + '-' + user.lastName} className={`${styles.user} ${user.email === currentUserEmail? styles.current : ''}`}>
        <div className={styles['user-info']}>
          <span className={styles.name}>
            {`${user.firstName} ${user.lastName} ${user.email === currentUserEmail? '(You)': ''}`}
          </span>
          <span className={styles.email}>{user.email}</span>
        </div>
      <p>{user.role}</p>
      <p className={styles['user--active']}>{user.active ? <ActiveUserSVG /> : ''}</p>
    </li>
  ))
  return (
    <>
      <h2 className={styles.title}>Organization</h2>
      <div className={styles.body}>
        <div className={`${styles['about']} flow-spacer text-bold`}>
          <h3 className={styles.name}>{name}</h3>
          <p className='flow-spacer'>
            <span className='block'>Total credits: <span className={'text-normal block ' + styles['stats']}>{cccTotal} tCO2</span></span>
            <span className='block'>Total contribution: <span className={'text-normal block ' + styles['stats']}>{contribution}€</span></span>
          </p>
        </div>
        <div className={`${styles['users-wrapper']} flow-spacer `}>
          <div className={styles['users-head']}>
            <h3>Users</h3>
            <p>Status</p>
            <p>Verified</p>
          </div>
          <ul role='list' className='list'>
            {usersHTML}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Organization

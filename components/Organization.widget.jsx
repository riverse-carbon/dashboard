import Logo from '../public/icons/LogoSVG'
import Image from 'next/future/image'
import styles from '../styles/Organization.module.css'
import profile1 from '../public/profile1.png'
import profile2 from '../public/profile2.png'
import profile3 from '../public/profilePlaceholder.min.png'

// TODO:
// 1. replace fake data

const fakeData = {
  name: 'Riverse',
  summary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  logo: <Logo />,
  users: [
    {
      firstName: 'Clement',
      lastName: 'Georget',
      email: 'clement@riverse.io',
      status: 'admin',
      settings: '',
      photo: profile1
    },
    {
      firstName: 'Anton',
      lastName: 'Begunenko',
      email: 'anton@riverse.io',
      status: 'member',
      settings: '',
      photo: profile3
    },
    {
      firstName: 'Gregoire',
      lastName: 'Guirauden',
      email: 'gregoire@riverse.io',
      status: 'member',
      settings: '',
      photo: profile2
    }
  ]
}

const Organization = () => {
  const { name, summary, logo, users } = fakeData
  const usersHTML = users.map(user => (
    <li key={user.firstName + '-' + user.lastName} className={styles.user}>
      <div className={styles['user-info-wrapper']}>
        <div className={styles['user-photo-wrapper']}>
          <Image src={user.photo} alt='' />
        </div>
        <div className={styles['user-info']}>
          <span className={styles.name}>
            {`${user.firstName} ${user.lastName}`}
          </span>
          <span className={styles.email}>{user.email}</span>
        </div>
      </div>
      <p>{user.status}</p>
    </li>
  ))
  return (
    <>
      <h3 className={styles.title}>{name}</h3>
      <div className={styles.body}>
        <div className={`${styles['about']} flow-spacer`}>
          <div className={styles['image-wrapper']}>{logo}</div>
          <p className={styles['org-summary']}>
            <span>Summary</span>
            <span>{summary}</span>
          </p>
        </div>
        <div className={`${styles['users-wrapper']} flow-spacer `}>
          <div className={styles['users-head']}>
            <h4>Users</h4>
            <p>Status</p>
            <p>Settings</p>
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

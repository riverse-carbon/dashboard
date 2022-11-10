import Image from 'next/future/image'
import Link from 'next/link'
import Project from '../pages/projects/[uid]'
import styles from '../styles/ProjectNode.module.css'

// TODO:
// 1. replace fakeData with a real one
// 2. images? Weturn has no image(pdf only), can we leave logo instead
// or add an image to airtable?
// 3. contribution-total-wrapper: place items vertically or horizontally?
// 5. contribution => available credits
// 6. price => price

const fakeData = {
  price: 50,
  contribution: 345.3
}

function ProjectNode ({ data }) {
  const { name, sectors, sdgs, tagline, 'project-desc': desc, uid } = data
  const ccAvailable = (+data['CCC - Total'] || 0) + (+data['RCC - Total'] || 0)
  // img or logo if img doesn't exist (file type is not an image)
  const img = data?.cover.length !== 0 ? data.cover[0].url : data.logo[0].url
  const { price, contribution } = fakeData

  return (
    <Link href={`/projects/${uid}`}>
      <li className={styles['project-wrapper']}>
        <div className={styles['image-wrapper']}>
          <Image src={img} alt='' fill={true} sizes='10rem' />
        </div>
        <div className={`${styles['info-wrapper']} border-radius`}>
          <div className={styles['name-wrapper']}>
            <h4>{tagline}</h4>
            {/* <h4>{name}</h4> */}
            <p>Sectors: {sectors.join(', ')}</p>
          </div>
          <div className={styles['contribution-total-wrapper']}>
            <p
              className={`${styles['contribution']} flex flex-column flex-block-center`}
            >
              <span>Available credits</span>
              <span
                className={styles['value'] + ' border-radius--small'}
              >{`${ccAvailable} tCO2`}</span>
            </p>
            <p
              className={`${styles['total']} flex flex-column flex-block-center`}
            >
              <span>Price</span>
              <span
                className={styles['value'] + ' border-radius--small'}
              >{`${price} €`}</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default ProjectNode

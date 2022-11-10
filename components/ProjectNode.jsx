import Image from 'next/future/image'
import Link from 'next/link'
import styles from '../styles/ProjectNode.module.css'

// TODO:
// 1. replace fakeData with a real one
// 2. images? Weturn has no image(pdf only), can we leave logo instead
// or add an image to airtable?
// 3. contribution-total-wrapper: place items vertically or horizontally?
// 4. delete try/catch logic
// 5. contribution => available credits
// 6. total => price

const fakeData = {
  total: 432,
  contribution: 345.3
}

function ProjectNode ({ data }) {
  // try {
  const { name, sectors, tagline, sdgs, uid, cover } = data
  // img or logo if img doesn't exist (file type is not an image)
  const img = data?.cover.length !== 0 ? data.cover[0].url : data.logo[0].url
  const { total, contribution } = fakeData

  return (
    <Link href={`/projects/${uid}`}>
      <li className={styles['project-wrapper']}>
        <div className={styles['image-wrapper']}>
          <Image src={img} alt='' fill={true} sizes='10rem' />
        </div>
        <div className={`${styles['info-wrapper']} border-radius`}>
          <div className={styles['name-wrapper']}>
            {/* <h4>{name}</h4> */}
            <h4>{tagline}</h4>
            <p>Sectors: {sectors.join(', ')}</p>
          </div>
          <div className={styles['contribution-total-wrapper']}>
            <p
              className={`${styles['contribution']} flex flex-column flex-block-center`}
            >
              <span>CO2 Contribution</span>
              <span
                className={styles['value'] + ' border-radius--small'}
              >{`${contribution} tCO2`}</span>
            </p>
            <p
              className={`${styles['total']} flex flex-column flex-block-center`}
            >
              <span>Total</span>
              <span
                className={styles['value'] + ' border-radius--small'}
              >{`${total} €`}</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
  // } catch (e) {
  //   console.error('missing info in one of the projects', e)
  // }
}

export default ProjectNode

import Image from 'next/future/image';
import Link from 'next/link';

import styles from 'styles/ProjectNode.module.css';

// TODO:
// 1. replace fakeData with a real one

function ProjectNode({ data }) {
  const { sectors, tagline, uid, name, priceRange } = data;
  const ccAvailable = (+data['CCC - Total'] || 0) + (+data['RCC - Total'] || 0);
  // img or logo if img doesn't exist (file type is not an image)
  const img = data?.cover.length !== 0 ? data.cover[0].url : data.logo[0].url;
  const price = priceRange[0] === priceRange[1] ? `${priceRange[0]} €` : `${priceRange[0]} - ${priceRange[1]} €`;

  return (
    <Link href={`/projects/${uid}`}>
      <li className={styles['project-wrapper']}>
        <div className={styles['image-wrapper']}>
          <Image src={img} alt='' fill={true} sizes='10rem' />
          <Link href={`/projects/${uid}`}>
            <a className={styles['details-link']}>
              <span>
                Details<span aria-hidden='true'> &gt;</span>
              </span>
              <span className='sr-only'> on {name} project</span>
            </a>
          </Link>
        </div>
        <div className={`${styles['info-wrapper']} border-radius`}>
          <div className={styles['name-wrapper']}>
            <h4 className={styles['tagline']}>{tagline}</h4>
            {/* <h4>{name}</h4> */}
            <p className={styles.sectors + ' text-bold'}>Sectors: {sectors.join(', ')}</p>
          </div>
          <div className={styles['contribution-total-wrapper']}>
            <p className={`${styles['contribution']} flex flex-column flex-block-center`}>
              <span>Available credits</span>
              <span className={styles['value'] + ' border-radius--small'}>{`${ccAvailable} tCO2`}</span>
            </p>
            <p className={`${styles['total']} flex flex-column flex-block-center`}>
              <span>Price</span>
              <span className={styles['value'] + ' border-radius--small'}>{`${price}`}</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default ProjectNode;

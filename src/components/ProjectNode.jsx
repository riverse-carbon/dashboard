import Image from 'next/future/image';
import Link from 'next/link';
import styles from '../styles/ProjectNode.module.css';

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
  contribution: 345.3,
};

function ProjectNode({ project }) {
  const { total, contribution } = fakeData;

  return (
    <Link href={`/projects/${project.id}`}>
      <li className={styles['project-wrapper']}>
        <div className={styles['image-wrapper']}>
          <Image src={project.cover_picture} alt='' fill={true} sizes='10rem' />
          <Link href={`/projects/${project.id}`}>
            <a className={styles['details-link']}>
              <span>
                Details<span aria-hidden='true'> &gt;</span>
              </span>
              {/* <span className='visually-hidden'> on {name} project</span> */}
            </a>
          </Link>
        </div>
        <div className={`${styles['info-wrapper']} border-radius`}>
          <div className={styles['name-wrapper']}>
            {/* <h4>{name}</h4> */}
            <h4 className={styles['tagline']}>{project.tagline}</h4>
          </div>
          <div className={styles['contribution-total-wrapper']}>
            <p className={`${styles['contribution']} flex flex-column flex-block-center`}>
              <span>Carbon credits</span>
              <span className={styles['value'] + ' border-radius--small'}>{`${contribution} tCO2`}</span>
            </p>
            <p className={`${styles['total']} flex flex-column flex-block-center`}>
              <span>Value</span>
              <span className={styles['value'] + ' border-radius--small'}>{`${total} €`}</span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
  // } catch (e) {
  //   console.error('missing info in one of the projects', e)
  // }
}

export default ProjectNode;

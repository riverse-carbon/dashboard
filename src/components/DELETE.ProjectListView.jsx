import styles from '../styles/Projects.module.css';
import Image from 'next/future/image';

// TODO:
// 1. alt attribute?

function ProjectListView({ project }) {
  return (
    <li className={styles['project-wrapper']}>
      <div className={`${styles['img-name-wrapper']} flex flex-block-center`}>
        {/* <div className={styles['img-wrapper']}> */}
        <Image src={project.img} alt='' />
        {/* </div> */}
        <div className={styles['name-wrapper']}>
          <h4>{project.name}</h4>
          <p>{project.desc}</p>
        </div>
      </div>
      <p className={`${styles['contribution']} flex flex-block-center`} aria-labelledby=''>
        <span className='visually-hidden'>CO2 Contribution is</span>
        {`${project.contribution} tCO2`}
      </p>
      <p className={`${styles['total']} flex flex-block-center`} aria-labelledby=''>
        <span className='visually-hidden'>Total is</span>
        {`${project.total} €`}
      </p>
    </li>
  );
}

export default ProjectListView;

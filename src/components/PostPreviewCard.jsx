import Image from 'next/future/image';

import styles from 'styles/Documentation.module.css';

const PostPreviewCard = ({ data }) => {
  return (
    <li className={styles.post}>
      <h4 className={styles.title}>{data.title}</h4>
      <Image src={data.thumbnail} alt='' sizes='20rem' />
      <p>{data.previewText}</p>
      <a href={data.link} target='_blank' className={`${styles['more-link']} button-style`} rel='noreferrer'>
        Read more
        <span className='visually-hidden'>about {data.title}</span>
      </a>
      {/* <div className={styles['author-date-wrapper']}>
        <p>By {data.author}</p>
        <p>{data.date}</p>
      </div> */}
    </li>
  );
};

export default PostPreviewCard;

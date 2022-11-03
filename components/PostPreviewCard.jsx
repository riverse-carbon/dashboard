import Image from 'next/future/image'
import styles from '../styles/Documentation.module.css'

const PostPreviewCard = ({ data }) => {
  return (
    <li className={styles.post}>
      <Image src={data.thumbnail} alt='' />
      <h4 className={styles.title}>{data.title}</h4>
      <a href={data.link} className={`${styles['more-link']} button-style`}>
        Read more
        <span className='visually-hidden'>about {data.previewText}</span>
      </a>
      {/* <p>{data.previewText}</p> */}
      {/* <div className={styles['author-date-wrapper']}>
        <p>By {data.author}</p>
        <p>{data.date}</p>
      </div> */}
    </li>
  )
}

export default PostPreviewCard

import Image from 'next/future/image'
import Link from 'next/link'
import CardSVG from '../public/icons/CardSVG'
import styles from '../styles/SeparateProject.widget.module.css'

// TODO:
// 1. check sizes on image attribute

const SeparateProject = ({ project }) => {
  // console.log(project)
  const cover = project.cover[0]
  const sdgs =
    project.sdgsArray &&
    project.sdgsArray.map((sdg, i) => {
      const { url, width, height } = sdg.icon
      return (
        <li className={styles.sdg} key={i}>
          <div className={styles['image-wrapper']}>
            <Image src={url} alt='' width={width} height={height} />
          </div>
          {sdg.desc}
        </li>
      )
    })

  const cccp = project.cccp.map((principle, i) => (
    <li className={styles.principle} key={i}>
      <span className={styles.counter}>0{i + 1}</span>
      <div className={styles['name-value-wrapper']}>
        <h3>{principle.name}</h3>
        <p>{principle.value}</p>
      </div>
    </li>
  ))

  // const carousel = project.carouselImg.map(img =>)
  const carousel = project.carouselImg[0]

  const keyImpact = project.keyImpact.map((impact, i) => (
    <li className={styles['impact-item']} key={i}>
      <Image
        src={impact.icon.url}
        width={impact.icon.width || 64}
        height={impact.icon.height || 64}
        alt=''
      />
      <span className={styles.figure}>{impact.figure}</span>
      <span className={styles.desc}>{impact.desc}</span>
    </li>
  ))

  return (
    <>
      <div className={`${styles.body} flow-spacer`}>
        <div className={styles.hero}>
          <Image src={cover.url} alt='' fill={true} sizes='70vw' priority />
        </div>
        <section className={`${styles.title}`}>
          {/* add tagline? */}
          <h1>{project.name}</h1>
          <p>Sector: {project.sectors.join(', ')}</p>
        </section>
        <section className={`${styles.solution} ${styles['two-cols']}`}>
          <div className={`${styles['text-wrapper']}`}>
            <h2>The solution</h2>
            <p>{project.solution}</p>
          </div>
          <div className={styles['image-wrapper']}>
            <Image src={cover.url} alt='' width='250' height='250' />
          </div>
        </section>
        <section className={styles.impact}>
          <h2>Key impact</h2>
          <ul role='list' className='list'>
            {keyImpact}
          </ul>
        </section>
        <div className={styles.slider}>
          <Image alt='' src={carousel.url} fill={true} sizes='70vw' />
        </div>
        <section className={`${styles.issue} ${styles['two-cols']}`}>
          <div className={styles['text-wrapper']}>
            <h2>The issue</h2>
            <p>{project.issue}</p>
          </div>
          <div className={styles['image-wrapper']}>
            <Image src={cover.url} alt='' width='250' height='250' />
          </div>
        </section>
        <section className={styles.sdgs}>
          <h2>Sustainable development goals</h2>
          <ul role='list' className='list'>
            {sdgs}
          </ul>
        </section>
        <section className={styles['cccp']}>
          <h2>Core carbon principles</h2>
          <ul role='list' className='list'>
            {cccp}
          </ul>
        </section>
        <section className={styles.cta}>
          <h2>CTA - to replace</h2>
          <Link href='/projects'>
            <a className='button-style link-with-icon '>
              <CardSVG />
              Buy carbon credits
            </a>
          </Link>
        </section>
      </div>
    </>
  )
}

export default SeparateProject

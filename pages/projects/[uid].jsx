import Head from 'next/head'
import getAllProjects from '../../components/db/getAllProjects'
import getProjectByUid from '../../components/db/getProjectByUid'
import SeparateProject from '../../components/SeparateProject.widget'
import TotalCredits from '../../components/TotalCredits.SeparateProject.widget'
import WidgetWrapper from '../../components/WidgetWrapper'
import styles from '../../styles/SeparateProject.page.module.css'
import widgetStyles from '../../styles/WidgetStyles.module.css'

export default function Project ({ project }) {
  if (!project)
    return (
      <main className={`main-container ${styles.page}`}>
        <h1>Loading...</h1>
      </main>
    )
  return (
    <>
      <Head>
        <title>{project.fields.name} project</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main
        className={`${widgetStyles['widgets-wrapper']} main-container ${styles.page}`}
      >
        <WidgetWrapper columns={3} areaName='project'>
          <SeparateProject project={project.fields} />
        </WidgetWrapper>
        <WidgetWrapper columns={1} areaName='credits'>
          <TotalCredits />
        </WidgetWrapper>
      </main>
    </>
  )
}

export async function getStaticPaths () {
  const projects = await getAllProjects(
    process.env.API_KEY,
    process.env.DB_VIEW
  )
  const paths = projects.map(project => ({
    params: { uid: project.fields.uid }
  }))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps ({ params }) {
  const project = await getProjectByUid(
    process.env.API_KEY,
    process.env.DB_VIEW,
    params.uid
  )

  // data restructuring
  const {
    'sdgs-description': descriptions,
    'sdgs-icons': icons,
    impactDesc,
    impactFigures,
    impactIcons,
    images
  } = project.fields

  project.fields.sdgsArray = descriptions.map((desc, i) => {
    const { url, width, height } = icons[i]

    return { icon: { url, width, height }, desc }
  })

  project.fields.keyImpact = impactDesc.map((desc, i) => ({
    desc,
    figure: impactFigures[i],
    icon: impactIcons[i]
  }))

  project.fields.carouselImg = images.filter(img =>
    img.type.startsWith('image')
  )

  project.fields.cccp = [
    {
      name: 'Measurability & reality',
      value: project.fields['cccp-measurability']
    },
    { name: 'Additionality', value: project.fields['cccp-additionality'] },
    { name: 'Permanence', value: project.fields['cccp-permanence'] },
    { name: 'Rebound effects', value: project.fields['cccp-rebound-effects'] },
    { name: 'Unicity', value: project.fields['cccp-unicity'] }
  ]

  return {
    props: {
      project
    }
  }
}

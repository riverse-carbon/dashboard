import Head from 'next/head'
import getAllProjects from '../../components/db/getAllProjects'
import getProjectByUid from '../../components/db/getProjectByUid'
import SeparateProject from '../../components/SeparateProject.widget'
import TotalCredits from '../../components/TotalCredits.SeparateProject.widget'
import WidgetWrapper from '../../components/WidgetWrapper'
import widgetStyles from '../../styles/WidgetStyles.module.css'
import pageStyles from '../../styles/Pages.module.css'
import ModalDialog, { ModalId } from '../../components/ModalDialog'
import BuyCreditsWidget from '../../components/BuyCredits.widget'

export default function ProjectPage ({ project }) {
  const modalId = 'buy-credits-modal'
  if (!project)
    return (
      <main className={`main-container`}>
        <h1>Loading...</h1>
      </main>
    )
  return (
    <>
      <Head>
        <title>{project.fields.name} project</title>
        <meta name='description' content='' />
      </Head>
      <ModalId.Provider value={modalId}>
        <main className={`main-container ${pageStyles['project-page']}`}>
          <div className={widgetStyles['widgets-wrapper']}>
            <WidgetWrapper columns={3} areaName='project'>
              <SeparateProject project={project.fields} />
            </WidgetWrapper>
            <WidgetWrapper columns={1} areaName='credits' position='sticky'>
              <TotalCredits />
            </WidgetWrapper>
          </div>
        </main>
      </ModalId.Provider>
      <ModalDialog modalId={modalId}>
        <BuyCreditsWidget project={project.fields} />
      </ModalDialog>
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
    impactIcons
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

  project.fields.cccp = [
    { name: 'Unicity', value: project.fields['cccp-unicity'] },
    { name: 'Permanence', value: project.fields['cccp-permanence'] },
    {
      name: 'Measurability & reality',
      value: project.fields['cccp-measurability']
    },
    { name: 'Additionality', value: project.fields['cccp-additionality'] },
    { name: 'Rebound effects', value: project.fields['cccp-rebound-effects'] }
  ]

  return {
    props: {
      project
    },
    revalidate: 600
  }
}

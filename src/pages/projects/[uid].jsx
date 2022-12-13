import Head from 'next/head';
// import getAllProjects from 'components/db/getAllProjects';
import getProjectByUid from 'components/db/getProjectByUid';
import SeparateProject from 'components/widgets/SeparateProject.widget/SeparateProject.widget';
import TotalCredits from 'components/TotalCredits.SeparateProject.widget';
import WidgetWrapper from 'components/WidgetWrapper';
import widgetStyles from 'styles/WidgetStyles.module.css';
import pageStyles from 'styles/Pages.module.css';
import ModalDialog, { ModalId } from 'components/ModalDialog';
import { getYearsCreditsPricesFields } from 'components/db/normalizeProjectData';
import BuyCreditsNew from 'components/BuyCreditsNew.widget';
import { CartProvider } from 'components/forms/cart';

export default function ProjectPage({ project }) {
  const modalId = 'buy-credits-modal';
  if (!project)
    return (
      <main className={`main-container`}>
        <h1>Loading...</h1>
      </main>
    );
  return (
    <CartProvider>
      <Head>
        <title>{project.fields.name} project</title>
        <meta name='description' content='' />
      </Head>
      <ModalId.Provider value={modalId}>
        <main className={`main-container ${pageStyles['project-page']}`}>
          <div className={widgetStyles['widgets-wrapper']}>
            <WidgetWrapper columns={3} areaName='project'>
              <SeparateProject project={project.fields} id={project.id} />
            </WidgetWrapper>
            <WidgetWrapper columns={1} areaName='credits' position='sticky'>
              <TotalCredits />
            </WidgetWrapper>
          </div>
        </main>
      </ModalId.Provider>
      {project.fields.years ? (
        <ModalDialog modalId={modalId}>
          {/* <BuyCreditsWidget project={project.fields} /> */}
          <BuyCreditsNew project={project.fields} id={project.id} />
        </ModalDialog>
      ) : null}
    </CartProvider>
  );
}

export async function getStaticPaths() {
  // const projects = await getAllProjects(process.env.API_KEY, process.env.DB_VIEW);
  // const paths = projects.map(project => ({
  //   params: { uid: project.fields.uid },
  // }));
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const project = await getProjectByUid(process.env.API_KEY, process.env.DB_VIEW, params.uid);

  const { fields } = project;

  // data restructuring
  var yearsCreditsPricesFields = getYearsCreditsPricesFields(fields['year-credits-price']);
  Object.entries(yearsCreditsPricesFields).forEach(field => {
    fields[field[0]] = field[1];
  });
  const { 'sdgs-description': descriptions, 'sdgs-icons': icons, impactDesc, impactFigures, impactIcons } = fields;

  fields.sdgsArray = descriptions.map((desc, i) => {
    const { url, width, height } = icons[i];

    return { icon: { url, width, height }, desc };
  });

  if (fields) {
    console.log('toto');
  } else {
    console.log('titi');
  }

  fields.keyImpact = impactDesc.map((desc, i) => ({
    desc,
    figure: impactFigures[i],
    icon: impactIcons[i],
  }));

  fields.cccp = [
    { name: 'Unicity', value: fields['cccp-unicity'] },
    { name: 'Permanence', value: fields['cccp-permanence'] },
    {
      name: 'Measurability & reality',
      value: fields['cccp-measurability'],
    },
    { name: 'Additionality', value: fields['cccp-additionality'] },
    { name: 'Rebound effects', value: fields['cccp-rebound-effects'] },
  ];

  return {
    props: {
      project,
    },
    revalidate: 10,
  };
}

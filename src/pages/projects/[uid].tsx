import Head from 'next/head';
// import getAllProjects from 'components/db/getAllProjects';
import getProjectByUid from 'components/db/getProjectByUid';
import SeparateProject from 'components/widgets/SeparateProject';
import TotalCredits from 'components/TotalCredits.SeparateProject.widget';
import ModalDialog, { ModalId } from 'components/ModalDialog';
import { getYearsCreditsPricesFields } from 'components/db/normalizeProjectData';
import BuyCreditsNew from 'components/BuyCreditsNew.widget';
import { CartProvider } from 'components/forms/cart';
import WidgetWrapper from 'components/widgets/WidgetWrapper';
import WidgetsGrid from 'components/WidgetsGrid';
import type { ProjectWithId } from 'components/types/project';
import Link from 'next/link';
import { useRouter } from 'next/router';

type PagePropsType = {
  project: ProjectWithId;
};

// 8 columns 2 rows
const gridTemplateAreas = {
  all: '"pr pr pr pr pr pr creds creds"'
};

export default function ProjectPage ({ project }: PagePropsType) {
  const modalId = 'buy-credits-modal';
  const currentPath = useRouter().asPath;

  if (!project) return <h1>Loading...</h1>;

  const projectName = project.fields.name;
  const tagLine = project.fields.tagline;
  return (
    <CartProvider>
      <h1 className='sr-only'>{projectName}</h1>
      <Head>
        <title>{projectName} project</title>
        <meta name='description' content='' />
      </Head>
      <ModalId.Provider value={modalId}>
        <nav aria-label='Breadcrumb'>
          <ol role='list' className='text-base flex gap-10 mt-[-1.5em] mb-2.5'>
            <li className='relative after:absolute after:w-px after:ml-5 after:left-full after:top-[.125em] after:bottom-[.125em] after:border-r-2 after:rotate-[25deg] after:border-primary'>
              <Link href='/projects'>Projects</Link>
            </li>{' '}
            <li>
              <Link href={currentPath}>
                <a aria-current='page'>{tagLine}</a>
              </Link>
            </li>{' '}
          </ol>
        </nav>
        <WidgetsGrid gridTemplateAreas={gridTemplateAreas}>
          <>
            <WidgetWrapper areaName='pr' variant='transparent' additionalStyles='p-0'>
              <SeparateProject project={project.fields} id={project.id} />
            </WidgetWrapper>
            <WidgetWrapper areaName='creds' position='sticky'>
              <TotalCredits />
            </WidgetWrapper>
          </>
        </WidgetsGrid>
      </ModalId.Provider>
      {project.fields.years ? (
        <ModalDialog modalId={modalId}>
          <BuyCreditsNew project={project.fields} id={project.id} />
        </ModalDialog>
      ) : null}
    </CartProvider>
  );
}

export async function getStaticPaths () {
  // no prerendering because of Airtable api calls limitations
  // const projects = await getAllProjects(process.env.API_KEY, process.env.DB_VIEW);
  // const paths = projects.map(project => ({
  //   params: { uid: project.fields.uid },
  // }));
  return {
    paths: [],
    fallback: 'blocking'
  };
}

type StaticPropsType = {
  params: {
    uid: string;
  };
};

export async function getStaticProps ({ params }: StaticPropsType) {
  const project = await getProjectByUid(process.env.API_KEY, process.env.DB_VIEW, params.uid);

  const { fields } = project;

  // data restructuring
  const yearsCreditsPricesFields = getYearsCreditsPricesFields(fields['year-credits-price']);
  Object.entries(yearsCreditsPricesFields).forEach(field => {
    fields[field[0]] = field[1];
  });
  const { 'sdgs-description': descriptions, 'sdgs-icons': icons, impactDesc, impactFigures, impactIcons } = fields;

  fields.sdgsArray = descriptions.map((desc: string, i: number) => {
    const { url, width, height } = icons[i];

    return { icon: { url, width, height }, desc };
  });

  if (fields) {
    console.log('toto');
  } else {
    console.log('titi');
  }

  fields.keyImpact = impactDesc.map((desc: string, i: number) => ({
    desc,
    figure: impactFigures[i],
    icon: impactIcons[i]
  }));

  fields.cccp = [
    { name: 'Unicity', value: fields['cccp-unicity'] },
    { name: 'Permanence', value: fields['cccp-permanence'] },
    {
      name: 'Measurability & reality',
      value: fields['cccp-measurability']
    },
    { name: 'Additionality', value: fields['cccp-additionality'] },
    { name: 'Rebound effects', value: fields['cccp-rebound-effects'] }
  ];

  return {
    props: {
      project
    },
    revalidate: 10
  };
}

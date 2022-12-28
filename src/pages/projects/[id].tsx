import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

import SeparateProject from 'components/widgets/SeparateProject';
import TotalCredits from 'components/TotalCredits.SeparateProject.widget';
import WidgetWrapper from 'components/widgets/WidgetWrapper';
import ModalDialog, { ModalId } from 'components/ModalDialog';
import BuyCreditsNew from 'components/BuyCreditsNew.widget';
import { CartProvider } from 'components/forms/cart';
import { useProjectById } from 'components/hooks/api/projects';
import WidgetsGrid from 'components/WidgetsGrid';

// 8 columns 2 rows
const gridTemplateAreas = {
  all: '"pr pr pr pr pr pr creds creds"',
};

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: project, isError, isLoading } = useProjectById(parseInt(id));
  const modalId = 'buy-credits-modal';
  const currentPath = useRouter().asPath;

  if (isError) {
    return <>An error has occurred. Contact us if the problem persists</>;
  }

  if (isLoading && !project) {
    return (
      <main className={`main-container`}>
        <h1>Loading...</h1>
      </main>
    );
  }
  const { 'sdgs-description': descriptions, 'sdgs-icons': icons, impactDesc, impactFigures, impactIcons } = project;

  project.sdgsArray = descriptions.map((desc, i) => {
    const { url, width, height } = icons[i];

    return { icon: { url, width, height }, desc };
  });

  project.keyImpact = impactDesc.map((desc, i) => ({
    desc,
    figure: impactFigures[i],
    icon: impactIcons[i],
  }));

  project.cccp = [
    { name: 'Unicity', value: project['cccp-unicity'] },
    { name: 'Permanence', value: project['cccp-permanence'] },
    {
      name: 'Measurability & reality',
      value: project['cccp-measurability'],
    },
    { name: 'Additionality', value: project['cccp-additionality'] },
    { name: 'Rebound effects', value: project['cccp-rebound-effects'] },
  ];

  return (
    <CartProvider>
      <h1 className='sr-only'>{project.tagline}</h1>
      <Head>
        <title>{project.tagline} project</title>
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
                <a aria-current='page'>{project.tagline}</a>
              </Link>
            </li>{' '}
          </ol>
        </nav>
        <WidgetsGrid gridTemplateAreas={gridTemplateAreas}>
          <>
            <WidgetWrapper areaName='pr' variant='transparent' additionalStyles='p-0'>
              <SeparateProject project={project} />
            </WidgetWrapper>
            <WidgetWrapper areaName='creds' position='sticky'>
              <TotalCredits />
            </WidgetWrapper>
          </>
        </WidgetsGrid>
      </ModalId.Provider>
      {project.years ? (
        <ModalDialog modalId={modalId}>
          <BuyCreditsNew project={project} id={project.id} />
        </ModalDialog>
      ) : null}
    </CartProvider>
  );
};

export default ProjectPage;

import Head from 'next/head';
import { useRouter } from 'next/router';

import SeparateProject from 'components/widgets/SeparateProject';
import TotalCredits from 'components/TotalCredits.SeparateProject.widget';
import WidgetWrapper from 'components/widgets/WidgetWrapper';
import ModalDialog, { ModalId } from 'components/ModalDialog';
import BuyCreditsNew from 'components/BuyCreditsNew.widget';
import { CartProvider } from 'components/forms/cart';
import { useProjectById } from 'components/hooks/api/projects';
import WidgetsGrid from 'components/WidgetsGrid';
import type { Project, ProjectRaw } from 'components/types/project';
// import Breadcrumb from 'components/Breadcrumb';

// TODO: add name as field in project response

// 8 columns 2 rows
const gridTemplateAreas = {
  all: '"pr pr pr pr pr pr creds creds"'
};

const ProjectPage = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;
  const { data: rawProject, isError, isLoading } = useProjectById(parseInt(id as string));
  const modalId = 'buy-credits-modal';

  if (isError) {
    return <>An error has occurred. Contact us if the problem persists</>;
  }

  if (isLoading && !rawProject) {
    return (
      <main className={`main-container`}>
        <h1>Loading...</h1>
      </main>
    );
  }

  const project = rawProjectTransform(rawProject);

  return (
    <CartProvider>
      <h1 className='sr-only'>{project.tagline}</h1>
      <Head>
        <title>{project.tagline} project</title>
        <meta name='description' content='' />
      </Head>
      <ModalId.Provider value={modalId}>
        {/* <Breadcrumb /> */}
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
          <BuyCreditsNew project={project} id={id} />
        </ModalDialog>
      ) : null}
    </CartProvider>
  );
};

export default ProjectPage;

const rawProjectTransform = (projectRaw: ProjectRaw): Project => {
  // const { cover_picture, images, tagline, sectors, solution, issue} = projectRaw;
  const name = projectRaw.organisation.name || '';
  const cover_picture = projectRaw.cover_picture || '';
  const images = projectRaw.images || [];
  const tagline = projectRaw.tagline || '';
  const sectors = projectRaw.sectors || [];
  const solution = projectRaw.solution || '';
  const issue = projectRaw.issue || '';
  const years = projectRaw.years || [];
  const project = { cover_picture, images, tagline, sectors, solution, issue, name } as Project;
  if (years.length !== 0) {
    project.years = years;
  }
  const { 'sdgs-description': descriptions, 'sdgs-icons': icons, impactDesc, impactFigures, impactIcons } = projectRaw;

  project.sdgsArray = descriptions.map((desc, i) => {
    const url = icons[i]?.url || '';
    const width = icons[i]?.width || 0;
    const height = icons[i]?.height || 0;
    return { icon: { url, width, height }, desc };
  });

  project.keyImpact = impactDesc.map((desc, i) => {
    const figure = impactFigures[i] || '';
    const icon = impactIcons[i] || { url: '', width: 0, height: 0 };
    return { desc, figure, icon };
  });

  project.cccp = [
    { name: 'Unicity', value: projectRaw['cccp-unicity'] },
    { name: 'Permanence', value: projectRaw['cccp-permanence'] },
    {
      name: 'Measurability & reality',
      value: projectRaw['cccp-measurability']
    },
    { name: 'Additionality', value: projectRaw['cccp-additionality'] },
    { name: 'Rebound effects', value: projectRaw['cccp-rebound-effects'] }
  ];
  return project;
};

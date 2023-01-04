import { GetStaticPaths, GetStaticProps } from 'next';

import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/Button';
import { getFakeTransactionById } from 'components/allTransactionsPage/fakeData';
import ProjectDetails from 'components/individualTransactionPage/ProjectDetails';
import TransactionDetails from 'components/individualTransactionPage/TransactionDetails';
import WidgetsGrid from 'components/WidgetsGrid';
import WidgetWrapper from 'components/widgets/WidgetWrapper';

import type { Transaction } from 'components/types/transactions';

const gridTemplateAreas = {
  all: '"tr tr tr tr tr tr tr tr" "pr pr pr pr pr pr pr pr" "more more more more more more more more"',
  tablet: '"tr tr tr tr pr pr pr pr" ". more more more more more more ."'
};

type TransactionPageProps = {
  data: {
    data: Transaction;
  };
};

const TransactionPage = ({ data }: TransactionPageProps): JSX.Element => {
  if (!data) {
    return <>Error</>;
  }
  const { project, ...transaction } = data.data;

  return (
    <section className='max-w-screen-lg mx-auto'>
      <Breadcrumb labels={['Transactions', transaction.id]} />
      <WidgetsGrid
        gridTemplateAreas={gridTemplateAreas}
        gap='gap-5 md:gap-10'
        additionalStyles='items-stretch justify-items-center  text-base'>
        <>
          <WidgetWrapper areaName='tr' additionalStyles='max-w-lg w-full'>
            <TransactionDetails data={transaction} />
          </WidgetWrapper>
          <WidgetWrapper areaName='pr' additionalStyles='max-w-lg w-full'>
            <ProjectDetails data={project} />
          </WidgetWrapper>
          <WidgetWrapper areaName='more' additionalStyles='max-w-lg w-full'>
            <>
              <h2 className='text-xl text-center'>Discover more about the project</h2>
              <Button variant='centered' label='' href={`/projects/${project.id}`}>
                <>
                  Discover more <span className='sr-only'></span>
                </>
              </Button>
            </>
          </WidgetWrapper>
        </>
      </WidgetsGrid>
    </section>
  );
};

export default TransactionPage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = context => {
  const id = context.params?.id;
  if (typeof id !== 'string') {
    return { notFound: true };
  }

  const data = getFakeTransactionById(id);
  if (!data) {
    return { notFound: true };
  }

  return { props: { data } };
};

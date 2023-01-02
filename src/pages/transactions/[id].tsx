import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/Button';
import { getFakeTransactionById } from 'components/allTransactionsPage/fakeData';
import ProjectDetails from 'components/individualTransactionPage/ProjectDetails';
import TransactionDetails from 'components/individualTransactionPage/TransactionDetails';
import type { Transaction } from 'components/types/transactions';
import WidgetsGrid from 'components/WidgetsGrid';
import WidgetWrapper from 'components/widgets/WidgetWrapper';
import { GetStaticPaths, GetStaticProps } from 'next';

const gridTemplateAreas = {
  all: '"pr pr pr pr tr tr tr tr" ". . more more more more . ."',
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
    <>
      {/* <Breadcrumb /> */}
      <WidgetsGrid
        gridTemplateAreas={gridTemplateAreas}
        gap='gap-10'
        additionalStyles='items-stretch max-w-screen-lg mx-auto text-base'>
        <>
          <WidgetWrapper areaName='pr' additionalStyles=''>
            <ProjectDetails data={project} />
          </WidgetWrapper>
          <WidgetWrapper areaName='tr'>
            <TransactionDetails data={transaction} />
          </WidgetWrapper>
          <WidgetWrapper areaName='more'>
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
    </>
  );
};

export default TransactionPage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
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

import Head from 'next/head';

import WidgetWrapper from 'components/widgets/WidgetWrapper';
import Cart from 'components/Cart.widget';
import WidgetsGrid from 'components/WidgetsGrid';

// TODO: ADD H1 on EVERY page!

// 8 columns 2 rows
const gridTemplateAreas = {
  all: '" cart cart cart cart cart cart cart cart"',
};

export default function Home() {
  return (
    <>
      <h1 className='sr-only'>Carbon credits cart</h1>
      <Head>
        <title>Cart | Riverse</title>
        <meta name='description' content='Cart' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <WidgetsGrid gridTemplateAreas={gridTemplateAreas}>
        <WidgetWrapper areaName='cart'>
          <Cart />
        </WidgetWrapper>
      </WidgetsGrid>
    </>
  );
}

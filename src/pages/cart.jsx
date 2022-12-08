import Head from 'next/head';

import WidgetWrapper from 'components/WidgetWrapper';
import Cart from 'components/Cart.widget';
import pageStyles from 'styles/Pages.module.css';
import widgetStyles from 'styles/WidgetStyles.module.css';

// TODO: ADD H1 on EVERY page!

export default function Home() {
  return (
    <>
      <Head>
        <title>Cart | Riverse</title>
        <meta name='description' content='Cart' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main className={`main-container ${pageStyles.cart}`}>
        <div className={widgetStyles['widgets-wrapper']}>
          <WidgetWrapper columns={3} areaName='cart'>
            <Cart />
          </WidgetWrapper>
        </div>
      </main>
    </>
  );
}

import Head from 'next/head'
import widgetStyles from '../styles/WidgetStyles.module.css'
import Projects from '../components/Projects'
import WidgetWrapper from '../components/WidgetWrapper'
import TotalCreditsWidget from '../components/TotalCredits.widget'

// TODO:

export default function Home () {
  return (
    <>
      <Head>
        <title>Riverse projects</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main className={`${widgetStyles['widgets-wrapper']} main-container`}>
        <WidgetWrapper columns={3}>
          <Projects />
        </WidgetWrapper>
        <WidgetWrapper columns={1}>
          <TotalCreditsWidget />
        </WidgetWrapper>
      </main>
    </>
  )
}

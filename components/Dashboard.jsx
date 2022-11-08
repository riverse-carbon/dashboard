import styles from '../styles/Dashboard.module.css'
import widgetStyles from '../styles/WidgetStyles.module.css'
import Contribution from './Contribution'
import ContributionWidget from './ContributionWidget'
import Documentation from './Documentation'
import Projects from './Projects'
import TotalCreditsWidget from './TotalCredits.widget'
import WidgetWrapper from './WidgetWrapper'

// TODO:
// 1.Delete dashboard.module (a whole css file for 1 rule, what a shame)

function DashBoard ({}) {
  return (
    <div className={widgetStyles['widgets-wrapper']}>
      <WidgetWrapper columns={2} rows={2} areaName='projects'>
        <Projects limit={4} />
      </WidgetWrapper>
      <WidgetWrapper columns={1} rows={1} areaName='contribution'>
        <ContributionWidget />
      </WidgetWrapper>
      <WidgetWrapper columns={1} rows={1} areaName='credits'>
        <TotalCreditsWidget />
      </WidgetWrapper>
      <WidgetWrapper columns={2} rows={2} areaName='docs'>
        <Documentation />
      </WidgetWrapper>
    </div>
  )
}

export default DashBoard

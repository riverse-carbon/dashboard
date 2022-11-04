import widgetStyles from '../styles/WidgetStyles.module.css'

const WidgetWrapper = ({ columns = 2, children }) => {
  const columnSpan = 'column-span--' + columns

  return (
    <div
      className={`${widgetStyles['widget-card']} ${widgetStyles[columnSpan]}`}
    >
      {children}
    </div>
  )
}

export default WidgetWrapper

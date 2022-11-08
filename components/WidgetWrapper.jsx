import widgetStyles from '../styles/WidgetStyles.module.css'

const WidgetWrapper = ({ rows = 2, columns = 2, children, areaName = '' }) => {
  const columnSpan = 'column-span--' + columns
  const rowSpan = 'row-span--' + rows

  return (
    <div
      className={`${widgetStyles['widget-card']} ${widgetStyles[rowSpan]} ${widgetStyles[columnSpan]} ${widgetStyles[areaName]}`}
      style={{ '--area-name': areaName }}
    >
      {children}
    </div>
  )
}

export default WidgetWrapper

import widgetStyles from '../styles/WidgetStyles.module.css'

const WidgetWrapper = ({
  rows = 2,
  columns = 2,
  children,
  areaName = '',
  position = '',
  inset = '0 auto auto auto'
}) => {
  const columnSpan = 'column-span--' + columns
  const rowSpan = 'row-span--' + rows

  return (
    <div
      className={`${widgetStyles['widget-card']} ${widgetStyles[rowSpan]} ${widgetStyles[columnSpan]} ${widgetStyles[areaName]}`}
      style={{
        '--area-name': areaName,
        '--position': position,
        '--inset': inset
      }}
    >
      {children}
    </div>
  )
}

export default WidgetWrapper

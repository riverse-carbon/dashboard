import widgetStyles from '../styles/WidgetStyles.module.css'

const WidgetWrapper = ({
  className = '',
  children,
  areaName = '',
  position = '',
  inset = '0 auto auto auto'
}) => {
  return (
    <div
      className={`${widgetStyles['widget-card']} ${className}  ${widgetStyles[areaName]} shadow-elevation`}
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

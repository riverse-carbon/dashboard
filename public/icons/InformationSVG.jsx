export default function InformationSVG ({ title = '' }) {
  return (
    <svg
      width='9'
      height='9'
      viewBox='0 0 10 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden={!title}
    >
      {title ? <title>{title}</title> : ''}
      <circle
        cx='4.5'
        cy='4.5'
        r='4.5'
        fill='var(--svg-clr-outside, hsl(224 43% 19%))'
      />
      <path
        d='M4.50401 2.28C4.34401 2.28 4.21068 2.232 4.10401 2.136C4.00268 2.03467 3.95201 1.90933 3.95201 1.76C3.95201 1.61067 4.00268 1.488 4.10401 1.392C4.21068 1.29067 4.34401 1.24 4.50401 1.24C4.66401 1.24 4.79468 1.29067 4.89602 1.392C5.00268 1.488 5.05602 1.61067 5.05602 1.76C5.05602 1.90933 5.00268 2.03467 4.89602 2.136C4.79468 2.232 4.66401 2.28 4.50401 2.28ZM4.08001 7V3.032H4.92801V7H4.08001Z'
        fill='var(--svg-clr-inside, hsl(0 0% 100%))'
      />
    </svg>
  )
}

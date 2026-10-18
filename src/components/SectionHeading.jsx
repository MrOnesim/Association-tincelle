import Spark from './Spark'

/**
 * Titre de section. Par défaut en <h2>.
 *
 * `as="h1"` permet à la page qui ouvre le document d'avoir son titre
 * principal : une page doit ideally porter exactement un seul <h1>.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  center = true,
  className = '',
  as: Heading = 'h2',
}) {
  return (
    <div className={`${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <span className={light ? 'eyebrow-light' : 'eyebrow'}>
          <Spark className="h-3 w-3" />
          {eyebrow}
          {center && <Spark className="h-3 w-3" />}
        </span>
      )}
      <Heading
        className={`headline mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] ${
          light ? 'text-porcelain' : 'text-ink'
        }`}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            light ? 'text-porcelain/70' : 'text-muted'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

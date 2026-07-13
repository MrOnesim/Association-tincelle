export default function SectionHeading({ eyebrow, title, description, light = false, center = true }) {
  return (
    <div className={`${center ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2
        className={`mt-3 text-3xl sm:text-4xl font-bold leading-tight ${
          light ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg ${light ? 'text-white/80' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </div>
  )
}

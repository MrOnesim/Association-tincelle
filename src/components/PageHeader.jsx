export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden bg-primary text-white pt-12 pb-16">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="container-x relative">
        {eyebrow && <span className="eyebrow text-white/80">{eyebrow}</span>}
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          {title}
        </h1>
        {description && <p className="mt-4 text-white/85 max-w-2xl text-base sm:text-lg">{description}</p>}
      </div>
    </section>
  )
}

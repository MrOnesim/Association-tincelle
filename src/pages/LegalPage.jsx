import PageHeader from '../components/PageHeader'

export default function LegalPage({ eyebrow, title, intro, sections }) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={intro} />
      <section className="py-16 bg-white">
        <div className="container-x max-w-3xl space-y-8">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-slate-900">{s.h}</h2>
              <div className="mt-3 text-slate-600 leading-relaxed space-y-3">
                {Array.isArray(s.p) ? s.p.map((para, j) => <p key={j}>{para}</p>) : <p>{s.p}</p>}
              </div>
            </div>
          ))}
          <p className="text-sm text-slate-400 pt-6 border-t border-slate-100">
            Ce document est fourni à titre indicatif et doit être adapté puis validé par un
            conseil juridique.
          </p>
        </div>
      </section>
    </>
  )
}

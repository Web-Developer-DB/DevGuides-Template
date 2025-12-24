import { Link, useParams } from 'react-router-dom'
import { guides, topics } from '../data/guides'

export default function Topic() {
  const { topic } = useParams()
  const meta = topics.find((entry) => entry.key === topic)
  const items = guides.filter((guide) => guide.topic === topic)

  if (!meta) {
    return (
      <section className="rounded-3xl border border-rose-300/60 bg-rose-50 p-12 text-center text-sm text-rose-600 shadow-lg shadow-rose-200/50 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-100">
        <p className="text-base font-semibold">Thema nicht gefunden.</p>
        <p className="mt-2 text-rose-500 dark:text-rose-200">Bitte wähle ein vorhandenes Thema aus der Übersicht.</p>
      </section>
    )
  }

  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 transition-colors dark:text-dracula-green">
          Themenbereich
        </span>
        <h1 className="text-3xl font-semibold text-slate-900 transition-colors dark:text-dracula-text md:text-4xl">{meta.label}</h1>
        <p className="text-sm text-slate-600 transition-colors dark:text-dracula-muted md:max-w-3xl">{meta.description}</p>
      </header>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-10 text-center text-sm text-slate-600 shadow-lg shadow-black/5 transition-colors dark:border-dracula-border/70 dark:bg-dracula-surface dark:text-dracula-muted dark:shadow-black/10">
          <p className="font-semibold text-slate-900 transition-colors dark:text-dracula-text">Noch keine Tutorials verfügbar.</p>
          <p className="mt-2">Dieses Thema wird derzeit vorbereitet. Schau bald wieder vorbei!</p>
        </div>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {items.map((guide) => (
            <li
              key={guide.slug}
              className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-black/5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-brand-400/20 dark:border-dracula-border/70 dark:bg-dracula-surface dark:shadow-black/10"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-slate-900 transition-colors dark:text-dracula-text">{guide.title}</h2>
                <p className="text-sm leading-relaxed text-slate-600 transition-colors dark:text-dracula-muted">{guide.summary}</p>
              </div>
              <Link
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition hover:text-brand-500 dark:text-dracula-green dark:hover:text-dracula-purple"
                to={`/guides/${guide.slug}`}
              >
                Tutorial lesen
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

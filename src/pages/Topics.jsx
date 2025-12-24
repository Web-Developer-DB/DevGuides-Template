import { Link } from 'react-router-dom'
import { topics } from '../data/guides'

export default function Topics() {
  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900 transition-colors dark:text-dracula-text md:text-4xl">Themenübersicht</h1>
        <p className="text-sm text-slate-600 transition-colors dark:text-dracula-muted md:max-w-2xl">
          Wähle einen Bereich und entdecke passende Tutorials. Jeder Themenblock bündelt wichtige Use-Cases und Patterns
          für fokussiertes Lernen.
        </p>
      </header>
      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {topics.map((topic) => (
          <li
            key={topic.key}
            className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-black/5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-brand-400/20 dark:border-dracula-border/70 dark:bg-dracula-surface dark:shadow-black/10"
          >
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 transition-colors dark:text-dracula-green">
                Thema
              </span>
              <h2 className="text-xl font-semibold text-slate-900 transition-colors dark:text-dracula-text">{topic.label}</h2>
              <p className="text-sm leading-relaxed text-slate-600 transition-colors dark:text-dracula-muted">{topic.description}</p>
            </div>
            <Link
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition hover:text-brand-500 dark:text-dracula-green dark:hover:text-dracula-purple"
              to={`/topics/${topic.key}`}
            >
              Tutorials öffnen
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { guides, topics } from '../data/guides'
import SearchBox from '../components/SearchBox'

export default function Guides() {
  const [q, setQ] = useState('')

  useEffect(() => {
    const onKey = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        const el = document.querySelector('input[aria-label="Suche"]')
        el?.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const filtered = useMemo(() => {
    if (!q.trim()) return guides
    const needle = q.toLowerCase()
    return guides.filter((guide) => {
      return (
        guide.title.toLowerCase().includes(needle) ||
        guide.summary.toLowerCase().includes(needle) ||
        guide.tags.some((tag) => tag.toLowerCase().includes(needle)) ||
        (guide.topic && guide.topic.toLowerCase().includes(needle))
      )
    })
  }, [q])

  const hasResults = filtered.length > 0
  const queryActive = q.trim().length > 0

  return (
    <section className="space-y-10">
      <header className="flex flex-col gap-6 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-black/5 transition-colors duration-300 ease-out dark:border-dracula-border/70 dark:bg-dracula-surface dark:shadow-black/10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-slate-900 transition-colors dark:text-dracula-text md:text-4xl">Guides</h1>
          <p className="text-sm text-slate-600 transition-colors dark:text-dracula-muted md:max-w-xl">
            Finde und filtere praxisnahe Tutorials rund um React, JavaScript, TypeScript und Express. Nutze die Schnellsuche
            oder tauche über Themen direkt in passende Inhalte ein.
          </p>
        </div>
        <SearchBox value={q} onChange={setQ} placeholder="Guides, Tags oder Themen suchen…" />
      </header>

      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <Link
            key={topic.key}
            to={`/topics/${topic.key}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:border-brand-600 hover:text-brand-600 dark:border-dracula-border/70 dark:bg-dracula-surface dark:text-dracula-text dark:hover:border-dracula-green dark:hover:text-dracula-green"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600 transition-colors dark:bg-dracula-green" aria-hidden="true" />
            {topic.label}
          </Link>
        ))}
      </div>

      {hasResults ? (
        <ul className="grid gap-6 md:grid-cols-2">
          {filtered.map((guide) => (
            <li
              key={guide.slug}
              className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-black/5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-brand-400/20 dark:border-dracula-border/70 dark:bg-dracula-surface dark:shadow-black/10"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 transition-colors dark:text-dracula-green">
                  <span>{guide.topic}</span>
                  <span aria-hidden="true">•</span>
                  <span>{guide.tags.join(', ')}</span>
                </div>
                <h2 className="text-xl font-semibold text-slate-900 transition-colors dark:text-dracula-text">{guide.title}</h2>
                <p className="text-sm leading-relaxed text-slate-600 transition-colors dark:text-dracula-muted">{guide.summary}</p>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-brand-600 transition-colors dark:text-dracula-green">
                <Link to={`/guides/${guide.slug}`} className="inline-flex items-center gap-2 hover:text-brand-500 dark:hover:text-dracula-purple">
                  Lesen
                  <span aria-hidden="true">→</span>
                </Link>
                <span className="flex gap-2 text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-dracula-muted">
                  {guide.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200/80 bg-slate-100 px-2 py-0.5 text-slate-600 dark:border-dracula-border/70 dark:bg-dracula-highlight/60 dark:text-dracula-text">
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-10 text-center text-sm text-slate-600 shadow-lg shadow-black/5 transition-colors dark:border-dracula-border/70 dark:bg-dracula-surface dark:text-dracula-muted dark:shadow-black/10">
          <p className="font-semibold text-slate-900 transition-colors dark:text-dracula-text">Keine Treffer</p>
          <p className="mt-2">
            {queryActive ? 'Passe deine Suche an oder durchstöbere die Themenbereiche.' : 'Hier tauchen bald neue Guides auf.'}
          </p>
        </div>
      )}
    </section>
  )
}

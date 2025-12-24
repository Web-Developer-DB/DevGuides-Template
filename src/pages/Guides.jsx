import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { guides, tagIndex, topics } from '../data/guides'
import SearchBox from '../components/SearchBox'

export default function Guides() {
  const [q, setQ] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const tagParam = searchParams.get('tag')
  const { hash } = useLocation()

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

  useEffect(() => {
    if (!tagParam) return
    const nextValue = `#${tagParam}`
    const trimmed = q.trim()
    if (!trimmed || trimmed === nextValue) {
      setQ(nextValue)
    }
  }, [tagParam, q])

  useEffect(() => {
    if (hash === '#hashtags') {
      const el = document.getElementById('hashtags')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash])

  const handleSearchChange = (value) => {
    setQ(value)
    if (tagParam) {
      setSearchParams({})
    }
  }

  const handleTagSelect = (tag) => {
    setQ(`#${tag}`)
    setSearchParams({ tag })
  }

  const clearFilters = () => {
    setQ('')
    setSearchParams({})
  }

  const normalizedQuery = q.toLowerCase().replace(/#/g, '').trim()

  const filtered = useMemo(() => {
    if (!normalizedQuery) return guides
    return guides.filter((guide) => {
      return (
        guide.title.toLowerCase().includes(normalizedQuery) ||
        guide.summary.toLowerCase().includes(normalizedQuery) ||
        guide.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
        (guide.topic && guide.topic.toLowerCase().includes(normalizedQuery))
      )
    })
  }, [normalizedQuery])

  const hasResults = filtered.length > 0
  const queryActive = normalizedQuery.length > 0

  return (
    <section className="space-y-10">
      <header className="flex flex-col gap-6 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-black/5 transition-colors duration-300 ease-out dark:border-dracula-border/70 dark:bg-dracula-surface dark:shadow-black/10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-slate-900 transition-colors dark:text-dracula-text md:text-4xl">Tutorials</h1>
          <p className="text-sm text-slate-600 transition-colors dark:text-dracula-muted md:max-w-xl">
            Finde und filtere praxisnahe Anleitungen. Hashtags, Themen und Suche bringen dich schnell zu passenden Tutorials.
          </p>
        </div>
        <SearchBox value={q} onChange={handleSearchChange} placeholder="Tutorials, #hashtags oder Themen suchen…" />
      </header>

      <section id="hashtags" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-dracula-muted">Hashtags</h2>
          {queryActive && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 transition hover:text-brand-500 dark:text-dracula-green dark:hover:text-dracula-purple"
            >
              Filter zurücksetzen
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-brand-600 hover:text-brand-600 dark:border-dracula-border/70 dark:bg-dracula-highlight/70 dark:text-dracula-text dark:hover:border-dracula-green dark:hover:text-dracula-green"
          >
            #alle
          </button>
          {tagIndex.map((tag) => (
            <button
              key={tag.tag}
              type="button"
              onClick={() => handleTagSelect(tag.tag)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-brand-600 hover:text-brand-600 dark:border-dracula-border/70 dark:bg-dracula-surface dark:text-dracula-text dark:hover:border-dracula-green dark:hover:text-dracula-green"
            >
              #{tag.tag}
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500 dark:bg-dracula-highlight/70 dark:text-dracula-muted">
                {tag.count}
              </span>
            </button>
          ))}
        </div>
      </section>

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
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-brand-600 transition-colors dark:text-dracula-green">
                  <span className="rounded-full border border-brand-200/60 bg-brand-100/60 px-2 py-0.5 text-[11px] dark:border-dracula-green/40 dark:bg-dracula-green/10">
                    #{guide.topic}
                  </span>
                  {guide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200/80 bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600 transition-colors dark:border-dracula-border/70 dark:bg-dracula-highlight/60 dark:text-dracula-text"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold text-slate-900 transition-colors dark:text-dracula-text">{guide.title}</h2>
                <p className="text-sm leading-relaxed text-slate-600 transition-colors dark:text-dracula-muted">{guide.summary}</p>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 text-sm font-semibold text-brand-600 transition-colors dark:text-dracula-green">
                <Link to={`/guides/${guide.slug}`} className="inline-flex items-center gap-2 hover:text-brand-500 dark:hover:text-dracula-purple">
                  Lesen
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-10 text-center text-sm text-slate-600 shadow-lg shadow-black/5 transition-colors dark:border-dracula-border/70 dark:bg-dracula-surface dark:text-dracula-muted dark:shadow-black/10">
          <p className="font-semibold text-slate-900 transition-colors dark:text-dracula-text">Keine Treffer</p>
          <p className="mt-2">
            {queryActive ? 'Passe deine Suche an oder nutze einen anderen Hashtag.' : 'Hier tauchen bald neue Tutorials auf.'}
          </p>
        </div>
      )}
    </section>
  )
}

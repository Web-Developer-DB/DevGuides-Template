import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { guides } from '../data/guides'
import { markdownToHtml } from '../utils/markdown'

const guideModules = import.meta.glob('../guides/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

const guideMarkdown = Object.entries(guideModules).reduce((acc, [path, value]) => {
  const slug = path.split('/').pop().replace('.md', '')
  acc[slug] = value
  return acc
}, {})

const fallbackMarkdown = '# Tutorial in Arbeit\n\nHier entsteht Inhalt.'

export default function Guide() {
  const { slug } = useParams()
  const meta = guides.find((guide) => guide.slug === slug)
  const md = guideMarkdown[slug] || fallbackMarkdown
  const html = useMemo(() => markdownToHtml(md), [md])

  if (!meta) {
    return (
      <section className="rounded-3xl border border-rose-300/60 bg-rose-50 p-12 text-center text-sm text-rose-600 shadow-lg shadow-rose-200/50 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-100">
        <p className="text-base font-semibold">Tutorial nicht gefunden.</p>
        <p className="mt-2 text-rose-500 dark:text-rose-200">Bitte wähle ein vorhandenes Tutorial über die Übersicht.</p>
        <Link className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-500 dark:text-rose-100" to="/guides">
          Zurück zu den Tutorials
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    )
  }

  return (
    <article className="space-y-10">
      <header className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-black/5 transition-colors duration-300 ease-out dark:border-dracula-border/70 dark:bg-dracula-surface dark:shadow-black/10">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-brand-600 transition-colors dark:text-dracula-green">
          <span className="rounded-full border border-brand-200/60 bg-brand-100/60 px-2 py-0.5 text-[11px] dark:border-dracula-green/40 dark:bg-dracula-green/10">
            #{meta.topic}
          </span>
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200/80 bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600 transition-colors dark:border-dracula-border/70 dark:bg-dracula-highlight/60 dark:text-dracula-text"
            >
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900 transition-colors dark:text-dracula-text md:text-4xl">{meta.title}</h1>
        <p className="mt-3 text-sm text-slate-600 transition-colors dark:text-dracula-muted md:max-w-3xl">{meta.summary}</p>
        <Link
          to="/guides"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition hover:text-brand-500 dark:text-dracula-green dark:hover:text-dracula-purple"
        >
          Alle Tutorials anzeigen
          <span aria-hidden="true">→</span>
        </Link>
      </header>
      <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-black/5 transition-colors duration-300 ease-out dark:border-dracula-border/70 dark:bg-dracula-surface dark:shadow-black/10">
        <div className="guide-markdown prose prose-lg max-w-none prose-a:text-brand-600 prose-blockquote:border-brand-200 prose-blockquote:text-slate-700 prose-code:text-brand-600 transition-colors dark:prose-invert dark:prose-a:text-dracula-green dark:prose-blockquote:border-dracula-green/60 dark:prose-blockquote:text-dracula-muted dark:prose-code:text-dracula-green">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </article>
  )
}

import { Link } from 'react-router-dom'
import { guides, tagIndex } from '../data/guides'

const highlights = [
  {
    title: 'Wächst mit jedem Tutorial',
    description: 'Neue Anleitungen tauchen automatisch in der Übersicht auf und bleiben durchsuchbar.',
  },
  {
    title: 'Hashtags statt Chaos',
    description: 'Filtere per #tag und finde verwandte Inhalte in Sekunden.',
  },
  {
    title: 'Klar strukturierte Schritte',
    description: 'Problem, Voraussetzungen, Schritte und Checkliste geben schnellen Fokus.',
  },
]

export default function Home() {
  const latestGuides = [...guides].slice(-3).reverse()
  const topTags = tagIndex.slice(0, 10)

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white px-6 py-14 shadow-xl shadow-brand-500/5 transition-colors duration-300 ease-out dark:border-dracula-border/70 dark:bg-dracula-surface sm:px-10 md:px-14">
        <div className="absolute inset-y-0 right-[-15%] hidden h-full w-2/3 rounded-full bg-gradient-to-br from-brand-200/40 via-cyan-200/30 to-transparent blur-3xl transition-colors dark:from-dracula-purple/35 dark:via-dracula-pink/25 md:block" />
        <div className="relative max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-100/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition-colors dark:border-dracula-border/70 dark:bg-dracula-highlight/70 dark:text-dracula-muted">
            Tutorials · Anleitungen · How-To
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 transition-colors dark:text-dracula-text sm:text-5xl">
            DevGuides Template macht aus Notizen klare Tutorials.
          </h1>
          <p className="text-lg text-slate-600 transition-colors dark:text-dracula-muted">
            Baue eine wachsende Wissensbasis mit Hashtags, Themen und schnellen Filtern. Neue Anleitungen erscheinen sofort in der Übersicht.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/guides"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/40 transition hover:bg-brand-500 hover:shadow-brand-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 dark:bg-dracula-green dark:text-dracula-background dark:hover:bg-dracula-cyan dark:focus-visible:outline-dracula-cyan"
            >
              Tutorials ansehen
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/guides#hashtags"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200/80 px-6 py-3 text-sm font-semibold text-slate-700 backdrop-blur transition hover:border-brand-600/80 hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 dark:border-dracula-border/70 dark:text-dracula-text dark:hover:border-dracula-green dark:hover:text-dracula-green"
            >
              Hashtags entdecken
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="group flex h-full flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-black/5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-brand-400/20 dark:border-dracula-border/70 dark:bg-dracula-surface dark:shadow-black/10"
          >
            <h2 className="text-lg font-semibold text-slate-900 transition-colors dark:text-dracula-text">{item.title}</h2>
            <p className="text-sm leading-relaxed text-slate-600 transition-colors dark:text-dracula-muted">{item.description}</p>
            <span className="mt-auto text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 opacity-0 transition group-hover:opacity-100 dark:text-dracula-green">
              Fokus
            </span>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-black/5 transition-colors duration-300 ease-out dark:border-dracula-border/70 dark:bg-dracula-surface dark:shadow-black/10 lg:col-span-2">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 transition-colors dark:text-dracula-text">Neueste Tutorials</h2>
            <p className="mt-2 text-sm text-slate-600 transition-colors dark:text-dracula-muted">
              Frisch ergänzt und bereit zum Nachlesen. Jede Anleitung ist mit Hashtags gekennzeichnet.
            </p>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {latestGuides.map((guide) => (
              <li key={guide.slug} className="group rounded-2xl border border-slate-200/80 bg-slate-50/80 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-400/20 dark:border-dracula-border/70 dark:bg-dracula-highlight/60">
                <Link to={`/guides/${guide.slug}`} className="flex h-full flex-col p-4">
                  <p className="text-xs font-semibold text-brand-600 transition-colors dark:text-dracula-green">
                    #{guide.topic}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-slate-900 transition-colors group-hover:text-brand-700 dark:text-dracula-text dark:group-hover:text-dracula-green">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 transition-colors dark:text-dracula-muted">{guide.summary}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-brand-600 transition group-hover:text-brand-500 dark:text-dracula-green dark:group-hover:text-dracula-purple">
                    Lesen
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-black/5 transition-colors duration-300 ease-out dark:border-dracula-border/70 dark:bg-dracula-surface dark:shadow-black/10">
          <h3 className="text-lg font-semibold text-slate-900 transition-colors dark:text-dracula-text">Hashtag-Übersicht</h3>
          <p className="mt-2 text-sm text-slate-600 transition-colors dark:text-dracula-muted">
            Schnell filtern und Themenkombinationen entdecken.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {topTags.map((tag) => (
              <Link
                key={tag.tag}
                to={`/guides?tag=${tag.tag}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-brand-600 hover:text-brand-600 dark:border-dracula-border/70 dark:bg-dracula-highlight/70 dark:text-dracula-text dark:hover:border-dracula-green dark:hover:text-dracula-green"
              >
                #{tag.tag}
                <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] text-slate-500 dark:bg-dracula-background/80 dark:text-dracula-muted">
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-black/5 transition-colors duration-300 ease-out dark:border-dracula-border/70 dark:bg-dracula-surface dark:shadow-black/10 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 transition-colors dark:text-dracula-text">So findest du Inhalte</h2>
          <p className="text-sm leading-relaxed text-slate-600 transition-colors dark:text-dracula-muted">
            Die Plattform ist auf schnelle Orientierung ausgelegt: Suche, Hashtags und Themen bringen dich direkt zur passenden Anleitung.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 transition-colors dark:text-dracula-muted">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-600 dark:bg-dracula-green" />
              <span>Suche nach Titel, Thema oder #hashtag</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-600 dark:bg-dracula-green" />
              <span>Hashtags zeigen verwandte Tutorials auf einen Blick</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-600 dark:bg-dracula-green" />
              <span>Jeder Guide endet mit Checkliste und Praxisbezug</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-600 dark:bg-dracula-green" />
              <span>Neue Inhalte erscheinen automatisch in der Übersicht</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200/80 bg-slate-100/70 p-6 text-sm text-slate-700 shadow-inner shadow-black/5 transition-colors dark:border-dracula-border/70 dark:bg-dracula-highlight/60 dark:text-dracula-text dark:shadow-black/10">
          <div>
            <h3 className="text-base font-semibold text-slate-900 transition-colors dark:text-dracula-text">Tutorial-Workflow</h3>
            <p className="mt-2 text-sm text-slate-600 transition-colors dark:text-dracula-muted">
              Ein Guide folgt immer der gleichen klaren Struktur, damit Leser schnell ans Ziel kommen.
            </p>
          </div>
          <ol className="space-y-2 text-sm text-slate-600 transition-colors dark:text-dracula-muted">
            <li>1. Problem/Goal definieren</li>
            <li>2. Voraussetzungen nennen</li>
            <li>3. Schritte mit Code liefern</li>
            <li>4. Kurz erklären, warum</li>
            <li>5. Varianten + Checkliste</li>
          </ol>
        </div>
      </section>
    </div>
  )
}

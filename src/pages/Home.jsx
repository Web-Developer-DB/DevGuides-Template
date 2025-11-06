import { Link } from 'react-router-dom'

const highlights = [
  {
    title: 'Guides für jede Phase',
    description: 'Von Setup über Routing bis zu API-Beispielen – klare Schritt-für-Schritt-Anleitungen.',
  },
  {
    title: 'Copy & Paste Ready',
    description: 'Alle Snippets sind geprüft, typisiert und lassen sich sofort einsetzen.',
  },
  {
    title: 'Kuratiertes Wissen',
    description: 'Kurze Erklärungen, Trade-offs und Best Practices für moderne Web-Apps.',
  },
]

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white px-6 py-14 shadow-xl shadow-brand-500/5 transition-colors duration-300 ease-out dark:border-dracula-border/70 dark:bg-dracula-surface sm:px-10 md:px-14">
        <div className="absolute inset-y-0 right-[-15%] hidden h-full w-2/3 rounded-full bg-gradient-to-br from-brand-200/40 via-cyan-200/30 to-transparent blur-3xl transition-colors dark:from-dracula-purple/35 dark:via-dracula-pink/25 md:block" />
        <div className="relative max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-100/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition-colors dark:border-dracula-border/70 dark:bg-dracula-highlight/70 dark:text-dracula-muted">
            React · Router · Tailwind
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 transition-colors dark:text-dracula-text sm:text-5xl">
            Starte deine DevGuides schneller als dein Dev-Server.
          </h1>
          <p className="text-lg text-slate-600 transition-colors dark:text-dracula-muted">
            Ein modernes Starter-Kit für React + React Router: responsives Layout, strukturierte Guides und leistungsstarke Suche – alles vorkonfiguriert.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/guides"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/40 transition hover:bg-brand-500 hover:shadow-brand-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 dark:bg-dracula-green dark:text-dracula-background dark:hover:bg-dracula-cyan dark:focus-visible:outline-dracula-cyan"
            >
              Jetzt Guides entdecken
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              to="/topics"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200/80 px-6 py-3 text-sm font-semibold text-slate-700 backdrop-blur transition hover:border-brand-600/80 hover:text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 dark:border-dracula-border/70 dark:text-dracula-text dark:hover:border-dracula-green dark:hover:text-dracula-green"
            >
              Themenübersicht ansehen
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

      <section className="grid gap-6 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-black/5 transition-colors duration-300 ease-out dark:border-dracula-border/70 dark:bg-dracula-surface dark:shadow-black/10 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 transition-colors dark:text-dracula-text">Warum DevGuides?</h2>
          <p className="text-sm leading-relaxed text-slate-600 transition-colors dark:text-dracula-muted">
            Wenn du neue Features shippen willst, zählt jede Minute. DevGuides liefert dir einen vorkonfigurierten Stack mit klaren Konventionen, damit sich dein Team auf Inhalte statt Infrastruktur konzentriert.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 transition-colors dark:text-dracula-muted">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-600 dark:bg-dracula-green" />
              <span>Vite + React Router + Tailwind perfekt abgestimmt</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-600 dark:bg-dracula-green" />
              <span>Markdown-Beispiele mit direkter Vorschau</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-600 dark:bg-dracula-green" />
              <span>Tastaturbedienbare Suche (⌘/Ctrl+K)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-600 dark:bg-dracula-green" />
              <span>ESLint + Prettier Setup für konsistenten Code</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200/80 bg-slate-100/70 p-6 text-sm text-slate-700 shadow-inner shadow-black/5 transition-colors dark:border-dracula-border/70 dark:bg-dracula-highlight/60 dark:text-dracula-text dark:shadow-black/10">
          <div>
            <h3 className="text-base font-semibold text-slate-900 transition-colors dark:text-dracula-text">Project Quickstart</h3>
            <p className="mt-2 text-sm text-slate-600 transition-colors dark:text-dracula-muted">
              Nur drei Befehle und dein Dev-Server läuft – inklusive Routing, Styles und Linting.
            </p>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-slate-200/80 bg-slate-900/5 p-4 text-xs text-slate-800 transition-colors dark:border-dracula-border/70 dark:bg-dracula-surface dark:text-dracula-green">
            <code>
              npm install
              {'\n'}npm run dev
              {'\n'}npm run lint
            </code>
          </pre>
        </div>
      </section>
    </div>
  )
}

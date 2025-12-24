import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { to: '/guides', label: 'Tutorials' },
  { to: '/topics', label: 'Themen' },
  { to: '/guides#hashtags', label: 'Hashtags' },
]

const linkClass = (isActive) =>
  [
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
    isActive
      ? 'bg-brand-200/30 text-slate-900 shadow-sm dark:bg-dracula-highlight/80 dark:text-dracula-text dark:shadow-glow'
      : 'text-slate-600 hover:text-slate-900 hover:bg-brand-200/20 dark:text-dracula-muted dark:hover:text-dracula-text dark:hover:bg-dracula-highlight/60',
  ].join(' ')

const mobileLinkClass = (isActive) =>
  [
    'block rounded-lg px-3 py-2 text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
    isActive
      ? 'bg-brand-200/20 text-slate-900 dark:bg-dracula-highlight dark:text-dracula-text'
      : 'text-slate-600 hover:text-slate-900 hover:bg-brand-200/15 dark:text-dracula-muted dark:hover:text-dracula-text dark:hover:bg-dracula-highlight/60',
  ].join(' ')

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur transition-colors duration-300 ease-out dark:border-dracula-border/70 dark:bg-dracula-surface/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-dracula-text">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 via-brand-600 to-brand-500 text-base font-bold shadow-glow dark:from-dracula-purple dark:via-dracula-green dark:to-dracula-cyan">
            DG
          </span>
          <span className="text-lg font-semibold tracking-tight">DevGuides Template</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
          <NavLink to="/" end className={({ isActive }) => linkClass(isActive)}>
            Start
          </NavLink>
          {navItems.map((item) =>
            item.to.includes('#') ? (
              <Link key={item.to} to={item.to} className={linkClass(false)}>
                {item.label}
              </Link>
            ) : (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => linkClass(isActive)}>
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="lg:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-label="Navigation öffnen"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-900 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:border-dracula-border/70 dark:bg-dracula-highlight/70 dark:text-dracula-text dark:hover:bg-dracula-highlight"
            >
              <span className="text-lg" aria-hidden="true">
                {menuOpen ? '✕' : '☰'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200/80 bg-white/90 px-4 pb-6 pt-2 shadow-xl transition dark:border-dracula-border/70 dark:bg-dracula-background/95 lg:hidden sm:px-6">
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => mobileLinkClass(isActive)}>
              Start
            </NavLink>
            {navItems.map((item) =>
              item.to.includes('#') ? (
                <Link key={item.to} to={item.to} onClick={closeMenu} className={mobileLinkClass(false)}>
                  {item.label}
                </Link>
              ) : (
                <NavLink key={item.to} to={item.to} onClick={closeMenu} className={({ isActive }) => mobileLinkClass(isActive)}>
                  {item.label}
                </NavLink>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

import { useEffect, useRef } from 'react'

export default function SearchBox({ value, onChange, placeholder = 'Suchen…', autoFocus = false }) {
  const ref = useRef(null)

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus()
    }
  }, [autoFocus])

  return (
    <div className="relative w-full sm:w-auto">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-dracula-muted"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0a6 6 0 1 0-8.49 0 6 6 0 0 0 8.49 0Z" />
      </svg>
      <input
        ref={ref}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200/80 bg-white px-9 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-inner shadow-black/5 backdrop-blur transition focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30 sm:min-w-[18rem] dark:border-dracula-border dark:bg-dracula-highlight dark:text-dracula-text dark:placeholder:text-dracula-muted dark:shadow-black/10 dark:focus:border-brand-600 dark:focus:ring-brand-600/30"
        placeholder={placeholder}
        aria-label="Suche"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-slate-200/80 bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-600 dark:border-dracula-border dark:bg-dracula-highlight/80 dark:text-dracula-muted">
        ⌘K
      </span>
    </div>
  )
}

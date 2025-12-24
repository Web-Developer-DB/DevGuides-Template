export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white/80 backdrop-blur transition-colors duration-300 ease-out dark:border-dracula-border/70 dark:bg-dracula-background/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 dark:text-dracula-muted">
        <p>© {new Date().getFullYear()} DevGuides Template. Tutorials, geordnet mit Themen und Hashtags.</p>
      </div>
    </footer>
  )
}

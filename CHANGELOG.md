# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.
Das Format basiert auf **Keep a Changelog** und die Versionierung auf **SemVer**.

## [Unreleased]
### Added
- Vite + React Router Starter inklusive Tailwind-Konfiguration und Typography-Plugin.
- Kernseiten (`Home`, `Guides`, `Guide`, `Topics`, `Topic`) mit Navigation, Suche und Beispieldaten.
- Komponenten-Basis (Navbar, Footer, SearchBox) für responsives Layout.
- ESLint- und Prettier-Konfiguration inklusive ergänzender Lint-/Format-Skripte.
- Light-/Dark-Theme-Switcher mit Persistenz via `ThemeProvider`.
- Vitest + React Testing Library Setup inkl. Theme-Tests.
- Markdown-Pipeline: alle Inhalte unter `src/guides/*.md` werden automatisch geladen und mit Syntax-Highlighting gerendert.
- Umfassende Test-Suite für App-Shell, Seiten, Komponenten sowie die Markdown-Helfer.
- Neuer Guide „SSH zu GitHub unter Linux & WSL“ inkl. Troubleshooting-Tabelle.

### Changed
- Modernisierte UI mit Glas-Optik, verbesserten Karten und Hero-Sektion für einen professionellen Auftritt.
- Aktualisierte Navigation, Footer und Detailseiten mit optimierten Farben, Abständen und Interaktionen.
- Dark Mode setzt jetzt konsequent auf das Dracula Theme (Farben, Flächen, Kontraste).
- Komponentenstyling auf helle/dunkle Themes abgestimmt (Tailwind `dark:`-Utilities & Farbvarianten).
- Primäre Buttons, Chips & Inputs mit Dracula-Grüntönen und passenden Hover-/Focus-States versehen.
- `Guide` nutzt nun ein gemeinsames Markdown-Parsing-Modul; Inhalte lassen sich ohne HTML-Kenntnisse erweitern.
- README beschreibt die neue Content-Architektur und die Test-Workflows detailliert.

### Fixed
- Fehlende Brand-Farbwerte ergänzt, sodass `text-brand-200` & Co. in Tailwind verfügbar sind.

### Removed
- Veraltete Beispiel-Guides unter `docs/examples/`, da alle Inhalte jetzt direkt in `src/guides/` gepflegt werden.

### Docs
- Redaktionsleitfäden und Beispiel-Guides im Ordner `docs/`.
- README + Entwickler-Doku um Theme-Switcher und Test-Workflows ergänzt.

## [0.1.0] - 2025-11-06
### Added
- Initiales React + React Router Grundgerüst mit responsivem Layout.
- Themen-Navigation (`/topics`, `/topics/:topic`).
- Beispiel-Guides & Datenstruktur (`data/guides.js`).

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

### Changed
- Modernisierte UI mit Glas-Optik, verbesserten Karten und Hero-Sektion für einen professionellen Auftritt.
- Aktualisierte Navigation, Footer und Detailseiten mit optimierten Farben, Abständen und Interaktionen.
- Dark Mode setzt jetzt konsequent auf das Dracula Theme (Farben, Flächen, Kontraste).
- Komponentenstyling auf helle/dunkle Themes abgestimmt (Tailwind `dark:`-Utilities & Farbvarianten).
- Primäre Buttons, Chips & Inputs mit Dracula-Grüntönen und passenden Hover-/Focus-States versehen.

### Fixed
- Fehlende Brand-Farbwerte ergänzt, sodass `text-brand-200` & Co. in Tailwind verfügbar sind.

### Docs
- Redaktionsleitfäden und Beispiel-Guides im Ordner `docs/`.
- README + Entwickler-Doku um Theme-Switcher und Test-Workflows ergänzt.

## [0.1.0] - 2025-11-06
### Added
- Initiales React + React Router Grundgerüst mit responsivem Layout.
- Themen-Navigation (`/topics`, `/topics/:topic`).
- Beispiel-Guides & Datenstruktur (`data/guides.js`).

# DevGuides – React Router Starter

Ein erweiterbarer Starter für **React + React Router (v6)** mit responsivem Layout und einer Markdown-basierten Content-Pipeline.

## Features
- Vite + React 18 + React Router 6
- Tailwind CSS inkl. Typography-Plugin
- Responsives Layout mit Navbar, Footer und Mobile-Hamburger
- Guides-Übersicht mit Suche (⌘/Ctrl+K) sowie Themen-Navigation
- Markdown-Guides unter `src/guides/*.md`, automatisch per `import.meta.glob` geladen
- Theme-Switcher mit Dracula-Dark-Theme und persistenter Auswahl
- ESLint + Prettier + Vitest + Testing Library

## Schnellstart
```bash
npm install
npm run dev
```

## Guides ergänzen
1. Lege eine neue Markdown-Datei unter `src/guides/<slug>.md` an (mit Überschriften, Listen, Codeblöcken usw.).
2. Pflege Meta-Infos (Titel, Summary, Tags, Topic) in `src/data/guides.js`, damit der Guide in Listen & Routen auftaucht.
3. Fertig – das Projekt rendert Inhalte automatisch mit Syntax-Highlighting und Badges.

## Tests & Qualitätschecks
- `npm run lint` / `npm run lint:fix`
- `npm run format:check` / `npm run format`
- `npm test` führt eine Vitest-Suite für **alle** Komponenten, Seiten und Markdown-Helfer aus (`npm run test:watch` für TDD)

Weitere Entwicklerdetails findest du in `docs/README-DEV.md`.

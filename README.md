# DevGuides Template

Ein erweiterbares Tutorial-Template fuer **React + React Router (v6)** mit Markdown-Content, Hashtags und Themenfiltern.

## Features
- Vite + React 18 + React Router 6
- Markdown-Tutorials unter `src/guides/*.md`, automatisch geladen
- Hashtag-Filter und Themen-Navigation fuer schnelle Orientierung
- Responsive Layout mit Suche (⌘/Ctrl+K) und klarer UI-Struktur
- Tailwind CSS inkl. Typography-Plugin
- ESLint + Prettier + Vitest + Testing Library

## Schnellstart
```bash
npm install
npm run dev
```

## Tutorials hinzufuegen
1. Neue Markdown-Datei anlegen: `src/guides/<slug>.md`.
2. Meta-Infos in `src/data/guides.js` ergaenzen:
   - `slug`, `title`, `summary`, `tags`, `topic`.
3. Fertig: Das Tutorial erscheint automatisch in der Uebersicht und in der Suche.

## Tests & Qualitaet
```bash
npm run lint
npm run format:check
npm test
```

Weitere Details findest du in `docs/README-DEV.md`, Schreibregeln in `docs/WRITING-GUIDES.md`.

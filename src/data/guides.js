export const guides = [
  {
    slug: 'react-grundlagen',
    title: 'React Grundlagen',
    summary: 'Komponenten, Props, State – der schnelle Überblick.',
    tags: ['react', 'einsteiger'],
    topic: 'react',
  },
  {
    slug: 'javascript-snippets',
    title: 'JavaScript Snippets',
    summary: 'Häufige Patterns & Utilities für den Alltag.',
    tags: ['javascript', 'snippets'],
    topic: 'javascript',
  },
  {
    slug: 'javascript-functions-2024',
    title: 'JavaScript Funktionen 2024',
    summary: 'Aktuelle Standardfunktionen – von Basics bis Advanced.',
    tags: ['javascript', 'modern', 'best-practices'],
    topic: 'javascript',
  },
  {
    slug: 'typescript-setup',
    title: 'TypeScript Setup',
    summary: 'TS in bestehende React-Apps einführen.',
    tags: ['typescript', 'tooling'],
    topic: 'typescript',
  },
  {
    slug: 'express-quickstart',
    title: 'Express Quickstart',
    summary: 'API-Server in 10 Minuten aufsetzen.',
    tags: ['backend', 'express'],
    topic: 'express',
  },
  {
    slug: 'ssh-github-linux',
    title: 'SSH zu GitHub unter Linux & WSL',
    summary: 'Schritt-für-Schritt Anleitung für Keys, Agent & Verbindungstests.',
    tags: ['git', 'ssh', 'tooling'],
    topic: 'tooling',
  },
  {
    slug: 'linux-mint-sicherheits-tools',
    title: 'Kostenlose Sicherheits-Tools für Linux Mint 22.3',
    summary: 'Scanner, Audit und Isolation für Mint ohne Overkill.',
    tags: ['linux', 'security', 'mint', 'tooling'],
    topic: 'tooling',
  },
]

const tagCounts = guides.reduce((acc, guide) => {
  guide.tags.forEach((tag) => {
    acc[tag] = (acc[tag] || 0) + 1
  })
  return acc
}, {})

export const tagIndex = Object.entries(tagCounts)
  .map(([tag, count]) => ({ tag, count }))
  .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))

export const topics = [
  { key: 'javascript', label: 'JavaScript', description: 'Syntax, Patterns, Snippets' },
  { key: 'react', label: 'React', description: 'Komponenten, Hooks, Router' },
  { key: 'typescript', label: 'TypeScript', description: 'Typen, Tooling, Migrations' },
  { key: 'express', label: 'Express', description: 'Node.js REST-APIs, Middleware' },
  { key: 'tooling', label: 'Tooling', description: 'Git, SSH, DevOps-Helfer' },
]

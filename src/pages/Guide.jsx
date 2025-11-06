import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { guides } from '../data/guides'

const exampleContent = {
  'react-grundlagen': [
    '# React Grundlagen',
    '',
    '**Ziel:** Komponenten, Props, State verstehen.',
    '',
    '## Voraussetzungen',
    '- Node 18+',
    '',
    '## Schritte',
    '```bash',
    'npm create vite@latest my-react -- --template react',
    'cd my-react && npm i && npm run dev',
    '```',
    '',
    '```jsx',
    'import { useState } from "react"',
    '',
    'function Hello({ name }) {',
    '  const [count, setCount] = useState(0)',
    '  return (',
    '    <div>',
    '      <p>Hallo {name}</p>',
    '      <button onClick={() => setCount((c) => c + 1)}>Klicks: {count}</button>',
    '    </div>',
    '  )',
    '}',
    '',
    'export default function App() {',
    '  return <Hello name="World" />',
    '}',
    '```',
  ].join('\n'),
  'javascript-snippets': [
    '# JavaScript Snippets',
    '',
    '## Debounce',
    '```js',
    'function debounce(fn, wait = 200) {',
    '  let timeout',
    '  return (...args) => {',
    '    clearTimeout(timeout)',
    '    timeout = setTimeout(() => fn(...args), wait)',
    '  }',
    '}',
    '```',
    '',
    '## Deep Clone (einfach)',
    '```js',
    'const clone = (obj) => JSON.parse(JSON.stringify(obj))',
    '```',
  ].join('\n'),
  'typescript-setup': [
    '# TypeScript Setup in React (Bestandsprojekt)',
    '```bash',
    'npm i -D typescript @types/react @types/react-dom',
    'npx tsc --init',
    '```',
    '',
    '- .jsx → .tsx',
    "- `import React from 'react'` sicherstellen",
  ].join('\n'),
  'express-quickstart': [
    '# Express Quickstart',
    '```bash',
    'npm i express',
    '```',
    '',
    '```js',
    "import express from 'express'",
    '',
    'const app = express()',
    '',
    "app.get('/api/hello', (req, res) => {",
    '  res.json({ msg: "hi" })',
    '})',
    '',
    "app.listen(3000, () => {",
    '  console.log("http://localhost:3000")',
    '})',
    '```',
  ].join('\n'),
}

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const applyInlineFormatting = (value) =>
  value
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')

const toHtml = (markdown) => {
  const lines = markdown.split(/\r?\n/)
  const parts = []
  let buffer = []
  let listType = null
  let codeBlock = null

  const flushParagraph = () => {
    if (buffer.length) {
      const paragraph = buffer.join(' ')
      parts.push(`<p>${applyInlineFormatting(escapeHtml(paragraph))}</p>`)
      buffer = []
    }
  }

  const flushList = () => {
    if (listType) {
      parts.push(`</${listType}>`)
      listType = null
    }
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd()

    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      if (codeBlock) {
        parts.push(
          `<pre><code${codeBlock.lang ? ` class="language-${codeBlock.lang}"` : ''}>${escapeHtml(
            codeBlock.lines.join('\n')
          )}</code></pre>`
        )
        codeBlock = null
      } else {
        flushParagraph()
        flushList()
        codeBlock = { lang, lines: [] }
      }
      return
    }

    if (codeBlock) {
      codeBlock.lines.push(rawLine)
      return
    }

    if (!line.trim()) {
      flushParagraph()
      flushList()
      return
    }

    if (line.startsWith('# ')) {
      flushParagraph()
      flushList()
      parts.push(`<h1>${applyInlineFormatting(escapeHtml(line.slice(2).trim()))}</h1>`)
      return
    }

    if (line.startsWith('## ')) {
      flushParagraph()
      flushList()
      parts.push(`<h2>${applyInlineFormatting(escapeHtml(line.slice(3).trim()))}</h2>`)
      return
    }

    if (line.startsWith('### ')) {
      flushParagraph()
      flushList()
      parts.push(`<h3>${applyInlineFormatting(escapeHtml(line.slice(4).trim()))}</h3>`)
      return
    }

    const ordered = line.match(/^(\d+)\.\s+(.*)$/)
    if (ordered) {
      flushParagraph()
      if (listType && listType !== 'ol') {
        flushList()
      }
      if (!listType) {
        listType = 'ol'
        parts.push('<ol>')
      }
      parts.push(`<li>${applyInlineFormatting(escapeHtml(ordered[2].trim()))}</li>`)
      return
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      flushParagraph()
      if (listType && listType !== 'ul') {
        flushList()
      }
      if (!listType) {
        listType = 'ul'
        parts.push('<ul>')
      }
      parts.push(`<li>${applyInlineFormatting(escapeHtml(line.slice(2).trim()))}</li>`)
      return
    }

    buffer.push(line)
  })

  if (codeBlock) {
    parts.push(
      `<pre><code${codeBlock.lang ? ` class="language-${codeBlock.lang}"` : ''}>${escapeHtml(
        codeBlock.lines.join('\n')
      )}</code></pre>`
    )
  }

  flushParagraph()
  flushList()

  return parts.join('\n')
}

export default function Guide() {
  const { slug } = useParams()
  const meta = guides.find((guide) => guide.slug === slug)
  const md = exampleContent[slug] || '# Guide in Arbeit\n\nHier entsteht Inhalt.'

  const html = useMemo(() => toHtml(md), [md])

  if (!meta) {
    return (
      <section className="rounded-3xl border border-rose-300/60 bg-rose-50 p-12 text-center text-sm text-rose-600 shadow-lg shadow-rose-200/50 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-100">
        <p className="text-base font-semibold">Guide nicht gefunden.</p>
        <p className="mt-2 text-rose-500 dark:text-rose-200">Bitte wähle einen vorhandenen Guide über die Übersicht.</p>
        <Link className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-500 dark:text-rose-100" to="/guides">
          Zurück zu den Guides
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    )
  }

  return (
    <article className="space-y-10">
      <header className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-black/5 transition-colors duration-300 ease-out dark:border-dracula-border/70 dark:bg-dracula-surface dark:shadow-black/10">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 transition-colors dark:text-dracula-green">
          <span>{meta.topic}</span>
          <span aria-hidden="true">•</span>
          <span>{meta.tags.join(', ')}</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900 transition-colors dark:text-dracula-text md:text-4xl">{meta.title}</h1>
        <p className="mt-3 text-sm text-slate-600 transition-colors dark:text-dracula-muted md:max-w-3xl">{meta.summary}</p>
        <Link
          to="/guides"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition hover:text-brand-500 dark:text-dracula-green dark:hover:text-dracula-purple"
        >
          Alle Guides anzeigen
          <span aria-hidden="true">→</span>
        </Link>
      </header>
      <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-black/5 transition-colors duration-300 ease-out dark:border-dracula-border/70 dark:bg-dracula-surface dark:shadow-black/10">
        <div className="prose prose-lg max-w-none prose-a:text-brand-600 prose-blockquote:border-brand-200 prose-blockquote:text-slate-700 prose-code:text-brand-600 transition-colors dark:prose-invert dark:prose-a:text-dracula-green dark:prose-blockquote:border-dracula-green/60 dark:prose-blockquote:text-dracula-muted dark:prose-code:text-dracula-green">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </article>
  )
}

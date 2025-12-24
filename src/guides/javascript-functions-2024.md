# JavaScript Funktionen & Utilities 2024

**Ziel:** Die wichtigsten modernen JS-APIs schnell nachschlagen – vom Tagesgeschäft bis zu erweiterten Patterns.

> Stand: 2024 – alle Beispiele nutzen moderne Browser/Node 18+ Features.

## Meistgenutzte Funktionen & Methoden

### Arrays & Iterables
- `.map()`, `.filter()`, `.reduce()` für Transformation und Aggregation
- `.find()`, `.some()`, `.every()` für Checks
- `.includes()` & `.at()` (auch negative Indizes)
- `.toSorted()`, `.toReversed()`, `.with()` (ES2023, nicht mutierend)

```js
const scores = [17, 33, 41, 12]
const clean = scores
  .filter((n) => n >= 18)
  .map((n) => n * 2)
  .toSorted((a, b) => b - a)
// [82, 66, 34]
```

### Strings & Zahlen
- `String.prototype.replaceAll`, `.padStart`, `.trimStart/End`
- `Number.isFinite`, `Number.isInteger`, `Math.trunc`, `Math.sign`
- `Intl.NumberFormat`, `Intl.RelativeTimeFormat` für lokalisierte Ausgaben

```js
const pretty = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
pretty.format(1299.5) // → 1.299,50 €
```

### Objekte & Datenstrukturen
- `Object.keys / values / entries` + `Object.fromEntries`
- `structuredClone` für tiefe Kopien inklusive Maps/Sets
- `Map`, `Set`, `WeakMap` für Cache/Lookup Patterns
- `crypto.randomUUID()` für IDs, `URL` & `URLSearchParams` für sichere Strings

```js
const settings = { theme: 'dark', density: 'compact' }
const clone = structuredClone(settings)
const params = new URLSearchParams({ page: 1, q: 'react' })
params.toString() // "page=1&q=react"
```

### Async & Netzwerk
- `fetch` (mit `AbortController`), `Response.json()`
- `Promise.all`, `Promise.allSettled`, `Promise.any`
- `queueMicrotask` für Tasks nach dem Render

```js
const controller = new AbortController()
const request = fetch('/api/users', { signal: controller.signal })
const timeout = setTimeout(() => controller.abort(), 3000)
const users = await request.then((res) => res.json())
clearTimeout(timeout)
```

## Moderne Syntax & Patterns

### Optional Chaining & Nullish Coalescing

```js
const plan = user?.subscription?.plan ?? 'free'
```

### Top-Level await & Dynamic Import

```js
const { default: conf } = await import('./config.json', { with: { type: 'json' } })
```

### Records & Tuples (Stage 2)
- Syntax `#['immutable']`, `#{ key: value }` in experimentellen Runtimes
- Noch kein Standard – nur Roadmap

## Erweiterte Tools & APIs

### Intl APIs für Content
- `Intl.DateTimeFormat` mit `timeStyle`/`dateStyle`
- `Intl.Segmenter` für Textanalyse

### Streams & File APIs
- `ReadableStream`, `WritableStream`, `TransformStream`
- `Blob`, `File`, `FileSystemAccess` (Browser), `fs/promises` (Node)

```js
const response = await fetch('/big-export.csv')
const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
```

### Off-Main-Thread & Performance
- `Web Workers`, `Worker.postMessage`, `structuredClone`
- `Atomics.waitAsync`, `SharedArrayBuffer` für High Performance
- `navigator.locks` API für koordinierte Ressourcen (Chromium, 2024)

---

**Merke:** Setze auf nicht-mutierende Methoden (`toSorted`, `with`), nutze `structuredClone` statt eigener Deep-Copy-Utilities und plane Abbrüche (`AbortController`) standardmäßig ein.

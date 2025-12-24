# JavaScript Praxis Guide 2024

Aktuelle Sprachfeatures, Best Practices und Patterns – jedes Feature mit Beispiel. Läuft in modernen Browsern oder Node 18+.

## 1. Basis-Syntax

### `const`, `let` & Boolean
`const` für unveränderte Referenzen, `let` wenn du neu zuweist. `Boolean()` normalisiert Truthy/Falsy.

```js
const userName = 'Aylin'
let points = 0
points += 10

const isPremium = Boolean(points >= 10)
const profile = { name: userName, plan: isPremium ? 'pro' : 'free' }
```

### Destructuring mit Defaults
Ziehe verschachtelte Werte und setze Defaults.

```js
const response = { data: { name: 'Kai', roles: ['admin'] } }
const {
  data: { name, roles: [primaryRole = 'user'] = [] } = {},
} = response
```

## 2. Arrays & Iterables

### `Array.prototype.map`
Transformiert jedes Element und gibt ein neues Array zurück.

```js
const prices = [9, 15, 30]
const withTax = prices.map((value) => value * 1.19)
```

### `Array.prototype.filter`
Behält nur Elemente, die wahr zurückgeben.

```js
const tasks = [
  { id: 1, done: true },
  { id: 2, done: false },
]
const openTasks = tasks.filter((task) => !task.done)
```

### `Array.prototype.reduce`
Verdichtet ein Array auf einen Wert.

```js
const cart = [12, 6, 9]
const total = cart.reduce((sum, price) => sum + price, 0)
```

### `Array.prototype.find`
Gibt das erste passende Element zurück.

```js
const users = [
  { id: 1, role: 'user' },
  { id: 2, role: 'admin' },
]
const admin = users.find(({ role }) => role === 'admin')
```

### `Array.prototype.some` & `every`
`some` prüft mindestens ein Match, `every` alle Elemente.

```js
const flags = ['ready', 'synced', 'valid']
flags.some((flag) => flag === 'error')
flags.every((flag) => flag.length > 3)
```

### `Array.prototype.includes` & `at`
`includes` prüft Werte, `at` erlaubt negative Indizes.

```js
const stack = ['init', 'loading', 'ready']
stack.includes('ready')
stack.at(-1)
```

### `Array.prototype.toSorted`
Sortiert ohne das Original zu verändern.

```js
const scores = [44, 12, 88]
const ranked = scores.toSorted((a, b) => b - a)
```

### `Array.prototype.toReversed`
Erzeugt eine umgekehrte Kopie.

```js
const pipeline = ['build', 'test', 'deploy']
const rollback = pipeline.toReversed()
```

### `Array.prototype.with`
Ersetzt einen Wert immutabel.

```js
const steps = ['todo', 'doing', 'done']
const board = steps.with(1, 'review')
```

### `Array.prototype.flatMap`
Kombiniert `map` und `flat`.

```js
const modules = [
  { name: 'auth', routes: ['/login', '/logout'] },
  { name: 'account', routes: ['/settings'] },
]
const routes = modules.flatMap(({ routes }) => routes)
```

## 3. Strings & Zahlen

### `String.prototype.replaceAll`
Ersetzt alle Vorkommen.

```js
'JS & JS'.replaceAll('JS', 'JavaScript')
```

### `String.prototype.padStart`
Polstert links.

```js
'42'.padStart(6, '0')
```

### `String.prototype.trimStart/trimEnd`
Entfernt Whitespace einseitig.

```js
const raw = '   hello world  '
raw.trimStart()
raw.trimEnd()
```

### `Number.isFinite` & `Number.isInteger`
Validiere Zahlen.

```js
const input = Number('12.5')
Number.isFinite(input)
Number.isInteger(input)
```

### `Math.trunc` & `Math.sign`
Ganzzahl & Vorzeichen.

```js
Math.trunc(3.9)
Math.sign(-42)
```

### `Intl.NumberFormat`
Lokalisierte Zahlen.

```js
const currency = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
currency.format(1299.5)
```

## 4. Objekte, Maps & Daten

### `Object.keys/values/entries`
Iteriere über Objekte.

```js
const profile = { name: 'Lina', plan: 'pro' }
Object.keys(profile)
Object.values(profile)
Object.entries(profile)
```

### `Object.fromEntries`
Baut Objekte aus Paaren.

```js
const params = new URLSearchParams('view=list&page=2')
const filters = Object.fromEntries(params)
```

### `structuredClone`
Tiefe Kopien inkl. Map/Set.

```js
const state = { tags: new Set(['react']) }
const copy = structuredClone(state)
```

### `Map` & `Set`
Strukturierte Daten.

```js
const permissions = new Map([
  ['editor', ['read', 'write']],
])
const tags = new Set(['design'])
tags.add('ux')
```

### `URLSearchParams`
Sicherer Querystring.

```js
const query = new URLSearchParams({ page: 1, q: 'react' })
query.toString()
```

### `crypto.randomUUID`
Erzeugt IDs.

```js
const id = crypto.randomUUID()
```

## 5. Async & Netzwerk

### `fetch` + `AbortController`
Steuere Timeouts aktiv.

```js
const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 5000)

try {
  const res = await fetch('/api/news', { signal: controller.signal })
  const data = await res.json()
  console.log(data)
} finally {
  clearTimeout(timeout)
}
```

### `Promise.all` & `Promise.allSettled`
Parallel ausführen.

```js
const requests = ['/stats', '/sales'].map((url) => fetch(url))
await Promise.all(requests)
await Promise.allSettled(requests)
```

### `Promise.any`
Erstes erfülltes Promise.

```js
const mirrors = ['https://1.example', 'https://2.example']
const first = await Promise.any(mirrors.map((url) => fetch(url)))
```

### `queueMicrotask`
Callback nach Render.

```js
queueMicrotask(() => {
  console.log('DOM aktualisiert')
})
```

## 6. DOM & Browser APIs

### `addEventListener` + Delegation

```js
const list = document.querySelector('[data-actions]')
list.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]')
  if (!button) return
  console.log('Action:', button.dataset.action)
})
```

### `IntersectionObserver`

```js
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting)
    }),
  { threshold: 0.3 }
)

document.querySelectorAll('[data-reveal]').forEach((section) => observer.observe(section))
```

### `navigator.clipboard.writeText`

```js
await navigator.clipboard.writeText('Copied!')
```

## 7. Tooling & Debugging

### `console.time` & `console.timeEnd`

```js
console.time('heavy-task')
await runHeavyTask()
console.timeEnd('heavy-task')
```

### `structuredClone` im Worker

```js
const worker = new Worker('./worker.js')
worker.postMessage(structuredClone({ payload: [1, 2, 3] }))
```

---

**Merke:** Arbeite immutabel, dokumentiere jede genutzte Funktion direkt am Beispiel und setze Timeouts/Fallbacks bei Async-Tasks konsequent um.

## Checkliste
- Moderne Syntax (Destructuring, `const`/`let`) genutzt.
- Arrays/Objekte immutabel bearbeitet.
- Async-Requests mit Timeout/Abort abgesichert.
- Browser-APIs (Observer, Clipboard) mit Guards eingesetzt.
- Tooling-Hilfen (`console.time`, Worker) fuer Debugging genutzt.

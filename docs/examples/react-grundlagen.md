# React Grundlagen

**Ziel:** Komponenten, Props, State verstehen.

## Voraussetzungen
- Node 18+

## Schritte
```bash
npm create vite@latest my-react -- --template react
cd my-react && npm i && npm run dev
```

```jsx
import { useState } from 'react'

function Hello({ name }) {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>Hallo {name}</p>
      <button onClick={() => setCount((c) => c + 1)}>Klicks: {count}</button>
    </div>
  )
}

export default function App() {
  return <Hello name="World" />
}
```

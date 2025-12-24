# Express Quickstart

```bash
npm i express
```

```js
import express from 'express'

const app = express()

app.get('/api/hello', (req, res) => {
  res.json({ msg: 'hi' })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
```

## Checkliste
- Express installiert und `app` gestartet.
- Route `/api/hello` liefert JSON.
- Server lauscht auf `http://localhost:3000`.

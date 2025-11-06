# JavaScript Snippets

## Debounce
```js
export function debounce(fn, wait = 200) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), wait)
  }
}
```

## Deep Clone (einfach)
```js
export const clone = (obj) => JSON.parse(JSON.stringify(obj))
```

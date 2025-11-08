import '@testing-library/jest-dom/vitest'

const createMatchMedia = () => ({
  matches: false,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
})

if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = () => createMatchMedia()
}

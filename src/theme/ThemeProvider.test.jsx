import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ThemeProvider, useTheme } from './ThemeProvider'

const matchMediaMock = (matches) => ({
  matches,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
})

function ConsumerButton() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button type="button" onClick={toggleTheme}>
      aktuelles-theme:{theme}
    </button>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn(() => matchMediaMock(false)))
    window.localStorage.clear()
    document.documentElement.className = ''
    document.documentElement.removeAttribute('data-theme')
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  test('setzt initiales Theme auf light, wenn kein Storage-Wert vorhanden', () => {
    render(
      <ThemeProvider>
        <ConsumerButton />
      </ThemeProvider>
    )

    expect(document.documentElement.classList.contains('light')).toBe(true)
    expect(screen.getByRole('button', { name: /aktuelles-theme/i })).toHaveTextContent('aktuelles-theme:light')
  })

  test('übernimmt gespeichertes Theme aus localStorage', () => {
    window.localStorage.setItem('devguides-theme', 'dark')
    vi.stubGlobal('matchMedia', vi.fn(() => matchMediaMock(true)))

    render(
      <ThemeProvider>
        <ConsumerButton />
      </ThemeProvider>
    )

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(screen.getByRole('button', { name: /aktuelles-theme/i })).toHaveTextContent('aktuelles-theme:dark')
  })

  test('toggleTheme wechselt zwischen light und dark und persistiert', async () => {
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <ConsumerButton />
      </ThemeProvider>
    )

    const toggle = screen.getByRole('button', { name: /aktuelles-theme/i })
    await user.click(toggle)

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(window.localStorage.getItem('devguides-theme')).toBe('dark')
    expect(toggle).toHaveTextContent('aktuelles-theme:dark')

    await user.click(toggle)

    expect(document.documentElement.classList.contains('light')).toBe(true)
    expect(window.localStorage.getItem('devguides-theme')).toBe('light')
    expect(toggle).toHaveTextContent('aktuelles-theme:light')
  })
})

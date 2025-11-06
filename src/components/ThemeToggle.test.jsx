import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import ThemeToggle from './ThemeToggle'
import { ThemeProvider } from '../theme/ThemeProvider'

const matchMediaMock = (matches) => ({
  matches,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
})

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.className = ''
    document.documentElement.removeAttribute('data-theme')
    vi.stubGlobal('matchMedia', vi.fn(() => matchMediaMock(false)))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('schaltet per Klick zwischen hellem und dunklem Theme', async () => {
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const toggleButton = screen.getByRole('button', { name: /dunkles theme aktivieren/i })
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false')
    expect(document.documentElement.classList.contains('light')).toBe(true)

    await user.click(toggleButton)

    expect(toggleButton).toHaveAttribute('aria-pressed', 'true')
    expect(toggleButton).toHaveAccessibleName(/helles theme aktivieren/i)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})

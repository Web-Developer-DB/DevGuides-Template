import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import Navbar from './Navbar'
import { renderWithProviders } from '../test/utils'

describe('Navbar', () => {
  test('zeigt alle Hauptlinks in der Desktop-Navigation', () => {
    renderWithProviders(<Navbar />)

    expect(screen.getByRole('link', { name: /start/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /tutorials/i })).toHaveAttribute('href', '/guides')
    expect(screen.getByRole('link', { name: /Themen/i })).toHaveAttribute('href', '/topics')
    expect(screen.getByRole('link', { name: /hashtags/i })).toHaveAttribute('href', '/guides#hashtags')
  })

  test('öffnet und schließt das Mobile-Menü', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Navbar />)

    const toggle = screen.getByRole('button', { name: /navigation öffnen/i })
    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()

    await user.click(toggle)
    const mobileNav = screen.getByRole('navigation', { name: /mobile navigation/i })
    expect(mobileNav).toBeVisible()

    await user.click(within(mobileNav).getByRole('link', { name: /start/i }))
    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()
  })
})

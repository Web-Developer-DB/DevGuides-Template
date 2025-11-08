import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import Guides from './Guides'
import { renderWithProviders } from '../test/utils'

describe('Guides page', () => {
  test('filtert Guides anhand der Suche', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Guides />)

    const input = screen.getByLabelText(/suche/i)
    await user.type(input, 'Express')

    expect(screen.getByText('Express Quickstart')).toBeInTheDocument()
    expect(screen.queryByText('React Grundlagen')).not.toBeInTheDocument()
  })

  test('zeigt Hinweis, wenn keine Treffer vorhanden sind', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Guides />)

    const input = screen.getByLabelText(/suche/i)
    await user.type(input, 'zzzz')

    expect(screen.getByText(/Keine Treffer/i)).toBeInTheDocument()
  })
})

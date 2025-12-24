import { screen, waitFor } from '@testing-library/react'
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

  test('filtert Guides per Hashtag-Button', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Guides />)

    const reactTag = screen.getByRole('button', { name: /#react/i })
    await user.click(reactTag)

    expect(screen.getByText('React Grundlagen')).toBeInTheDocument()
    expect(screen.queryByText('Express Quickstart')).not.toBeInTheDocument()
  })

  test('uebernimmt tag-Parameter in die Suche', async () => {
    renderWithProviders(<Guides />, { route: '/guides?tag=express' })

    const input = screen.getByLabelText(/suche/i)
    await waitFor(() => expect(input).toHaveValue('#express'))
    expect(screen.getByText('Express Quickstart')).toBeInTheDocument()
  })
})

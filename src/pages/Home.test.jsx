import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import Home from './Home'
import { renderWithProviders } from '../test/utils'

describe('Home page', () => {
  test('zeigt Hero und Call-to-Action Links', () => {
    renderWithProviders(<Home />)

    expect(screen.getByRole('heading', { level: 1, name: /DevGuides/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Jetzt Guides entdecken/i })).toHaveAttribute('href', '/guides')
    expect(screen.getByRole('link', { name: /Themenübersicht ansehen/i })).toHaveAttribute('href', '/topics')
  })

  test('listet alle Highlight-Karten', () => {
    renderWithProviders(<Home />)
    const highlightHeadings = screen.getAllByRole('heading', { level: 2 })
    expect(highlightHeadings.length).toBeGreaterThanOrEqual(3)
  })
})

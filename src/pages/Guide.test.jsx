import { screen } from '@testing-library/react'
import { Routes, Route } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import Guide from './Guide'
import { renderWithProviders } from '../test/utils'

describe('Guide page', () => {
  test('rendert Markdown-Inhalt des Guides', () => {
    renderWithProviders(
      <Routes>
        <Route path="/guides/:slug" element={<Guide />} />
      </Routes>,
      { route: '/guides/react-grundlagen' }
    )

    expect(screen.getAllByRole('heading', { level: 1, name: 'React Grundlagen' })).toHaveLength(2)
    expect(screen.getByText(/npm create vite@latest/)).toBeInTheDocument()
  })

  test('zeigt Hinweis für fehlende Guides', () => {
    renderWithProviders(
      <Routes>
        <Route path="/guides/:slug" element={<Guide />} />
      </Routes>,
      { route: '/guides/unknown' }
    )

    expect(screen.getByText(/Tutorial nicht gefunden/i)).toBeInTheDocument()
  })
})

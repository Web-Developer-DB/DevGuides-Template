import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Routes, Route } from 'react-router-dom'
import Topic from './Topic'
import { renderWithProviders } from '../test/utils'

describe('Topic page', () => {
  test('zeigt Guides für ein vorhandenes Thema', () => {
    renderWithProviders(
      <Routes>
        <Route path="/topics/:topic" element={<Topic />} />
      </Routes>,
      { route: '/topics/javascript' }
    )

    expect(screen.getByRole('heading', { level: 1, name: /javascript/i })).toBeInTheDocument()
    expect(screen.getByText('JavaScript Snippets')).toBeInTheDocument()
  })

  test('informiert bei unbekanntem Thema', () => {
    renderWithProviders(
      <Routes>
        <Route path="/topics/:topic" element={<Topic />} />
      </Routes>,
      { route: '/topics/unknown' }
    )

    expect(screen.getByText(/Thema nicht gefunden/i)).toBeInTheDocument()
  })
})

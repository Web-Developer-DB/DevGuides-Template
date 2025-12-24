import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import App from './App'
import { renderWithProviders } from './test/utils'

describe('App shell', () => {
  test('rendert Navbar, Footer und die Startseite', () => {
    renderWithProviders(<App />)

    expect(screen.getByText('DevGuides Template')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Tutorials ansehen/i })).toBeInTheDocument()
    expect(screen.getByText(/DevGuides Template\./i)).toBeInTheDocument()
  })
})

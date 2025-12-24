import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import Footer from './Footer'
import { renderWithProviders } from '../test/utils'

describe('Footer', () => {
  test('zeigt das aktuelle Jahr und den Tutorial-Hinweis', () => {
    renderWithProviders(<Footer />)

    const year = new Date().getFullYear().toString()
    expect(screen.getByText((content) => content.includes(year))).toBeInTheDocument()
    expect(screen.getByText(/Tutorials, geordnet mit Themen und Hashtags/i)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /impressum/i })).not.toBeInTheDocument()
  })
})

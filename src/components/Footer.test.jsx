import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import Footer from './Footer'
import { renderWithProviders } from '../test/utils'

describe('Footer', () => {
  test('zeigt das aktuelle Jahr und rechtliche Links', () => {
    renderWithProviders(<Footer />)

    const year = new Date().getFullYear().toString()
    expect(screen.getByText((content) => content.includes(year))).toBeInTheDocument()

    const impressumLink = screen.getByRole('link', { name: /impressum/i })
    expect(impressumLink).toHaveAttribute('href', 'https://example.com/impressum')
    expect(impressumLink).toHaveAttribute('target', '_blank')
  })
})

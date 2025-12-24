import { screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import Topics from './Topics'
import { renderWithProviders } from '../test/utils'
import { topics } from '../data/guides'

describe('Topics page', () => {
  test('rendert alle Themenkarten', () => {
    renderWithProviders(<Topics />)

    topics.forEach((topic) => {
      expect(screen.getByText(topic.label)).toBeInTheDocument()
    })

    const detailLinks = screen.getAllByRole('link', { name: /tutorials öffnen/i })
    expect(detailLinks).toHaveLength(topics.length)
    detailLinks.forEach((link, index) => {
      expect(link).toHaveAttribute('href', `/topics/${topics[index].key}`)
    })
  })
})

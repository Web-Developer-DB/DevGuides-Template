import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import { ThemeProvider } from '../theme/ThemeProvider'

export const renderWithProviders = (ui, { route = '/', historyEntries } = {}) => {
  const entries = historyEntries || [route]
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={entries}>{ui}</MemoryRouter>
    </ThemeProvider>
  )
}

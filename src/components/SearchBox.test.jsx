import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { useState } from 'react'
import SearchBox from './SearchBox'

function ControlledSearchBox(props) {
  const [value, setValue] = useState('')
  return (
    <SearchBox
      {...props}
      value={value}
      onChange={(next) => {
        setValue(next)
        props.onChange?.(next)
      }}
    />
  )
}

describe('SearchBox', () => {
  test('ruft onChange mit dem aktuellen Wert auf', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<ControlledSearchBox onChange={handleChange} placeholder="Guides suchen" />)

    const input = screen.getByLabelText(/suche/i)
    await user.type(input, 'react')

    expect(handleChange).toHaveBeenCalledWith('react')
  })

  test('fokussiert das Feld, wenn autoFocus gesetzt ist', async () => {
    render(<SearchBox value="" onChange={() => {}} autoFocus />)
    const input = screen.getByLabelText(/suche/i)
    await waitFor(() => expect(document.activeElement).toBe(input))
  })
})

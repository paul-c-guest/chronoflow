// @vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import { waitFor } from '@testing-library/react'
import nock from 'nock'

import { renderRoute } from './test-utils'

describe('<CountrySelect />', () => {
  it('renders a list of countries as options', async () => {
    nock('http://localhost')
      .get('/api/v1/inventions')
      .reply(200, [
        {
          id: 1,
          invention: 'something cool',
          inventor: 'someone cool',
          country: 'China',
          year: 1,
          description: 'someone cool made something cool',
          image: 'image goes here',
        },
        {
          id: 2,
          invention: 'something cooler',
          inventor: 'someone cooler',
          country: 'Germany',
          year: 10,
          description: 'someone cooler made something cooler',
          image: 'image goes here',
        },
      ])

    const { ...screen } = renderRoute('/')

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    const selectElement = screen.getByRole('combobox')
    const options = screen.getAllByRole('option')

    expect(selectElement).toBeVisible()
    expect(options).toHaveLength(3)
  })
  it('can let a user select a country', async () => {
    nock('http://localhost')
      .get('/api/v1/inventions')
      .reply(200, [
        {
          id: 1,
          invention: 'something cool',
          inventor: 'someone cool',
          country: 'China',
          year: 1,
          description: 'someone cool made something cool',
          image: 'image goes here',
        },
        {
          id: 2,
          invention: 'something cooler',
          inventor: 'someone cooler',
          country: 'Germany',
          year: 10,
          description: 'someone cooler made something cooler',
          image: 'image goes here',
        },
      ])

    const { user, ...screen } = renderRoute('/')

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    const selectElement = screen.getByRole('combobox')
    const chinaOption = screen.getAllByRole('option')[1]

    expect(chinaOption).not.toBeChecked()
    expect(selectElement).toHaveValue('disabledOption')

    await user.selectOptions(selectElement, chinaOption)

    const updatedSelectElement = screen.getByRole('combobox')
    expect(updatedSelectElement).toHaveValue('China')
  })
})

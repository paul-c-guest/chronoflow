// @vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import { waitFor } from '@testing-library/react'
import nock from 'nock'

import { renderRoute } from './test-utils'

describe('<Filters>', () => {
  it('renders three checkboxes and a title', async () => {
    nock('http://localhost')
      .get('/api/v1/inventions')
      .reply(200, [
        {
          id: 1,
          invention: 'something cool',
          inventor: 'someone cool',
          country: 'somewhere cool',
          year: 1,
          description: 'someone cool made something cool',
          image: 'image goes here',
        },
        {
          id: 2,
          invention: 'something cooler',
          inventor: 'someone cooler',
          country: 'somewhere cooler',
          year: 10,
          description: 'someone cooler made something cooler',
          image: 'image goes here',
        },
      ])

    const { ...screen } = renderRoute('/')

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    const title = screen.getByRole('heading', { name: /filter/i })
    const checkboxes = screen.getAllByRole('checkbox')

    expect(title.textContent).toBe('Filter your events')
    expect(checkboxes).toHaveLength(3)
  })

  it('allows user to check a checkbox', async () => {
    nock('http://localhost')
      .get('/api/v1/inventions')
      .reply(200, [
        {
          id: 1,
          invention: 'something cool',
          inventor: 'someone cool',
          country: 'somewhere cool',
          year: 1,
          description: 'someone cool made something cool',
          image: 'image goes here',
        },
        {
          id: 2,
          invention: 'something cooler',
          inventor: 'someone cooler',
          country: 'somewhere cooler',
          year: 10,
          description: 'someone cooler made something cooler',
          image: 'image goes here',
        },
      ])

    const { user, ...screen } = renderRoute('/')
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    const checkbox = screen.getAllByRole('checkbox')[0]
    await user.click(checkbox)

    expect(checkbox).toBeChecked()
  })
})

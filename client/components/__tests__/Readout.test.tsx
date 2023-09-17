// @vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import nock from 'nock'

import { renderRoute } from './test-utils'

describe('<Readout>', () => {
  it('renders three checkboxes and a title', async () => {
    nock('http://localhost')
      .get('/api/v1/inventions')
      .reply(200, [
        {
          id: 1,
          invention: 'Wheelbarrow',
          inventor: 'Zhuge Liang',
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

    renderRoute('/1')

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    })

    const title = screen.getByRole('heading', { name: /wheelbarrow/i })
    const inventor = screen.getByText(/Zhuge Liang/i)
    const description = screen.getByText(/someone cool made something cool/i)
    const image = screen.getByRole('img', { name: 'Wheelbarrow' })

    expect(title).toBeVisible()
    expect(inventor).toBeVisible()
    expect(description).toBeVisible()
    expect(image).toBeVisible()
  })
})

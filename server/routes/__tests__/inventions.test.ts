import { vi, describe, it, expect, beforeEach } from 'vitest'
import server from '../../server'
import request from 'supertest'
import * as db from '../../db/functions'

vi.mock('../../db/functions')

beforeEach(async () => {
  vi.resetAllMocks()
})

describe('GET /api/v1/inventions', () => {
  it('should return all inventions', async () => {
    vi.mocked(db.getAllInventions).mockResolvedValue([
      {
        id: 1,
        invention: 'something cool',
        inventor: 'someone cool',
        country: 'somewhere cool',
        year: 1,
        description: 'someone cool made somethig cool',
        image: 'image goes here',
      },
      {
        id: 2,
        invention: 'something cooler',
        inventor: 'someone cooler',
        country: 'somewhere cooler',
        year: 10,
        description: 'someone cooler made somethig cooler',
        image: 'image goes here',
      },
    ])

    const response = await request(server).get('/api/v1/inventions')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
  })
})

import { vi, describe, it, expect, beforeEach } from 'vitest'
import server from '../../server'
import request from 'supertest'
import * as db from '../../db/functions'

vi.mock('../../db/functions')

beforeEach(async () => {
  vi.resetAllMocks()
})

describe('GET /api/v1/worldEvents', () => {
  it('should return all worldEvents', async () => {
    vi.mocked(db.getAllInventions).mockResolvedValue([
      {
        id: 1,
        name: 'something cool happened',
        year: 1,
        country: 'somewhere cool',
        description: 'something cool happened somewhere cool',
        image: 'image goes here',
      },
      {
        id: 2,
        name: 'something awesome happened',
        year: 1,
        country: 'somewhere awesome',
        description: 'something awesome happened somewhere awesome',
        image: 'image goes here',
      },
    ])

    const response = await request(server).get('/api/v1/inventions')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
  })
})

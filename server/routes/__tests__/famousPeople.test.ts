import { vi, describe, it, expect, beforeEach } from 'vitest'
import server from '../../server'
import request from 'supertest'
import * as db from '../../db/functions'

vi.mock('../../db/functions')

beforeEach(async () => {
  vi.resetAllMocks()
})

describe('GET /api/v1/famousPeople', () => {
  it('should return all famous people', async () => {
    vi.mocked(db.getAllFamousPeople).mockResolvedValue([
      {
        id: 1,
        name: 'Someone Cool',
        year_born: 1,
        year_died: 20,
        country: 'Somewhere Cool',
        known_for: 'Doing something cool',
        image: 'image goes here',
      },
      {
        id: 2,
        name: 'Someone Famous',
        year_born: 8,
        year_died: 45,
        country: 'Somewhere Famous',
        known_for: 'Doing something famous',
        image: 'image goes here',
      },
    ])

    const response = await request(server).get('/api/v1/famousPeople')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
  })
})

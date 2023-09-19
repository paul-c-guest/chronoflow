import { vi, describe, it, expect, beforeEach } from 'vitest'
import server from '../../server'
import request from 'supertest'
import * as db from '../../db/functions'

vi.mock('../../db/functions')

beforeEach(async () => {
  vi.resetAllMocks()
})

describe('GET /api/v1/newZealand', () => {
  it('should return all New Zealand Information', async () => {
    vi.mocked(db.getAllNewZealand).mockResolvedValue([
      {
        id: 1,
        identifier: 'person',
        name_one: 'Someone Cool',
        name_two: null,
        year_one: 1,
        year_two: 20,
        decription: 'Someone cool',
        image: 'image goes here',
      },
      {
        id: 2,
        identifier: 'event',
        name_one: 'Something Cool',
        name_two: null,
        year_one: 1,
        year_two: null,
        decription: 'Something cool',
        image: 'image goes here',
      },
      {
        id: 3,
        identifier: 'invention',
        name_one: 'Something Cool',
        name_two: 'Someone Cool',
        year_one: 1,
        year_two: null,
        decription: 'Something cool made by someone cool',
        image: 'image goes here',
      },
    ])

    const response = await request(server).get('/api/v1/newZealand')

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(3)
  })
})
// 'id',
// 'identifier', //event, invention or person
// 'name_one as nameOne', //name of person, name of event or name of invention
// 'name_two as nameTwo', //name of inventor - null if not invention
// 'year_one as yearOne', //birth year, year of event or year of invention
// 'year_two as yearTwo', //year of death - null if not person
// 'description', //known for person, description for event & invention
// 'image' //image of person or event or invention

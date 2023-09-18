import request from 'superagent'

import type { Person } from '../../models/People'

export async function getAllPeople() {
  const response = await request.get('/api/v1/famousPeople')
  return response.body as Person[]
}

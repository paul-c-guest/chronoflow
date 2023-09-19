import request from 'superagent'
import type { Event } from '../../models/Events'

export async function getAllEvents() {
  const response = await request.get('/api/v1/worldEvents')
  return response.body as Event[]
}

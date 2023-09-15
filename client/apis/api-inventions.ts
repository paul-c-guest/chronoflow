import request from 'superagent'
import { Invention } from '../../models/Inventions'

export async function getAllInventions(): Promise<Invention[]> {
  const response = await request.get('/api/v1/inventions')
  return response.body as Invention[]
  
}
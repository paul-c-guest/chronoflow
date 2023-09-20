import request from 'superagent'
// TODO: add model

export async function getNewZealandInventionsData() {
  const response = await request.get('/api/v1/newZealand/inventions')
  return response.body
}

export async function getNewZealandEventsData() {
  const response = await request.get('/api/v1/newZealand/events')
  return response.body
}
export async function getNewZealandPeopleData() {
  const response = await request.get('/api/v1/newZealand/people')
  return response.body
}

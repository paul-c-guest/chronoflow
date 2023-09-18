import db from './connection'
//import models

//GET all inventions
export async function getAllInventions() {
  return await db('inventions').select('')
}

//GET all famous people
export async function getAllFamousPeople() {
  return await db('famous_people').select(
    'id',
    'name',
    'year_born as yearBorn',
    'year_died as yearDied',
    'country',
    'known_for as knownFor',
    'image'
  )
}

//GET all world events
export async function getAllWorldEvents() {
  return await db('world_events').select('')
}

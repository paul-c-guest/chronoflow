import db from './connection'
//import models

//GET all inventions
export async function getAllInventions() {
  return await db('inventions').select('')
}
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

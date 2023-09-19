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

//GET all New Zealand
export async function getAllNewZealand() {
  return await db('new_zealand').select(
    'id',
    'identifier', //event, invention or person
    'name_one as nameOne', //name of person, name of event or name of invention
    'name_two as nameTwo', //name of inventor - null if not invention
    'year_one as yearOne', //birth year, year of event or year of invention
    'year_two as yearTwo', //year of death - null if not person
    'description', //known for person, description for event & invention
    'image' //image of person or event or invention
  )
}

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
export async function getNewZealandPeople() {
  return await db('new_zealand').where('identifier', 'people').select(
    'id',
    'name_one as name', //name of person, name of event or name of invention
    'year_one as yearBorn', //birth year, year of event or year of invention
    'year_two as yearDied', //year of death - null if not person
    'description as knownFor', //known for person, description for event & invention
    'image' //image of person or event or invention
  )
}

//GET all New Zealand
export async function getNewZealandInventions() {
  return await db('new_zealand').where('identifier', 'invention').select(
    'id',
    'name_one as invention', //name of person, name of event or name of invention
    'name_two as inventor', //name of inventor - null if not invention
    'year_one as year', //birth year, year of event or year of invention
    'description', //known for person, description for event & invention
    'image' //image of person or event or invention
  )
}

//GET all New Zealand
export async function getNewZealandEvents() {
  return await db('new_zealand').where('identifier', 'event').select(
    'id',
    'name_one as name', //name of person, name of event or name of invention
    'year_one as year', //birth year, year of event or year of invention
    'description', //known for person, description for event & invention
    'image' //image of person or event or invention
  )
}

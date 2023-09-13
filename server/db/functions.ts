import db from './connection'
//import models

//GET all inventions
export async function getAllInventions() {
  return await db('inventions').select('')
}

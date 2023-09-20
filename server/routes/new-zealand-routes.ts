import express from 'express'
import * as db from '../db/functions'

const router = express.Router()

//GET New Zealand people info
router.get('/people', async (req, res, next) => {
  try {
    const response = await db.getNewZealandPeople()
    res.json(response)
  } catch (err) {
    next(err)
  }
})

//GET New Zealand inventions info
router.get('/inventions', async (req, res, next) => {
  try {
    const response = await db.getNewZealandInventions()
    res.json(response)
  } catch (err) {
    next(err)
  }
})

//GET New Zealand events info
router.get('/events', async (req, res, next) => {
  try {
    const response = await db.getNewZealandEvents()
    res.json(response)
  } catch (err) {
    next(err)
  }
})

export default router

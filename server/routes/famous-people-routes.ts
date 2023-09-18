import express from 'express'
import * as db from '../db/functions'

const router = express.Router()

// GET all famous people
router.get('/', async (req, res, next) => {
  try {
    const response = await db.getAllFamousPeople()
    res.json(response)
  } catch (err) {
    next(err)
  }
})

export default router

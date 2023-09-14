import express from 'express'
import * as db from '../db/functions'

const router = express.Router()

//GET all inventions
router.get('/', async (req, res, next) => {
  try {
    const response = await db.getAllInventions()
    res.json(response)
  } catch (err) {
    next(err)
  }
})

export default router

import { it, describe, expect, beforeEach, beforeAll, afterAll } from 'vitest'
import connection from '../connection.ts'
import * as db from '../functions.ts'

//BEFORE ALL TESTS RUN MIGRATIONS
beforeAll(() => {
  return connection.migrate.latest()
})

//BEFORE ALL TESTS RUN SEEDS
beforeEach(async () => {
  await connection.seed.run()
})

//AFTER ALL TESTS CLOSE CONNECTION
afterAll(async () => {
  await connection.destroy()
})

//TEST
describe('getAlNewZealand', () => {
  it('should get a list of all New Zealand information', async () => {
    const newZealand = await db.getAllNewZealand()

    expect(newZealand).toHaveLength(25)
    expect(newZealand[0].nameOne).toBe('Polynesian Settlement')
    expect(newZealand[4].yearOne).toBe(1860)
  })
})

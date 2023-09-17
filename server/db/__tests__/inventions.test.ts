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
describe('getAllInventions', () => {
  it('should get a list of inventions', async () => {
    const inventions = await db.getAllInventions()

    expect(inventions).toHaveLength(14)
    expect(inventions[0].invention).toBe('Paper')
    expect(inventions[4].country).toBe('Germany')
  })
})

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
describe('getAllWorldEvents', () => {
  it('should get a list of inventions', async () => {
    const events = await db.getAllWorldEvents()

    expect(events).toHaveLength(10)
    expect(events[0].name).toBe('Construction of the Colosseum')
    expect(events[4].country).toBe('Guatemala')
  })
})

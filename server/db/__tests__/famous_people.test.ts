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
describe('getAllFamousPeople', () => {
  it('should get a list of famous people', async () => {
    const famous_people = await db.getAllFamousPeople()

    expect(famous_people).toHaveLength(15)
    expect(famous_people[0].name).toBe('Augustus Caesar')
    expect(famous_people[3].country).toBe('Mongol Empire')
  })
})

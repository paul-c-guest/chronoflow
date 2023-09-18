/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('famous_people', (table) => {
    table.increments('id')
    table.string('name')
    table.integer('year_born')
    table.integer('year_died')
    table.string('country')
    table.text('known_for')
    table.string('image')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('famous_people')
}

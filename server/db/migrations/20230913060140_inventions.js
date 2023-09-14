/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('inventions', (table) => {
    table.increments('id')
    table.string('invention')
    table.string('inventor')
    table.string('country')
    table.integer('year')
    table.text('description')
    table.string('image')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('inventions')
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('new_zealand', (table) => {
    table.increments('id')
    table.string('identifier') //event, invention or person
    table.string('name_one') //name of person, name of event or name of invention
    table.string('name_two') //name of inventor - null if not invention
    table.integer('year_one') //birth year, year of event or year of invention
    table.integer('year_two') //year of death - null if not person
    table.text('description') //known for person, description for event & invention
    table.string('image') //image of person or event or invention
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('new_zealand')
}

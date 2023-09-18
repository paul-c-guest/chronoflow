export async function seed(knex) {
  await knex('world_events').del()
  await knex('famous_people').del()
  await knex('inventions').del()
}

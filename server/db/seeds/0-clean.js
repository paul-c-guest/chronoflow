export async function seed(knex) {
  await knex('inventions').del()
}

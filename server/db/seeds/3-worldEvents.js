/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('world_events').insert([
    {
      id: 1,
      name: 'Construction of the Colosseum',
      year: 70,
      country: 'Italy',
      description:
        'The construction of the Colosseum in Rome, Italy, one of the most iconic amphitheaters of the ancient world, for  spectacles and entertainment',
      image: '/images/colosseum.png',
    },
    {
      id: 2,
      name: 'Mayan Long Count Calendar developed',
      year: 520,
      country: 'Guatemala',
      description:
        'The Maya civilisation developed a complex calendar system known as the Long Count, which allowed precise tracking of time and astronomical events',
      image: '/images/mayan-long-calendar.png',
    },
    {
      id: 3,
      name: 'Founding of Al-Qarawiyyin University',
      year: 950,
      country: 'Morocco',
      description:
        'Al-Qarawiyyin University in Fez, Morocco, founded by Fatima al-Fihri, is recognised as the oldest existing educational institution in the world',
      image: '/images/al-qarawiyyin.png',
    },
    {
      id: 4,
      name: 'Founding of Timbuktu',
      year: 1100,
      country: 'Mali',
      description:
        'The city of Timbuktu in Mali became a major centre for trade and scholarship in West Africa',
      image: '/images/timbuktu.png',
    },
    {
      id: 5,
      name: 'Development of the Aztec Calendar Stone ',
      year: 1300,
      country: 'Guatemala',
      description:
        'The Aztec Calendar Stone, or Sun Stone, is an intricate representation of time and cosmology',
      image: '/images/mayan-calendar.png',
    },
    {
      id: 6,
      name: `Christopher Columbus 'discovered' America`,
      year: 1492,
      country: 'USA',
      description:
        'Christopher Columbas embarked on voyages that expanded geographical knowledge and global trade and bumped into America',
      image: '/images/christopher-columbus.png',
    },
    {
      id: 7,
      name: 'Industrial Revolution begins',
      year: 1709,
      country: 'England',
      description:
        'Abraham Darby set in motion the knock on events that would later be referred to as the industrial revolution, starting with his ironmongery production and ending in 1912 - the peak of Industrial England',
      image: '/images/industrial-revolution.png',
    },
    {
      id: 8,
      name: 'The United Nations',
      year: 1945,
      country: 'USA',
      description:
        'The founding of the United Nations as an international organisation aimed at promoting peace, cooperation, and diplomacy among nations',
      image: '/images/united-nations.png',
    },
    {
      id: 9,
      name: 'The Space Race Begins',
      year: 1957,
      country: 'United States',
      description:
        'A period of intense competition between the United States and the Soviet Union to achieve milestones in space exploration',
      image: '/images/space-race.png',
    },
    {
      id: 10,
      name: 'The Paris Agreement',
      year: 2016,
      country: 'France',
      description:
        'A global accord to combat climate change by reducing greenhouse gas emissions, signed by numerous countries to address environmental challenges',
      image: '/images/paris-agreement.png',
    },
  ])
}

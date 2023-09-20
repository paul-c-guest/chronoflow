/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('inventions').insert([
    {
      id: 1,
      invention: 'Paper',
      inventor: 'Cai Lun',
      country: 'China',
      year: 105,
      description:
        'About the year 105 Cai conceived the idea of forming sheets of paper from the macerated bark of trees, hemp waste, old rags, and fishnets',
      image: '/images/paper.png',
    },
    {
      id: 2,
      invention: 'Gunpowder',
      inventor: '',
      country: 'China',
      year: 142,
      description:
        'Gunpowder was invented in China sometime during the first millennium AD. The earliest possible reference to gunpowder appeared in 142 AD during the Eastern Han dynasty when the alchemist Wei Boyang, also known as the "father of alchemy", wrote about a substance with gunpowder-like properties..',
      image: '/images/gunpowder.png',
    },
    {
      id: 3,
      invention: 'The Wheelbarrow',
      inventor: 'Zhuge Liang',
      country: 'China',
      year: 231,
      description:
        'When was the wheelbarrow first invented? The common wheelbarrow has far flung and exotic roots, as it can be traced back to third century ancient Asia. In 231 A.D, Zhuge Liang of Shu Han in China created a single wheel cart for an efficient way of transporting food and supplies to the front lines of battle',
      image: '/images/wheelbarrow.png',
    },
    {
      id: 4,
      invention: 'Compass',
      inventor: 'Unknown',
      country: 'China',
      year: 1044,
      description:
        'Historians think China may have been the first civilization to develop a magnetic compass that could be used for navigation. Chinese scientists may have developed navigational compasses as early as the 11th or 12th century. Western Europeans soon followed at the end of the 12th century.',
      image: '/images/compass.png',
    },
    {
      id: 5,
      invention: 'Printing Press',
      inventor: 'Johannes Gutenburg',
      country: 'Germany',
      year: 1440,
      description:
        'Johannes Gutenbergs movable-type printing press, around 1440, made the mass production of books possible, greatly advancing the spread of knowledge.',
      image: '/images/printing-press.png',
    },
    {
      id: 6,
      invention: 'Telescope',
      inventor: 'Hans Lippershey',
      country: 'Netherlands',
      year: 1608,
      description:
        'In 1608, Lippershey laid claim to a device that could magnify objects three times. His telescope had a concave eyepiece aligned with a convex objective lens. One story goes that he got the idea for his design after observing two children in his shop holding up two lenses that made a distant weather vane appear close.',
      image: '/images/telescope.png',
    },
    {
      id: 7,
      invention: 'Steam Engine',
      inventor: 'Thomas Newcomen',
      country: 'England',
      year: 1712,
      description:
        'In 1712, Thomas Newcomens atmospheric engine became the first commercially successful engine using the principle of the piston and cylinder, which was the fundamental type of steam engine used until the early 20th century. The steam engine was used to pump water out of coal mines',
      image: '/images/steam-engine.png',
    },
    {
      id: 8,
      invention: 'Vaccination',
      inventor: 'Edward Jenner',
      country: 'England',
      year: 1712,
      description:
        'Edward Jenner is well known around the world for his innovative contribution to immunization and the ultimate eradication of smallpox. Jenners work is widely regarded as the foundation of immunology—despite the fact that he was neither the first to suggest that infection with cowpox conferred specific immunity to smallpox nor the first to attempt cowpox inoculation for this purpose',
      image: '/images/vaccination.png',
    },
    {
      id: 9,
      invention: 'Electricity',
      inventor: 'Michael Faraday',
      country: 'England',
      year: 1831,
      description:
        'In 1821 Michael Faraday succeeded in producing mechanical motion by means of a permanent magnet and an electric current—an ancestor of the electric motor. Ten years later he converted magnetic force into electrical force, thus inventing the worlds first electrical generator.',
      image: '/images/electricity.png',
    },
    {
      id: 10,
      invention: 'Telegraph',
      inventor: 'Samuel Morse',
      country: 'USA',
      year: 1837,
      description:
        'In 1832, while returning by ship from studying art in Europe, Morse conceived the idea of an electric telegraph as the result of hearing a conversation about the newly discovered electromagnet. Although the idea of an electric telegraph had been put forward in 1753 and electric telegraphs had been used to send messages over short distances as early as 1774, Morse believed that his was the first such proposal.',
      image: '/images/telegraph.png',
    },
    {
      id: 11,
      invention: 'Photography',
      inventor: 'Louis Daguerre',
      country: 'France',
      year: 1839,
      description:
        'On January 7, 1839, members of the French Académie des Sciences were shown products of an invention that would forever change the nature of visual representation: photography. The astonishingly precise pictures they saw were the work of Louis-Jacques-Mandé Daguerre, a Romantic painter and printmaker most famous until then as the proprietor of the Diorama, a popular Parisian spectacle featuring theatrical painting and lighting effects. Each daguerreotype (as Daguerre dubbed his invention) was a one-of-a-kind image on a highly polished, silver-plated sheet of copper.',
      image: '/images/photography.png',
    },
    {
      id: 12,
      invention: 'Automobile',
      inventor: 'Karl Benz',
      country: 'Germany',
      year: 1886,
      description:
        'On January 29, 1886, Carl Benz applied for a patent for his “vehicle powered by a gas engine.” The patent number 37435 may be regarded as the birth certificate of the automobile. In July 1886 the newspapers reported on the first public outing of the three-wheeled Benz Patent Motor Car',
      image: '/images/automobile.png',
    },
    {
      id: 13,
      invention: 'Radio',
      inventor: 'Guilielmo Marconi',
      country: 'Italy',
      year: 1895,
      description:
        'In 1895, Guglielmo Marconi used radio waves to transmit signals over a distance of several kilometers. He developed the technology in subsequent years to achieve greater range. The foundation for both wireless telegraphy and radio had been laid.',
      image: '/images/radio.png',
    },
    {
      id: 14,
      invention: 'Penicillin',
      inventor: 'Alexander Fleming',
      country: 'Scotland',
      year: 1928,
      description:
        'Returning from holiday on September 3, 1928, Fleming began to sort through petri dishes containing colonies of Staphylococcus, bacteria that cause boils, sore throats and abscesses. He noticed something unusual on one dish. It was dotted with colonies, save for one area where a blob of mold was growing. The zone immediately around the mold—later identified as a rare strain of Penicillium notatum—was clear, as if the mold had secreted something that inhibited bacterial growth.',
      image: '/images/penicillin.png',
    },
  ])
}

//invention, inventor, country, year, description, image

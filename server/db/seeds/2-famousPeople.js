/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('famous_people').insert([
    {
      id: 1,
      name: 'Augustus Caesar',
      year_born: 0,
      year_died: 14,
      country: 'Italy',
      known_for:
        'The first Roman Emperor, he established the Roman Empire and initiated the Pax Romana, a period of relative peace and stability',
      image: '/images/augustus-ceasar.png',
    },
    {
      id: 2,
      name: 'Charlemagne',
      year_born: 742,
      year_died: 814,
      country: 'Carolingian Empire',
      known_for:
        'Also known as Charles the Great, he was the King of the Franks and Lombards and later became the first Holy Roman Emperor. He expanded the Carolingian Empire',
      image: '/images/charlemagne.png',
    },
    {
      id: 3,
      name: 'William the Conqueror',
      year_born: 1028,
      year_died: 1087,
      country: 'England',
      known_for:
        'Conquered England in 1066 at the Battle of Hastings, becoming King of England and initiating Norman rule.',
      image: '/images/william-the-conqueror.png',
    },
    {
      id: 4,
      name: 'Gengis Khan',
      year_born: 1162,
      year_died: 1227,
      country: 'Mongol Empire',
      known_for:
        'Founder and leader of the Mongol Empire, one of the largest empires in history. He established a vast empire through conquest',
      image: '/images/genghis-khan.png',
    },
    {
      id: 5,
      name: 'Joan of Arc',
      year_born: 1412,
      year_died: 1431,
      country: 'France',
      known_for:
        'Known as the Maid of Orleans; played a pivotal role in the Hundred Years War, leading French troops to important victories before her capture and execution',
      image: '/images/joan-of-arc.png',
    },
    {
      id: 6,
      name: 'Marco Polo',
      year_born: 1254,
      year_died: 1324,
      country: 'Italy',
      known_for:
        'Venetian merchant, explorer, and writer; famous for his travels to Asia along the Silk Road and his book "The Travels of Marco Polo."',
      image: '/images/marco-polo.png',
    },
    {
      id: 7,
      name: 'Leonardo Da Vinci',
      year_born: 1452,
      year_died: 1519,
      country: 'Italy',
      known_for:
        'Renaissance polymath; contributions to art, science, and invention, including the Mona Lisa and Vitruvian Man',
      image: '/images/leonardo-da-vinci.png',
    },
    {
      id: 8,
      name: 'King Henry VIII',
      year_born: 1491,
      year_died: 1547,
      country: 'England',
      known_for:
        'King of England known for his six marriages, the English Reformation, and his role in establishing the Church of England',
      image: '/images/henry-viii.png',
    },
    {
      id: 9,
      name: 'William Shakespeare',
      year_born: 1564,
      year_died: 1616,
      country: 'England',
      known_for:
        'English playwright and poet; influential works like "Romeo and Juliet" and "Hamlet."',
      image: '/images/william-shakespeare.png',
    },
    {
      id: 10,
      name: 'Galileo Galilei',
      year_born: 1564,
      year_died: 1642,
      country: 'Italy',
      known_for:
        'Italian astronomer, physicist, and mathematician; telescopic discoveries and support for heliocentrism',
      image: '/images/galileo-galilei.png',
    },
    {
      id: 11,
      name: 'Isaac Newton',
      year_born: 1643,
      year_died: 1727,
      country: 'England',
      known_for:
        'English mathematician, physicist, and astronomer; laws of motion and universal gravitation.',
      image: '/images/isaac-newton.png',
    },
    {
      id: 12,
      name: 'Charles Darwin',
      year_born: 1809,
      year_died: 1882,
      country: 'England',
      known_for:
        'English naturalist and biologist; theory of evolution by natural selection.',
      image: '/images/charles-darwin.png',
    },
    {
      id: 13,
      name: 'Queen Victoria',
      year_born: 1819,
      year_died: 1901,
      country: 'England',
      known_for:
        'Queen of the United Kingdom; the Victorian era, British imperial expansion, and cultural advancements',
      image: '/images/queen-victoria.png',
    },
    {
      id: 14,
      name: 'Tsar Nicholas II',
      year_born: 1868,
      year_died: 1918,
      country: 'Russia',
      known_for:
        'The last Emperor of Russia, his reign marked by the fall of the Russian Empire and the Russian Revolution of 1917, which led to the establishment of the Russian Soviet Federative Socialist Republic',
      image: '/images/tsar-nicolas.png',
    },
    {
      id: 15,
      name: 'Marie Curie',
      year_born: 1867,
      year_died: 1934,
      country: 'Poland',
      known_for:
        'Polish-born physicist and chemist; pioneer in the field of radioactivity and the first person to win Nobel Prizes in two different scientific fields (Physics and Chemistry)',
      image: '/images/marie-curie.png',
    },
    {
      id: 16,
      name: 'Albert Einstein',
      year_born: 1879,
      year_died: 1955,
      country: 'Germany',
      known_for:
        'German-born theoretical physicist; theory of relativity and the equation E=mc^2',
      image: '/images/albert-einstein.png',
    },
  ])
}

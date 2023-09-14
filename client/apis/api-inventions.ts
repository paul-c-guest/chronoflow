import request from 'superagent'
import { Inventions } from '../../models/Inventions'

export function getAllInventions() {
  return [
    {
      id: 1,
      invention: 'Light Bulb',
      inventor: 'Thomas Edison',
      country: 'USA',
      year: 1879,
      description:
        'The light bulb, an invention that revolutionized the modern world and made it possible for people to have light without the use of candles or oil lamps.',
      image:
        'https://images.unsplash.com/photo-1573621622238-f7ac6ac0429a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    },
  ] as Inventions[]
}

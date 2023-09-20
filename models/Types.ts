import { Event } from './Events.ts'
import { Person } from './People.ts'
import { Invention } from './Inventions.ts'

export type Category = 'inventions' | 'worldEvents' | 'people'

export type CategoryData = Event[] | Person[] | Invention[]

export interface Country {
  id: number
  identifier: Identifier
  nameOne: string
  nameTwo: null | string
  yearOne: number
  yearTwo: number | null
  description: string
  image: string
}

export enum Identifier {
  Event = 'event',
  Invention = 'invention',
  People = 'people',
}

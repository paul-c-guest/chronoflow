import { Event } from './Events.ts'
import { Person } from './People.ts'
import { Invention } from './Inventions.ts'

export type Category = 'inventions' | 'worldEvents' | 'people'

export type CategoryData = Event[] | Person[] | Invention[]

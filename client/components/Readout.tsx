import { useOutletContext, useParams } from 'react-router-dom'

import type { Invention } from '../../models/Inventions.ts'
import type { Person } from '../../models/People.ts'
import type { Event } from '../../models/Events.ts'
import { useEffect, useState } from 'react'
import { Country } from '../../models/Types.ts'

interface Context {
  inventionsData: Invention[]
  peopleData: Person[]
  worldEventsData: Event[]
  inventionsNZData: Invention[]
  peopleNZData: Person[]
  eventsNZData: Event[]
  selectedCountry: string
}

export default function Readout() {
  const { id, category } = useParams()
  const {
    inventionsData: inventions,
    peopleData: people,
    worldEventsData: worldEvents,
    inventionsNZData,
    peopleNZData,
    eventsNZData,
    selectedCountry,
  } = useOutletContext<Context>()
  const [data, setData] = useState<Event | Person | Invention | null>(null)

  useEffect(() => {
    console.log('NZ People Data:', peopleNZData)
    console.log('NZ Inventions Data:', inventionsNZData)
    console.log('NZ Events Data:', eventsNZData)
    console.log('country:', selectedCountry)

    let currentData: Event | Person | Invention | null = null
    if (selectedCountry !== 'New Zealand') {
      if (category === 'people') {
        currentData = people.find((item) => item.id === Number(id))
      } else if (category === 'inventions') {
        currentData = inventions.find((item) => item.id === Number(id))
      } else if (category === 'worldEvents') {
        currentData = worldEvents.find((item) => item.id === Number(id))
      }
    } else if (selectedCountry === 'New Zealand') {
      console.log('kinda working')
      if (category === 'people') {
        currentData = peopleNZData.find((item) => item.id === Number(id))
      } else if (category === 'inventions') {
        currentData = inventionsNZData.find((item) => item.id === Number(id))
      } else if (category === 'worldEvents') {
        currentData = eventsNZData.find((item) => item.id === Number(id))
      }
    }
    setData(currentData)
  }, [
    id,
    category,
    people,
    inventions,
    worldEvents,
    selectedCountry,
    peopleNZData,
    inventionsNZData,
    eventsNZData,
  ])

  const [categoryData, setCategoryData] = useState({
    title: '',
    yearLabel: '',
    year: '',
    description: '',
    altText: '',
    inventor: null as string | null,
  })

  useEffect(() => {
    if (!data) return
    if (category === 'people') {
      const personData = data as Person
      setCategoryData({
        title: personData.name,
        yearLabel: 'Life span:',
        year: `${personData.yearBorn} - ${personData.yearDied}`,
        description: personData.knownFor,
        altText: personData.name,
        inventor: null,
      })
    } else if (category === 'inventions') {
      const inventionData = data as Invention
      setCategoryData({
        title: inventionData.invention,
        yearLabel: 'Year: ',
        year: `${inventionData.year}`,
        description: inventionData.description,
        altText: inventionData.invention,
        inventor: inventionData.inventor || null,
      })
    } else {
      const worldEventData = data as Event
      setCategoryData({
        title: worldEventData.name,
        yearLabel: 'Year: ',
        year: `${worldEventData.year}`,
        description: worldEventData.description,
        altText: worldEventData.name,
        inventor: null,
      })
    }
  }, [category, data])

  return data ? (
    <div className="h-[24rem] flex bg-black p-4 border-zinc-800 border-2">
      <div className="max-w-lg ml-4 self-start grow-1">
        <h2 className="my-2 text-5xl font-sans text-white bg-zinc-800">
          {categoryData.title}
        </h2>
        {categoryData.inventor ? (
          <p className="font-sans text-white text-lg">
            Credited to:{' '}
            <span className="font-label font-thin text-white text-lg pl-2">
              {categoryData.inventor}
            </span>
          </p>
        ) : null}
        <p className="font-sans text-white mb-2 text-lg">
          {categoryData.yearLabel}
          <span className="font-label font-thin text-white text-lg pl-2">
            {categoryData.year}
          </span>
        </p>
        <p className="mb-2 font-sans text-white text-lg">
          Country:{' '}
          <span className="font-label font-thin text-white text-lg pl-2">
            {data.country ? data.country : 'New Zealand'}
          </span>
        </p>
        <div className="font-label text-white font-thin bg-zinc-800 max-h-72 overflow-auto ">
          <p>{categoryData.description}</p>
        </div>
      </div>
      <img
        src={data.image}
        alt={categoryData.altText}
        className="shadow-md mx-auto h-1/2 self-center"
      />
    </div>
  ) : (
    ''
  )
}

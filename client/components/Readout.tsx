import { useOutletContext, useParams } from 'react-router-dom'
import type { Invention } from '../../models/Inventions.ts'
import type { Person } from '../../models/People.ts'
import type { Event } from '../../models/Events.ts'
import { useEffect, useState } from 'react'

interface Context {
  inventionsData: Invention[]
  peopleData: Person[]
  worldEventsData: Event[]
}

export default function Readout() {
  const { id, category } = useParams()

  const {
    inventionsData: inventions,
    peopleData: people,
    worldEventsData: worldEvents,
  } = useOutletContext<Context>()

  

  console.log('worldstuff', worldEvents)

  const dataArray =
    category === 'people'
      ? people
      : category === 'inventions'
      ? inventions
      : worldEvents

  const data = dataArray.filter((item) => item.id === Number(id))[0] as
    | Invention
    | Person
    | Event

  const [categoryData, setCategoryData] = useState({
    title: '',
    yearLabel: '',
    year: '',
    description: '',
    altText: '',
    inventor: null as string | null,
  })

  useEffect(() => {
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
      const worldEventsData = data as Event
      setCategoryData({
        title: worldEventsData.name,
        yearLabel: 'Year: ',
        year: `${worldEventsData.year}`,
        description: worldEventsData.description,
        altText: worldEventsData.name,
        inventor: null,
      })
    }
  }, [category, data]) // Based on what the category is

  return (
    <div className=" max-h-[28rem] flex mt-12 bg-black p-4 border-zinc-800 border-2">
      <div className="max-w-lg ml-4 self-start">
        <h2 className="my-2 text-5xl font-sans text-white bg-zinc-800">
          {categoryData.title}
        </h2>
        {categoryData.inventor ? (
          <p className="font-sans text-white">
            Credited to:{' '}
            <span className="font-label font-thin text-white text-lg">
              {categoryData.inventor}
            </span>
          </p>
        ) : null}
        <p className="font-sans text-white mb-2">
          {categoryData.yearLabel}
          <span className="font-label font-thin text-white text-lg">
            {categoryData.year}
          </span>
        </p>
        <p className="mb-2 font-sans text-white">
          Country:{' '}
          <span className="font-label font-thin text-white text-lg">
            {data.country}
          </span>
        </p>
        <div className="font-label text-white font-thin bg-zinc-800 max-h-72 overflow-auto ">
          <p>{categoryData.description}</p>
        </div>
      </div>
      <img
        src={data.image}
        alt={categoryData.altText}
        className="shadow-md m-4 h-1/2 self-center"
      />
    </div>
  )
}

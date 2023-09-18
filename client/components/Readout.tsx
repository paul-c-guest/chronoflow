import { useOutletContext, useParams } from 'react-router-dom'

import type { Invention } from '../../models/Inventions.ts'
import type { Person } from '../../models/People.ts'
import { useEffect, useState } from 'react'

interface Context {
  inventionsData: Invention[]
  peopleData: Person[]
}

// go to link '/people/1' etc to see people in readout (not yet linking from home page)

export default function Readout() {
  const { id, category } = useParams()

  const { inventionsData: inventions, peopleData: people } =
    useOutletContext<Context>()
  const dataArray = category === 'people' ? people : inventions
  const data = dataArray[Number(id) - 1] as Invention | Person

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
    } else {
      const inventionData = data as Invention
      setCategoryData({
        title: inventionData.invention,
        yearLabel: 'Year:',
        year: `${inventionData.year}`,
        description: inventionData.description,
        altText: inventionData.invention,
        inventor: inventionData.inventor || null,
      })
    }
  }, [category, data])

  return (
    <div className=" max-h-[28rem] flex mt-12 bg-white rounded-md p-4 border-orange-300 border-t-2 border-r-2 border-l-4 border-b-4">
      <div className="max-w-lg ml-4 self-start">
        <h2 className="my-2 text-xl font-semibold">{categoryData.title}</h2>
        {categoryData.inventor ? (
          <p className="">
            Credited to:{' '}
            <span className="italic text-lg">{categoryData.inventor}</span>
          </p>
        ) : null}
        <p className="mb-2">
          {categoryData.yearLabel}
          <span className="italic text-lg">{categoryData.year}</span>
        </p>
        <p className="mb-2">Country: {data.country}</p>
        <div className="max-h-72 overflow-auto">
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

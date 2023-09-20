import { Dispatch, SetStateAction } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import type { Invention } from '../../models/Inventions'
import type { Person } from '../../models/People'

interface Props {
  inventions: Invention[]
  people: Person[]
  setSelectedCountry: Dispatch<SetStateAction<string | null>>
  selectedCountry: string | null
}

function CountrySelect({
  inventions,
  people,
  setSelectedCountry,
  selectedCountry,
}: Props) {
  const navigate = useNavigate()

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCountry(event.target.value)
    navigate('/')
  }

  const listOfInventionCountries = inventions.map(
    (invention) => invention.country
  )
  const listOfPeopleCountries = people.map((person) => person.country)

  const combinedCountriesArray = [
    ...listOfInventionCountries,
    ...listOfPeopleCountries,
  ]

  const setOfCountries = new Set(combinedCountriesArray)
  setOfCountries.delete('Mongol Empire')
  setOfCountries.delete('Carolingian Empire')

  const countriesArray = Array.from(setOfCountries)

  // console.log(countriesArray)

  // TODO: update link tag
  const listOfOptions = countriesArray.map((country) => (
    <option value={country} key={country}>
      <Link to="">{country}</Link>
    </option>
  ))

  return (
    <div className="text-left border-zinc-800 border-2 bg-black text-white px-4  py-2 mt-4 mb-4 flex-auto">
      <h2 className="font-semibold font-sans bg-zinc-800 text-xl text-left text-white mb-2">
        Filter By Country
      </h2>
      <select
        name="countries"
        id="countries"
        value={selectedCountry || ''}
        onChange={handleChange}
        className="mt-3 bg-zinc-800 pl-2 w-full border-gray-500 border-2"
      >
        <option value="disabledOption">All</option>
        <option value="New Zealand">New Zealand</option>
        {listOfOptions}
      </select>
    </div>
  )
}

export default CountrySelect

import { Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'

import type { Invention } from '../../models/Inventions'
import type { Person } from '../../models/People'

interface Props {
  inventions: Invention[]
  people: Person[]
  setSelectedOption: Dispatch<SetStateAction<string>>
  selectedOption: string
}

function CountrySelect({
  inventions,
  people,
  setSelectedOption,
  selectedOption,
}: Props) {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(event.target.value)
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

  const countriesArray = Array.from(setOfCountries)

  // TODO: update link tag
  const listOfOptions = countriesArray.map((country) => (
    <option value={country} key={country}>
      <Link to="">{country}</Link>
    </option>
  ))

  return (
    <div className="w-[25%] text-left border-zinc-800 border-2 bg-black text-white  py-2 h-28">
      <label htmlFor="countries" className="text-xl uppercase bg-zinc-800 ">
        Filter By Country
      </label>
      <select
        name="countries"
        id="countries"
        value={selectedOption}
        onChange={handleChange}
        className="mt-3 bg-black"
      >
        <option value="disabledOption" disabled></option>
        {listOfOptions}
      </select>
    </div>
  )
}

export default CountrySelect

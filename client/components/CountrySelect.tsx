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
    <div
      className=" border-orange-300 border-t-2 border-r-2 
    border-l-4 border-b-4 bg-white py-2 rounded-md my-3 p-8"
    >
      <label htmlFor="countries" className="font-semibold text-xl mr-6">
        Filter Your Country
      </label>
      <select
        name="countries"
        id="countries"
        value={selectedOption}
        onChange={handleChange}
        className="text-center w-96 border-orange-300 border-2"
      >
        <option value="disabledOption" disabled>
          Choose a country
        </option>
        {listOfOptions}
      </select>
    </div>
  )
}

export default CountrySelect

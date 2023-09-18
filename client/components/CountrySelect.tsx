import { useState } from 'react'

import type { Invention } from '../../models/Inventions'
import type { Person } from '../../models/People'

interface Props {
  inventions: Invention[]
  people: Person[]
}

function CountrySelect({ inventions, people }: Props) {
  const [selectedOption, setSelectedOption] = useState('disabledOption')

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

  // Add new data sets to the Set to remove duplicates
  const setOfCountries = new Set(combinedCountriesArray)

  const countriesArray = Array.from(setOfCountries)

  const listOfOptions = countriesArray.map((country) => (
    <option value={country} key={country}>
      {country}
    </option>
  ))

  return (
    <div className="w-[25%] text-center border-orange-300 border-t-2 border-r-2 border-l-4 border-b-4 bg-white py-2 rounded-md h-28">
      <label htmlFor="countries" className="font-semibold text-xl ">
        Country List
      </label>
      <select
        name="countries"
        id="countries"
        value={selectedOption}
        onChange={handleChange}
        className="mt-3"
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

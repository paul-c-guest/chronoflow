import { useState } from 'react'

import type { Invention } from '../../models/Inventions'

interface Props {
  inventions: Invention[]
}

function CountrySelect({ inventions }: Props) {
  const [selectedOption, setSelectedOption] = useState('disabledOption')

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(event.target.value)
  }

  const listOfCountries = inventions.map((invention) => invention.country)

  // Add new data sets to the Set to remove duplicates
  const setOfCountries = new Set(listOfCountries)
  const countriesArray = Array.from(setOfCountries)

  const listOfOptions = countriesArray.map((country) => (
    <option value={country} key={country}>
      {country}
    </option>
  ))

  return (
    <select
      name="countries"
      id="countries"
      value={selectedOption}
      onChange={handleChange}
    >
      <option value="disabledOption" disabled>
        Choose a country
      </option>
      {listOfOptions}
    </select>
  )
}

export default CountrySelect

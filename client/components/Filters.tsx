import { useState } from 'react'

import Readout from './Readout.tsx'
import type { CheckboxStatusType } from '../../models/Filters.ts'

const initialStatus = {
  inventions: false,
  worldEvents: false,
  people: false,
}

function Filters() {
  const [checkboxStatus, setCheckboxStatus] =
    useState<CheckboxStatusType>(initialStatus)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = event.target
    setCheckboxStatus({ ...checkboxStatus, [name]: checked })
    console.log(checkboxStatus)
  }

  return (
    <>
      <div className="filters flex flex-row gap-7 items-baseline border-2 border-black rounded max-w-lg">
        <div>
          <input
            type="checkbox"
            name="inventions"
            id="inventions"
            onChange={handleChange}
            checked={checkboxStatus.inventions}
          />
          <label htmlFor="inventions">Inventions</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="worldEvents"
            id="worldEvents"
            onChange={handleChange}
            checked={checkboxStatus.worldEvents}
          />
          <label htmlFor="worldEvents">World events</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="people"
            id="people"
            onChange={handleChange}
            checked={checkboxStatus.people}
          />
          <label htmlFor="people">People</label>
        </div>
      </div>
      <Readout checkboxStatus={checkboxStatus} />
    </>
  )
}

export default Filters

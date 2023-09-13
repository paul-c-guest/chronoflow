import { useState } from 'react'

const initialStatus = {
  inventions: false,
  worldEvents: false,
  people: false,
}

function Filters() {
  const [checkboxStatus, setCheckboxStatus] = useState(initialStatus)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = event.target
    setCheckboxStatus({ ...checkboxStatus, [name]: checked })
    console.log(checkboxStatus)
  }

  return (
    <div className="filters">
      <div>
        <label htmlFor="inventions">Inventions</label>
        <input
          type="checkbox"
          name="inventions"
          id="inventions"
          onChange={handleChange}
          checked={checkboxStatus.inventions}
        />
      </div>
      <div>
        <label htmlFor="worldEvents">World events</label>
        <input
          type="checkbox"
          name="worldEvents"
          id="worldEvents"
          onChange={handleChange}
          checked={checkboxStatus.worldEvents}
        />
      </div>
      <div>
        <label htmlFor="people">People</label>
        <input
          type="checkbox"
          name="people"
          id="people"
          onChange={handleChange}
          checked={checkboxStatus.people}
        />
      </div>
    </div>
  )
}

export default Filters

import { Dispatch, SetStateAction } from 'react'
import { Category } from '../../models/Types'

interface Props {
  filterStatus: filterStatus
  setFilterStatus: Dispatch<SetStateAction<filterStatus>>
}

interface filterStatus {
  event: string
  people: boolean
}

function Filters({ filterStatus, setFilterStatus }: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name } = event.target
    setFilterStatus({ ...filterStatus, event: name })
  }

  function handlePeopleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const status = event.target.checked
    console.log(event)
    setFilterStatus({ ...filterStatus, people: status })
  }

  const categories = ['inventions', 'worldEvents']

  return (
    <div className="w-[75%] border-zinc-800 border-2 bg-black px-12 py-2 align-center justify-between h-28">
      <div>
        <h2 className="font-semibold font-sans bg-zinc-800 text-xl text-left text-white mb-2 ">
          Filter your history
        </h2>
      </div>
      <div className="flex flex-row items-baseline">
        {categories.map((category) => (
          <div key={category}>
            <input
              className=""
              type="checkbox"
              name={category}
              id={category}
              onChange={handleChange}
              checked={filterStatus.event === category ? true : false}
            />
            <label
              className="text-white uppercase font-label"
              htmlFor={category}
            >
              {category}
            </label>
          </div>
        ))}
        <div key="people">
          <input
            className=""
            type="checkbox"
            name="people"
            id="people"
            onChange={handlePeopleChange}
            checked={filterStatus.people}
          />
          <label className="text-white uppercase font-label" htmlFor="people">
            people
          </label>
        </div>
      </div>
    </div>
  )
}

export default Filters

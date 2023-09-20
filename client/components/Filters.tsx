import { Dispatch, SetStateAction } from 'react'
import { Category } from '../../models/Types'
import { useNavigate } from 'react-router-dom'

interface Props {
  filterStatus: filterStatus
  setFilterStatus: Dispatch<SetStateAction<filterStatus>>
}

interface filterStatus {
  event: string
  people: boolean
}

function Filters({ filterStatus, setFilterStatus }: Props) {
  const navigate = useNavigate()

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name } = event.target
    setFilterStatus({ ...filterStatus, event: name })
    navigate('/')
  }

  function handlePeopleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const status = event.target.checked
    console.log(event)
    setFilterStatus({ ...filterStatus, people: status })
    if (!status) {
      navigate('/')
    }
  }

  const categories = ['inventions', 'worldEvents']

  return (
    <div className="mt-4 bg-black text-left align-center justify-between mb-4 flex flex-row items-baseline gap-3">
      <div className="border-zinc-800 border-2 px-4 py-2 ">
        <h2 className="font-semibold font-sans bg-zinc-800 text-xl text-left text-white mb-2">
          Filter your history
        </h2>

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
        </div>
      </div>

      <div key="people" className="border-zinc-800 border-2 px-4 py-2">
        <h2 className="font-semibold font-sans bg-zinc-800 text-xl text-left text-white mb-2">
          Toggle People
        </h2>
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
  )
}

export default Filters

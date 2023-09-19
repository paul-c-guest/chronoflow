import { Dispatch, SetStateAction } from 'react'
import { Category } from '../../models/Types'

interface Props {
  checkboxStatus: string
  setCheckboxStatus: Dispatch<SetStateAction<Category>>
}

function Filters({ checkboxStatus, setCheckboxStatus }: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name } = event.target
    setCheckboxStatus(name as Category)
  }

  const categories = ['inventions', 'worldEvents', 'people']

  return (
    <div className="w-[75%] border-zinc-800 border-2 bg-black px-12 py-2 align-center justify-between h-28">
      <div>
        <h2 className="font-semibold font-sans bg-zinc-800 text-xl text-left text-white mb-2 ">
          Filter your events
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
              checked={checkboxStatus === category ? true : false}
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
  )
}

export default Filters

import { Dispatch, SetStateAction } from 'react'

interface Props {
  checkboxStatus: string
  setCheckboxStatus: Dispatch<SetStateAction<string>>
}

function Filters({ checkboxStatus, setCheckboxStatus }: Props) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name } = event.target
    setCheckboxStatus(name)
  }

  const categories = ['inventions', 'worldEvents', 'people']

  return (
    <div className="border-orange-300 border-t-2 border-r-2 border-l-4 border-b-4 bg-white px-12 py-2 align-center justify-between rounded-md h-28">
      <div>
        <h2 className="font-semibold text-xl text-center mb-2">
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
            <label className="" htmlFor={category}>
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filters

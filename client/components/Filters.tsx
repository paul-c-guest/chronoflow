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
    <>
      <div className="h-20 filters flex flex-row gap-7 items-baseline border-2 border-black rounded max-w-lg">
        {categories.map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              name={category}
              id={category}
              onChange={handleChange}
              checked={checkboxStatus === category ? true : false}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
    </>
  )
}

export default Filters

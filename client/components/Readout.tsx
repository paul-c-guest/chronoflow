import { useQuery } from '@tanstack/react-query'

import type { Inventions } from '../../models/Inventions.ts'
import { getAllInventions } from '../apis/api-inventions.ts'
import { CheckboxStatusType } from '../../models/Filters.ts'

interface Props {
  checkboxStatus: CheckboxStatusType
}

function Readout({ checkboxStatus }: Props) {
  const { data, isLoading, isError, error } = useQuery<Inventions[], Error>(
    ['inventions'],
    getAllInventions
  )

  if (isLoading) {
    return <p>Waiting for invention info....</p>
  }

  if (isError || !data) {
    return <p>There was an error: {error?.message}</p>
  }

  // Fancy function to manage what data is displayed in sync with slider
  function selectInventionToDisplay(data: Inventions[]) {
    // switch statement?
    return data[0]
  }

  function displayReadout() {
    if (data) {
      const dataToDisplay = selectInventionToDisplay(data)
      return (
        <>
          <h2 className="text-xl font-semibold m-2">
            {dataToDisplay.invention}
          </h2>
          <img
            src={dataToDisplay.image}
            alt={dataToDisplay.invention}
            className="w-32 shadow-md m-4"
          />
          <p className="m-2 ">
            Credited to:{' '}
            <span className="italic text-lg">
              {dataToDisplay.inventor}, {dataToDisplay.year}
            </span>
          </p>
          <p>{dataToDisplay.description}</p>
        </>
      )
    } else {
      return <p>There was an error retrieving the data</p>
    }
  }

  return (
    <div>
      {/* Conditional rendering of readout */}
      {checkboxStatus.inventions && displayReadout()}
    </div>
  )
}

export default Readout

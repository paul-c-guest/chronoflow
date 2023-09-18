import { useOutletContext, useParams } from 'react-router-dom'

import type { Invention } from '../../models/Inventions.ts'
import type { Person } from '../../models/People.ts'

interface Context {
  inventionsData: Invention[]
  peopleData: Person[]
}

export default function Readout() {
  const { id, category } = useParams()
  const { inventionsData: inventions, peopleData: dataArray } =
    useOutletContext<Context>()
  console.log('People context:', dataArray)
  const data = dataArray[Number(eventId) - 1]
  return (
    <div className=" max-h-[28rem] flex mt-12 bg-white rounded-md p-4 border-orange-300 border-t-2 border-r-2 border-l-4 border-b-4">
      <div className="max-w-lg ml-4 self-start">
        <h2 className="my-2 text-xl font-semibold">
          {category === 'people' ? data.name : data.invention}
        </h2>
        {data.inventor ? (
          <p className="">
            Credited to: <span className="italic text-lg">{data.inventor}</span>
          </p>
        ) : null}
        <p className="mb-2">
          Year: <span className="italic text-lg">{data.year}</span>
        </p>
        <div className="max-h-72 overflow-auto">
          <p>{data.description}</p>
        </div>
      </div>
      <img
        src={data.image}
        alt={data.invention}
        className="shadow-md m-4 h-1/2 self-center"
      />
    </div>
  )
}

// Fancy function to manage what data is displayed in sync with slider
// function selectInventionToDisplay(data: Invention[]) {
//   // switch statement?
//   return data[0]
// }

//   function displayReadout() {
//     if (data) {
//       const dataToDisplay = selectInventionToDisplay(data)
//       return (
//         <>
//           <h2 className="text-xl font-semibold m-2">
//             {dataToDisplay.invention}
//           </h2>
//           <img
//             src={dataToDisplay.image}
//             alt={dataToDisplay.invention}
//             className="w-32 shadow-md m-4"
//           />
//           <p className="m-2 ">
//             Credited to:{' '}
//             <span className="italic text-lg"></span>
//               {dataToDisplay.inventor}, {dataToDisplay.year}
//             </span>
//           </p>
//           <p>{dataToDisplay.description}</p>
//         </>
//       )
//     } else {
//       return <p>There was an error retrieving the data</p>
//     }
//   }

//   return (
//     <div>
//       {/* Conditional rendering of readout */}
//       {checkboxStatus.inventions && displayReadout()}
//     </div>
//   )
// }

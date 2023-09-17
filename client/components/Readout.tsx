import { useOutletContext, useParams } from 'react-router-dom'

import type { Invention } from '../../models/Inventions.ts'

interface Context {
  inventionsData: Invention[]
}

export default function Readout() {
  const { eventId } = useParams()
  const { inventionsData: inventions } = useOutletContext<Context>()
  console.log(inventions)
  console.log(eventId)
  // Get single invention function instead?
  const singleInvention = inventions[Number(eventId) - 1]
  return (
    <div className=" max-h-[28rem] flex mt-12 bg-white rounded-md p-4 border-orange-300 border-t-2 border-r-2 border-l-4 border-b-4">
      <div className="max-w-lg ml-4 self-start">
        <h2 className="my-2 text-xl font-semibold">
          {singleInvention.invention}
        </h2>
        {singleInvention.inventor ? (
          <p className="">
            Credited to:{' '}
            <span className="italic text-lg">{singleInvention.inventor}</span>
          </p>
        ) : null}
        <p className="mb-2">
          Year: <span className="italic text-lg">{singleInvention.year}</span>
        </p>
        <div className="max-h-72 overflow-auto">
          <p>{singleInvention.description}</p>
        </div>
      </div>
      <img
        src={singleInvention.image}
        alt={singleInvention.invention}
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

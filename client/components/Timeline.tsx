// import { useState } from 'react'

import { useState } from 'react'

function Timeline() {
  // TESTING / EXPLORATION RE MOUSE EVENTS AND INPUT RANGE SLIDER

  // const [sliderX, setSliderX] = useState(0)

  // const mDown = (event: React.MouseEvent<HTMLInputElement>) => {
  //   setSliderX(event.clientX)
  //   console.log('down', event.clientX)
  // }

  // const mMove = (event: React.MouseEvent<HTMLInputElement>) => {
  //   if (event.buttons && event.movementX !== 0) {
  //     console.log(event.movementX > 0 ? 'right' : 'left')
  //   }
  // }

  const MIN = 0
  const MAX = 100
  const MODULATOR = 0.82

  const [timelinePosition, setTimelinePosition] = useState(50)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
  }

  const marks: number[] = [0, 10, 23, 45, 89, 100]

  const modulateMarkPosition = (mark: number): number => {
    if (mark === 50) return 50
    return mark < 50 ? mark * (1 / MODULATOR) : mark * MODULATOR
  }

  return (
    <>
      {/* <h2>Timeline component</h2> */}
      <div id="timeline-container">
        <input
          id="main-timeline"
          // onMouseDown={mDown}
          // onMouseMove={mMove}
          type="range"
          min={MIN}
          max={MAX}
          list="events"
          // value={timelinePosition}
          // onChange={handleChange}
        />
      </div>

      <div id="mark-container">
        {marks.map((mark) => {
          return (
            <div
              className="mark"
              style={{
                position: 'fixed',
                left: `${modulateMarkPosition(mark)}%`,
              }}
              key={mark}
            >
              {mark}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Timeline

// <div id="timeline-container">
//   {/* TODO: populate this datalist with option elements from an array of events */}
//   <datalist id="events">
//     {/* TODO: remove these hardcoded event positions -- note that values are between slider min/max  */}
//     <option value="26" label="26" />
//     <option value="45" label="45" />
//     <option value="98" label="98" />
//   </datalist>
// </div>

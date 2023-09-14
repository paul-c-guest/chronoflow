// import { useState } from 'react'

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

  return (
    <>
      <h2>Timeline component</h2>
      <div id="timeline-container">
        <input
          id="main-timeline"
          // onMouseDown={mDown}
          // onMouseMove={mMove}
          type="range"
          min={0}
          max={100}
          list="events"
        />

        {/* TODO: populate this datalist with option elements from an array of events */}
        <datalist id="events">
          {/* TODO: remove these hardcoded event positions -- note that values are between slider min/max  */}
          <option value="26" />
          <option value="67" />
          <option value="98" />
        </datalist>
      </div>
    </>
  )
}

export default Timeline

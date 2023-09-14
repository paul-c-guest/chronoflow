import { useState } from 'react'

function Timeline() {
  const MIN = 0
  const MAX = 100
  const MODULATOR = 0.835
  // hardcoded marks for dev & testing
  const marks: number[] = [MIN, 10, 23, 44, 78, 55, 89, MAX]

  const [timelinePosition, setTimelinePosition] = useState(50)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimelinePosition(Number(event.target.value))
  }

  // maybe required to use in input if some browsers don't play nice
  // const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
  //   // console.log('input',event.target)
  // }

  const jumpToTime = (mark: number) => {
    setTimelinePosition(mark)
  }

  const modulateMarkPosition = (mark: number): number => {
    if (mark === 50) return 50
    return mark < 50 ? mark * (MODULATOR / 1) : mark * MODULATOR
  }

  return (
    <>
      <div id="timeline-container">
        <input
          id="main-timeline"
          value={timelinePosition}
          type="range"
          min={MIN}
          max={MAX}
          list="events"
          onChange={handleChange}
        />
      </div>

      <div id="mark-container">
        {marks.map((mark) => {
          return (
            <button
              onClick={() => jumpToTime(mark)}
              className="mark"
              style={{
                left: `${modulateMarkPosition(mark)}%`,
              }}
              key={mark}
            >
              {mark}
            </button>
          )
        })}
      </div>
    </>
  )
}

export default Timeline

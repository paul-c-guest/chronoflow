import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Invention } from '../../models/Inventions'

interface Props {
  inventions: Invention[]
}

function Timeline({ inventions }: Props) {
  const MIN = 100
  const MAX = 2023
  const MODULATOR = 0.835

  const [timelinePosition, setTimelinePosition] = useState(50)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimelinePosition(Number(event.target.value))
  }

  const [activeEvent, setActiveEvent] = useState(0)

  // console.log(inventions)

  // add some form of "helper" function that takes in the data array, calculates how many entries there are in an array and divides the timeline length into relative spacing for dates in relation to space on timeline?

  //function spacing(data[]){ const length = Number(inventions.length) const timelineLength = Number({timelineposition??????}) return timelineLength/length [this would equal how many 'segments' each specific timeline would have?] then we need to }

  // maybe required to use in input if some browsers don't play nice
  // const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
  //   // console.log('input',event.target)
  // }

  const jumpToTime = (invention: Invention) => {
    setTimelinePosition(invention.year)
    setActiveEvent(invention.id)
    console.log('clicked', invention.id)
    // navigate or navigation => /event/:etc?
  }

  const modulateMarkPosition = (year: number): number => {
    // year is between min and max
    const RANGE = MAX - MIN
    // console.log('range', RANGE)

    const MID = RANGE - RANGE / 2
    // console.log('MID', MID)

    if (year === MID) return 50 // midpoint = '50%'
    else
      return year < MID
        ? (((year - MIN) * 100) / RANGE) * (MODULATOR / 1)
        : (((year - MIN) * 100) / RANGE) * MODULATOR
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
          // onInput={handleInput}
        />
      </div>

      <div id="mark-container">
        {inventions.map((invention) => {
          return (
            <Link to={`/${invention.id}`} key={invention.id}>
              <button
                onClick={() => jumpToTime(invention)}
                className={`text-white mark ${
                  activeEvent === invention.id ? 'clicked' : ''
                }`}
                style={{
                  left: `${modulateMarkPosition(invention.year)}%`,
                }}
              >
                {invention.year}
              </button>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export default Timeline

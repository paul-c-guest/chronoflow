import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Invention } from '../../models/Inventions'

interface Props {
  inventions: Invention[]
}

function Timeline({ inventions }: Props) {
  const BUFFER = 50

  // setup some global values for the timeline elements
  const MIN =
    inventions.reduce(
      (min, current) => (min = current.year < min ? current.year : min),
      inventions[0].year
    ) - BUFFER

  const MAX =
    inventions.reduce(
      (max, current) => (max = current.year > max ? current.year : max),
      inventions[0].year
    ) + BUFFER

  const RANGE = MAX - MIN
  const MID = RANGE - RANGE / 2

  // assists with squeezing event positions towards centre of view;
  // closely related to "--track-width" variable in timeline.css
  const MODULATOR = 0.835

  const [timelinePosition, setTimelinePosition] = useState(50)

  const [activeEvent, setActiveEvent] = useState(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimelinePosition(Number(event.target.value))
  }

  // console.log(inventions)

  // add some form of "helper" function that takes in the data array, calculates how many entries there are in an array and divides the timeline length into relative spacing for dates in relation to space on timeline?

  /**
   * // GERARDS CLUSTER FUNCTION
   *  
    let groups = []
for (const date of dates) {
  if (groups.length && Math.abs(groups.at(-1).at(-1) - date) < 2) {
    groups.at(-1).push(date)
  } else {
    groups.push([ date ])
  }
}

  */

  //function spacing(data[]){ const length = Number(inventions.length) const timelineLength = Number({timelineposition??????}) return timelineLength/length [this would equal how many 'segments' each specific timeline would have?] then we need to }

  // maybe required to use in input if some browsers don't play nice
  // const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
  //   // console.log('input',event.target)
  // }

  const setSliderToEvent = (invention: Invention) => {
    setTimelinePosition(invention.year)
    setActiveEvent(invention.id)
    // console.log('clicked', invention.id)
  }

  /**
   * returns a value between 0 and
   */
  const modulateMarkPosition = (year: number): number => {
    let result = 50
    if (year < MID) {
      result = (((year - MIN) * 100) / RANGE) * (MODULATOR / 1)
    } else if (year > MID) {
      result = (((year - MIN) * 100) / RANGE) * MODULATOR
    }
    // console.log(year, result)
    return result 
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
            invention.year && (
              <Link to={`/${invention.id}`} key={invention.id}>
                <button
                  onClick={() => setSliderToEvent(invention)}
                  className={`mark ${
                    activeEvent === invention.id ? 'clicked' : ''
                  }`}
                  style={{
                    left: `${modulateMarkPosition(invention.year)}vw`,
                  }}
                >
                  {invention.year}
                </button>
              </Link>
            )
          )
        })}
      </div>
    </>
  )
}

export default Timeline

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Invention } from '../../models/Inventions'
import { Person } from '../../models/People'
import { text } from 'express'

interface Props {
  inventions: Invention[]
  people: Person[]
}

function Timeline({ inventions, people }: Props) {
  const buffer = 50

  // setup some global values for the timeline elements
  const rangeMin =
    Math.min(
      inventions.reduce(
        (earliestYear, invention) =>
          (earliestYear = Math.min(invention.year, earliestYear)),
        inventions[0].year
      ),
      people.reduce(
        (earliestBorn, person) =>
          (earliestBorn = Math.min(earliestBorn, person.yearBorn)),
        people[0].yearBorn
      )
    ) - buffer

  const rangeMax =
    Math.max(
      people.reduce(
        (latestDeath, person) =>
          (latestDeath = Math.max(latestDeath, person.yearBorn)),
        people[0].yearBorn
      ),
      inventions.reduce(
        (latestYear, invention) =>
          (latestYear = Math.max(invention.year, latestYear)),
        inventions[0].year
      )
    ) + buffer
  console.log('total range is', rangeMin, 'to', rangeMax)

  const range = rangeMax - rangeMin
  const midway = range - range / 2

  // assists with squeezing event positions towards centre of view;
  // closely related to "--track-width" variable in timeline.css
  const squeezeFactor = 0.835

  const [timelinePosition, setTimelinePosition] = useState(50)

  const [activeEvent, setActiveEvent] = useState(0)
  const [activePerson, setActivePerson] = useState(0)

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

  const setSliderToPerson = (person: Person) => {
    setTimelinePosition(
      person.yearBorn + (person.yearDied - person.yearBorn) / 2
    )
    setActiveEvent(0)
    setActivePerson(person.id)
  }

  // returns a value to use as the number of 'vw' from the left edge
  const getPositionForYear = (year: number): number => {
    let result = 50
    if (year < midway) {
      result = (((year - rangeMin) * 100) / range) * (squeezeFactor / 1)
    } else if (year > midway) {
      result = (((year - rangeMin) * 100) / range) * squeezeFactor
    }
    // console.log(year, result)
    return result
  }

  // returns a value to use as the width of a person, in 'vw'
  const getWidthForLifeSpan = (person: Person): number => {
    return ((person.yearDied - person.yearBorn) * squeezeFactor) / 100
  }

  return (
    <>
      <div id="person-container">
        {people.map((person: Person) => {
          return (
            person.yearBorn &&
            person.yearDied && (
              <Link to={`/people/${person.id}`} key={person.id}>
                <button
                  onClick={() => setSliderToPerson(person)}
                  className={`person ${activePerson ? 'active-person' : ''}`}
                  style={{
                    left: `${getPositionForYear(person.yearBorn)}vw`,
                    // width: `${getWidthForLifeSpan(person)}vw`,
                  }}
                  onMouseOver={() => setActivePerson(person.id)}
                  onFocus={() => setActivePerson(person.id)}
                  onMouseOut={() => setActivePerson(0)}
                  onBlur={() => setActivePerson(0)}
                >
                  {activePerson === person.id ? person.name : ''}
                </button>
              </Link>
            )
          )
        })}
      </div>

      <div id="timeline-container">
        <input
          id="main-timeline"
          value={timelinePosition}
          type="range"
          min={rangeMin}
          max={rangeMax}
          list="events"
          onChange={handleChange}
          // onInput={handleInput}
        />
      </div>

      <div id="event-container">
        {inventions.map((invention) => {
          return (
            invention.year && (
              <Link to={`/inventions/${invention.id}`} key={invention.id}>
                <button
                  onClick={() => setSliderToEvent(invention)}
                  className={`event text-white ${
                    activeEvent === invention.id ? 'active-event' : ''
                  }`}
                  style={{
                    left: `${getPositionForYear(invention.year)}vw`,
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

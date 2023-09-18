import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Invention } from '../../models/Inventions'
import { Person } from '../../models/People'

interface Props {
  inventions: Invention[]
  people: Person[]
}

function Timeline({ inventions, people }: Props) {
  // some extra years to add on either side
  const buffer = 50

  // get the earliest year from all events / people
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

  // get the latest year from all events / people
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

  // console.log('total range is', rangeMin, 'to', rangeMax)

  const range = rangeMax - rangeMin
  const midway = range - range / 2

  // assists with squeezing event positions towards centre of view;
  // closely related to "--track-width" variable in timeline.css
  const squeezeFactor = 0.84

  // the position of the thumb element of the input range slider
  const [timelinePosition, setTimelinePosition] = useState(midway)

  // for controlling UX/UI
  const [activeEvent, setActiveEvent] = useState(0)
  const [hoverPerson, setHoverPerson] = useState(0)
  const [activePerson, setActivePerson] = useState(0)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimelinePosition(Number(event.target.value))
  }

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

  const setSliderToEvent = (invention: Invention) => {
    setTimelinePosition(invention.year)
    setActiveEvent(invention.id)
    setActivePerson(0)
  }

  const setSliderToPerson = (person: Person) => {
    setTimelinePosition(person.yearBorn)
    setActivePerson(person.id)
    setActiveEvent(0)
  }

  // returns a value to use as the number of 'vw' from the left edge
  const getPositionForYear = (year: number): number => {
    let result = 50
    if (year < midway) {
      result = (((year - rangeMin) * 100) / range) * (squeezeFactor / 1)
    } else if (year > midway) {
      result = (((year - rangeMin) * 100) / range) * squeezeFactor
    }
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
            // use isFinite to check for numbers (avoid problem if year = 0, returns false)
            isFinite(person.yearBorn) &&
            isFinite(person.yearDied) && (
              <Link to={`/people/${person.id}`} key={person.id}>
                <button
                  onClick={() => setSliderToPerson(person)}
                  style={{
                    left: `${getPositionForYear(person.yearBorn || 0)}vw`,
                    width:
                      hoverPerson !== person.id
                        ? `${getWidthForLifeSpan(person)}vw`
                        : 'fit-content',
                  }}
                  className={`person ${
                    activePerson === person.id ? 'active-person' : ''
                  }`}
                  // lots of double-ups here to appease the linter:
                  onMouseOver={() => setHoverPerson(person.id)}
                  onFocus={() => setHoverPerson(person.id)}
                  onMouseOut={() => setHoverPerson(0)}
                  onBlur={() => setHoverPerson(0)}
                >
                  {hoverPerson === person.id ? person.name : ''}
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
          step={1}
          list="events"
          onChange={handleChange}
        />
      </div>

      <datalist id="events">
        {people.map((person) => {
          return <option value={person.yearBorn} key={person.name}></option>
        })}
        {inventions.map((invention) => {
          return (
            <option value={invention.year} key={invention.invention}></option>
          )
        })}
      </datalist>

      <div id="event-container">
        {inventions.map((invention) => {
          return (
            isFinite(invention.year) && (
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

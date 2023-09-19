import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Invention } from '../../models/Inventions'
import { Person } from '../../models/People'
import { Event } from '../../models/Events'

interface Props {
  data: Invention[] | Event[]
  people: Person[]
}

function Timeline({ data: inventions, people }: Props) {
  // some extra years to add on either side
  const buffer = 50

  people.sort((a, b) => a.yearBorn - b.yearBorn)
  inventions.sort((a, b) => a.year - b.year)

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

  // the magic elbow space value
  const threshold = 35

  const personIdClusters: number[][] = []
  const personYearClusters: number[][] = []
  for (const person of people) {
    if (
      personYearClusters.length &&
      Math.abs(personYearClusters.at(-1).at(-1) - person.yearBorn) < threshold
    ) {
      personYearClusters.at(-1).push(person.yearBorn)
      personIdClusters.at(-1).push(person.id)
    } else {
      personYearClusters.push([person.yearBorn])
      personIdClusters.push([person.id])
    }
  }

  const inventionIdClusters: number[][] = []
  const inventionYearClusters: number[][] = []
  for (const invention of inventions) {
    if (
      inventionYearClusters.length &&
      Math.abs(inventionYearClusters.at(-1).at(-1) - invention.year) < threshold
    ) {
      inventionYearClusters.at(-1).push(invention.year)
      inventionIdClusters.at(-1).push(invention.id)
    } else {
      inventionYearClusters.push([invention.year])
      inventionIdClusters.push([invention.id])
    }
  }

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

  const getPositionForYearInCluster = (
    year: number,
    clusterPosition: number,
    clusterLength: number
  ): number => {
    let result = 50
    clusterPosition = clusterPosition++

    if (year < midway) {
      result = (((year - rangeMin) * 100) / range) * (squeezeFactor / 1)
    } else if (year > midway) {
      result = (((year - rangeMin) * 100) / range) * squeezeFactor
    }

    // a magic number to assist with grouping/overlapping
    const magicValue = 0.5

    const totalClusterWidth = clusterLength * magicValue
    const spacer = clusterLength > 1 ? clusterPosition / clusterLength - 0.5 : 0

    result += spacer * totalClusterWidth

    return result
  }

  // return a value to use as an offset, in 'em'
  const getOffsetForClusterPosition = (
    position: number,
    clusterLength: number
  ): number => {
    return clusterLength > 1 ? 2 * clusterLength - 2 * position - 2 : 0
  }

  const getPerson = (id: number): Person => {
    return people.find((person) => person.id === id) as Person
  }

  const getInvention = (id: number): Invention => {
    return inventions.find((invention) => invention.id === id) as Invention
  }

  return (
    <>
      <div id="person-container">
        {personIdClusters.map((cluster: number[]) =>
          cluster.map((id: number, index: number) => {
            const person = getPerson(id)
            return (
              <Link to={`/people/${person.id}`} key={person.id}>
                <button
                  onClick={() => setSliderToPerson(person)}
                  style={{
                    left: `${getPositionForYearInCluster(
                      person.yearBorn,
                      index,
                      cluster.length
                    )}vw`,
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
          })
        )}
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
        {inventionIdClusters.map((cluster: number[]) =>
          cluster.map((id: number, index: number) => {
            const invention = getInvention(id)
            return (
              isFinite(invention.year) && (
                <Link to={`/inventions/${invention.id}`} key={invention.id}>
                  <button
                    onClick={() => setSliderToEvent(invention)}
                    className={`event text-white font-label font-extralight ${
                      activeEvent === invention.id ? 'active-event' : ''
                    }`}
                    style={{
                      left: `${getPositionForYearInCluster(
                        invention.year,
                        index,
                        cluster.length
                      )}vw`,
                      marginTop: `${getOffsetForClusterPosition(
                        index,
                        cluster.length
                      )}em`,
                    }}
                  >
                    {invention.year}
                  </button>
                </Link>
              )
            )
          })
        )}
      </div>
    </>
  )
}

export default Timeline

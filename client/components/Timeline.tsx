import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'

import { Invention } from '../../models/Inventions'
import { Person } from '../../models/People'
import { Event } from '../../models/Events'

interface Props {
  data: Invention[] | Event[]
  people: Person[]
  filterStatus: { event: string; people: boolean }
}

function Timeline({ data, people, filterStatus }: Props) {
  // some extra years to add on either side
  const buffer = 50

  data.sort((a, b) => a.year - b.year)
  people.sort((a, b) => a.yearBorn - b.yearBorn)

  // setup some global values for the timeline elements
  const rangeMin =
    Math.min(
      data.length &&
        data.reduce(
          (earliestYear, event) =>
            (earliestYear = Math.min(event.year, earliestYear)),
          data[0].year
        ),
      people.length &&
        people.reduce(
          (earliestBorn, person) =>
            (earliestBorn = Math.min(earliestBorn, person.yearBorn)),
          people[0].yearBorn
        )
    ) - buffer

  // get the latest year from all events / people
  const rangeMax =
    Math.max(
      people.length &&
        people.reduce(
          (latestDeath, person) =>
            (latestDeath = Math.max(latestDeath, person.yearBorn)),
          people[0].yearBorn
        ),
      data.length &&
        data.reduce(
          (latestYear, event) =>
            (latestYear = Math.max(event.year, latestYear)),
          data[0].year
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

  useEffect(() => {
    setActiveEvent(0)
  }, [filterStatus.event])

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

  // use gerard's algorithm with the year values to find the clusters, but make an id array at the same time. the id array will get used to make the onscreen items.
  const personIdClusters: number[][] = []
  const personYearClusters: number[][] = []

  for (const person of people) {
    if (
      personYearClusters.length &&
      Math.abs(personYearClusters.at(-1)!.at(-1)! - person.yearBorn) < threshold
    ) {
      personYearClusters.at(-1)!.push(person.yearBorn)
      personIdClusters.at(-1)!.push(person.id)
    } else {
      personYearClusters.push([person.yearBorn])
      personIdClusters.push([person.id])
    }
  }

  // as explained above for person clusters ^^
  const inventionIdClusters: number[][] = []
  const inventionYearClusters: number[][] = []
  for (const event of data) {
    if (
      inventionYearClusters.length &&
      Math.abs(inventionYearClusters.at(-1)!.at(-1)! - event.year) < threshold
    ) {
      inventionYearClusters.at(-1)!.push(event.year)
      inventionIdClusters.at(-1)!.push(event.id)
    } else {
      inventionYearClusters.push([event.year])
      inventionIdClusters.push([event.id])
    }
  }

  const setSliderToEvent = (event: Invention | Event) => {
    setTimelinePosition(event.year)
    setActiveEvent(event.id)
    setActivePerson(0)
    setHoverPerson(0)
  }

  const setSliderToPerson = (person: Person) => {
    setTimelinePosition(person.yearBorn)
    setActivePerson(person.id)
    setActiveEvent(0)
  }

  /**
   * get a value to use for onscreen positioning from the left edge. intended use is as the value for the 'left' css property, in 'vw' or '%'.
   *
   * @param year the event year or persons birthyear
   * @param clusterPosition cluster array index
   * @param clusterLength cluster size
   * @returns a number between approx 15-85
   */
  const getPositionForYearInCluster = (
    year: number,
    clusterPosition: number,
    clusterLength: number
  ): number => {
    // start at center of screen (50%)
    let result = 50

    // increment array index so 0 becomes 1 etc
    clusterPosition = clusterPosition++

    if (year < midway) {
      // bring position toward middle from left
      result = (((year - rangeMin) * 100) / range) * (squeezeFactor / 1)
    } else if (year > midway) {
      // bring position toward middle from right
      result = (((year - rangeMin) * 100) / range) * squeezeFactor
    }

    // figure out which way to adjust if part of a cluster
    const spacer = clusterLength > 1 ? clusterPosition / clusterLength - 0.5 : 0

    // a magic number to assist with grouping/overlapping
    const magicValue = 0.5

    // make a judgment call about space to take up
    const totalClusterWidth = clusterLength * magicValue

    // adjust final position if part of a cluster
    result += spacer * totalClusterWidth

    return result
  }

  /**
   * return a value to use as an offset, in 'em'
   * @param position cluster array index
   * @param clusterLength cluster array length
   * @returns a sane number between 0 and something low
   */
  const getOffsetForClusterPosition = (
    position: number,
    clusterLength: number
  ): number => {
    return clusterLength > 1 ? 2 * clusterLength - 2 * position - 2 : 0
  }

  const getPerson = (id: number): Person => {
    return people.find((person) => person.id === id) as Person
  }

  const getEvent = (id: number): Invention | Event => {
    return data.find((event) => event.id === id) as Invention | Event
  }

  const getSwedishCentury = (year: number): number => {
    if (year % 100 === 0) {
      return year
    }

    const lowerCentury = Math.floor(year / 100) * 100
    const higherCentury = lowerCentury + 100

    if (year - lowerCentury < higherCentury - year) {
      return lowerCentury
    } else {
      return higherCentury
    }
  }

  const centuryMarks = []
  for (
    let i = getSwedishCentury(rangeMin);
    i < getSwedishCentury(rangeMax);
    i = i + 100
  ) {
    centuryMarks.push(i)
  }

  return (
    <>
      <div id="century-mark-container">
        {centuryMarks.map((mark) => (
          <span
            key={mark}
            className="century-mark"
            style={{
              left: `${7.25 + getPositionForYearInCluster(mark, 0, 1)}vw`,
            }}
          >
            {mark}
          </span>
        ))}
      </div>

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
                  onMouseOut={() => setHoverPerson(0)}
                  onFocus={() => setHoverPerson(person.id)}
                  onBlur={() => setHoverPerson(0)}
                >
                  {hoverPerson === person.id || activePerson === person.id
                    ? person.name
                    : ''}
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
        {data.map((event) => {
          return <option value={event.year} key={event.id}></option>
        })}
      </datalist>

      <div id="event-container">
        {inventionIdClusters.map((cluster: number[]) =>
          cluster.map((id: number, index: number) => {
            const event = getEvent(id)
            const lineLength = 19 + (cluster.length - index) * 32
            return (
              isFinite(event.year) && (
                <Link to={`/${filterStatus.event}/${event.id}`} key={event.id}>
                  <button
                    css={css`
                      &::before {
                        width: ${lineLength}px;
                      }
                    `}
                    onClick={() => setSliderToEvent(event)}
                    className={`event text-white font-label font-light ${
                      activeEvent === event.id
                        ? 'active-event text-black font-medium'
                        : ''
                    }`}
                    style={{
                      left: `${getPositionForYearInCluster(
                        event.year,
                        index,
                        cluster.length
                      )}vw`,
                      marginTop: `${getOffsetForClusterPosition(
                        index,
                        cluster.length
                      )}em`,
                    }}
                  >
                    {event.year}
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

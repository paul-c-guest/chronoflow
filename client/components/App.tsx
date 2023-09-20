import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import '../styles/index.css'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Globe from './Globe.tsx'
import Timeline from './Timeline.tsx'
import Filters from './Filters.tsx'
import CountrySelect from './CountrySelect.tsx'
import { getAllInventions } from '../apis/api-inventions.ts'
import type { Invention } from '../../models/Inventions.ts'
import type { Person } from '../../models/People.ts'
import type { Event } from '../../models/Events.ts'
import { getAllPeople } from '../apis/api-people.ts'
import { getAllEvents } from '../apis/api-world-events.ts'
import { CategoryData } from '../../models/Types.ts'
import {
  getNewZealandEventsData,
  getNewZealandInventionsData,
  getNewZealandPeopleData,
} from '../apis/api-country.ts'

interface FilterStatus {
  event: string
  people: boolean
}

function App() {
  const defaultStatus = {
    event: 'worldEvents',
    people: true,
  }

  const {
    data: inventionsData,
    isLoading: inventionsLoading,
    error: inventionsError,
  } = useQuery<Invention[], Error>(['inventions'], getAllInventions)
  const {
    data: peopleData,
    isLoading: peopleLoading,
    error: peopleError,
  } = useQuery<Person[], Error>(['people'], getAllPeople)
  const {
    data: worldEventsData,
    isLoading: worldEventsLoading,
    error: worldEventsError,
  } = useQuery<Event[], Error>(['world-events'], getAllEvents)

  // NZ queries
  const {
    data: inventionsNZData,
    isLoading: inventionsNZLoading,
    error: inventionsNZError,
  } = useQuery<Invention[], Error>(
    ['nz-inventions'],
    getNewZealandInventionsData
  )
  const {
    data: peopleNZData,
    isLoading: peopleNZLoading,
    error: peopleNZError,
  } = useQuery<Person[], Error>(['nz-people'], getNewZealandPeopleData)
  const {
    data: eventsNZData,
    isLoading: eventsNZLoading,
    error: eventsNZError,
  } = useQuery<Event[], Error>(['nz-events'], getNewZealandEventsData)

  const [inventions, setInventions] = useState<Invention[]>([])
  const [people, setPeople] = useState<Person[]>([])
  const [worldEvents, setWorldEvents] = useState<Event[]>([])
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(defaultStatus)
  const [selectedCountry, setSelectedCountry] =
    useState<string>('disabledOption')
  // const [data, setData] = useState<Event[] | Invention[]>([])

  useEffect(() => {
    if (inventionsData && peopleData && worldEventsData) {
      if (selectedCountry === 'disabledOption') {
        setInventions(inventionsData)
        setPeople(peopleData)
        setWorldEvents(worldEventsData)
      } else if (selectedCountry === 'New Zealand') {
        setInventions(inventionsNZData)
        setPeople(peopleNZData)
        setWorldEvents(eventsNZData)
      } else {
        setInventions(filterByCountry(inventionsData, selectedCountry))
        setPeople(filterByCountry(peopleData, selectedCountry))
        setWorldEvents(filterByCountry(worldEventsData, selectedCountry))
      }
    }
  }, [
    selectedCountry,
    inventionsData,
    peopleData,
    worldEventsData,
    inventionsNZData,
    peopleNZData,
    eventsNZData,
  ])

  // useEffect(() => {
  //   if (filterStatus.event === 'worldEvents') {
  //     setData(worldEventsData as Event[])
  //   } else if (filterStatus.event === 'inventions') {
  //     setData(inventionsData as Invention[])
  //   }
  // }, [filterStatus, inventionsData, worldEventsData])

  if (inventionsLoading || peopleLoading || worldEventsLoading) {
    return <p>Loading....</p>
  }

  if (inventionsError || peopleError || worldEventsError) {
    return <p>There was an error: {inventionsError?.message}</p>
  }

  function filterByCountry(data: CategoryData, country: string) {
    return data.filter((item) => item.country === country)
  }

  function getDataForCategory(category: string): Event[] | Invention[] {
    switch (category) {
      case 'inventions':
        return inventions as Invention[]

      case 'worldEvents':
        return worldEvents as Event[]
        p
      default:
        return []
    }
  }

  return (
    <div className="h-screen bg-black bg-cover flex flex-col">
      <Header />
      <div className="flex w-screen mb-10 mt-[-1rem]">
        <Globe selectedCountry={selectedCountry} />
        <div className="flex w-1/2 flex-col">
          <div className="flex flex-row gap-3">
            <Filters
              setFilterStatus={setFilterStatus}
              filterStatus={filterStatus}
            />
            <CountrySelect
              inventions={inventionsData}
              people={peopleData}
              setSelectedCountry={setSelectedCountry}
              selectedCountry={selectedCountry}
            />
          </div>
          <Outlet
            context={{
              inventionsData,
              peopleData,
              worldEventsData,
              inventionsNZData,
              peopleNZData,
              eventsNZData,
              selectedCountry,
            }}
          />
        </div>
      </div>
      <Timeline
        data={getDataForCategory(filterStatus.event)}
        people={filterStatus.people ? people : []}
        filterStatus={filterStatus}
      />
      <div className="mt-auto"></div>
      {/* <Footer /> */}
    </div>
  )
}

export default App

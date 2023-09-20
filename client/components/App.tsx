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
    isLoading,
    error,
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

  const [inventions, setInventions] = useState<Invention[]>([])
  const [people, setPeople] = useState<Person[]>([])
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(defaultStatus)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [data, setData] = useState<Event[] | Invention[]>([])

  useEffect(() => {
    if (inventionsData && peopleData) {
      if (selectedCountry === null) {
        setInventions(inventionsData)
        setPeople(peopleData)
      } else {
        setInventions(filterByCountry(inventionsData, selectedCountry))
        setPeople(filterByCountry(peopleData, selectedCountry))
      }
    }
  }, [selectedCountry, inventionsData, peopleData])

  useEffect(() => {
    if (filterStatus.event === 'worldEvents') {
      setData(worldEventsData as Event[])
    } else if (filterStatus.event === 'inventions') {
      setData(inventionsData as Invention[])
    }
  }, [filterStatus])

  if (isLoading || peopleLoading || worldEventsLoading) {
    return <p>Loading....</p>
  }

  if (error || peopleError || worldEventsError) {
    return <p>There was an error: {error?.message}</p>
  }

  function filterByCountry(data: CategoryData, country: string) {
    return data.filter((item) => item.country === country)
  }

  function getDataForCategory(category: string): Event[] | Invention[] {
    switch (category) {
      case 'inventions':
        return inventionsData as Invention[]

      case 'worldEvents':
        return worldEventsData as Event[]

      default:
        return []
    }
  }

  return (
    <div className="h-screen bg-black bg-cover flex flex-col">
      <Header />
      <section className="main">
        <div className="flex w-screen">
          <Globe selectedCountry={selectedCountry} />
          <div className="flex w-1/2 flex-col h-[36rem]">
            <div className="flex flex-row">
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
            <Outlet context={{ inventionsData, peopleData, worldEventsData }} />
          </div>
        </div>
        <Timeline
          data={getDataForCategory(filterStatus.event)}
          people={filterStatus.people ? peopleData : []}
          category={filterStatus.event}
          filterStatus={filterStatus}
        />
      </section>
      <div className="mt-auto"></div>
      <Footer />
    </div>
  )
}

export default App

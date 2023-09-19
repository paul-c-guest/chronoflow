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
import { Invention } from '../../models/Inventions.ts'
import { Person } from '../../models/People.ts'
import { getAllPeople } from '../apis/api-people.ts'

function App() {
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

  const [inventions, setInventions] = useState([])
  const [people, setPeople] = useState([])
  const [checkboxStatus, setCheckboxStatus] = useState('inventions')
  const [selectedCountry, setSelectedCountry] = useState(null)

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

  if (isLoading || peopleLoading) {
    return <p>Loading....</p>
  }

  if (error || peopleError) {
    return <p>There was an error: {error?.message}</p>
  }

  function filterByCountry(data, country) {
    return data.filter((item) => item.country === country)
  }

  return (
    <div className="h-screen bg-black bg-cover flex flex-col">
      <Header />
      <section className="main">
        <div className="flex w-screen">
          <Globe selectedCountry={selectedCountry} />
          <div className="flex w-1/2 flex-col h-[36rem]">
            <Filters
              setCheckboxStatus={setCheckboxStatus}
              checkboxStatus={checkboxStatus}
            />
            <CountrySelect
              inventions={inventionsData}
              people={peopleData}
              setSelectedCountry={setSelectedCountry}
              selectedCountry={selectedCountry}
            />
            <Outlet context={{ inventionsData, peopleData }} />
          </div>
        </div>
        <Timeline inventions={inventions} people={people} />
      </section>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

export default App

import { useState } from 'react'
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
  const [checkboxStatus, setCheckboxStatus] = useState('inventions')
  const [selectedOption, setSelectedOption] = useState('disabledOption')

  const {
    data: peopleData,
    isLoading: peopleLoading,
    error: peopleError,
  } = useQuery<Person[], Error>(['people'], getAllPeople)

  if (isLoading || peopleLoading) {
    return <p>Loading....</p>
  }

  if (error || peopleError) {
    return <p>There was an error: {error?.message}</p>
  }

  return (
    <div className="h-screen bg-black bg-cover flex flex-col">
      <Header />
      <section className="main">
        <div className="flex w-screen">
          <Globe />
          <div className="flex w-1/2 flex-col h-[36rem]">
            <div className="flex flex-row gap-2 justify-between">
              <Filters
                setCheckboxStatus={setCheckboxStatus}
                checkboxStatus={checkboxStatus}
              />
              <CountrySelect
                inventions={inventionsData}
                people={peopleData}
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
              />
            </div>
            <Outlet context={{ inventionsData }} />
          </div>
        </div>
        <Timeline inventions={inventionsData} />
      </section>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

export default App

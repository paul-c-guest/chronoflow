import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import '../styles/index.css'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Globe from './Globe.tsx'
import Timeline from './Timeline.tsx'
import Filters from './Filters'
import { getAllInventions } from '../apis/api-inventions.ts'
import { Invention } from '../../models/Inventions.ts'

function App() {
  const {
    data: inventionsData,
    isLoading,
    isError,
    error,
  } = useQuery<Invention[], Error>(['inventions'], getAllInventions)
  const [checkboxStatus, setCheckboxStatus] = useState('inventions')

  useEffect(() => {
    console.log('App:', checkboxStatus)
  }, [checkboxStatus])

  if (isLoading) {
    return <p>Loading....</p>
  }

  if (isError || !inventionsData) {
    return <p>There was an error: {error?.message}</p>
  }

  return (
    <>
      <Header />
      <section className="main">
        <div className="flex">
          <Globe />
          <Filters
            setCheckboxStatus={setCheckboxStatus}
            checkboxStatus={checkboxStatus}
          />
          <Outlet context={{ inventionsData }} />
        </div>
        <Timeline inventions={inventionsData} />
      </section>
      <Footer />
    </>
  )
}

export default App

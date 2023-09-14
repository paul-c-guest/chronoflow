import '../styles/index.css'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Globe from './Globe.tsx'
import Timeline from './Timeline.tsx'
import Filters from './Filters'

function App() {
  return (
    <>
      <Header />
      <section className="main">
        <Globe />
        <Filters />
        <Timeline />
      </section>
      <Footer />
    </>
  )
}

export default App

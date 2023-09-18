/* eslint-disable react/no-unknown-property */

import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Suspense,
  useRef,
  useLayoutEffect,
  useEffect,
  useMemo,
  useState,
} from 'react'
import ThreeGlobe from 'three-globe'

function GlobeModel({ countryData }) {

  const [altitude, setAltitude] = useState(0)
  const globe = new ThreeGlobe({ animateIn: true })

  globe
    .globeImageUrl('/assets/earth-blue-marble.jpg')
    .bumpImageUrl('/assets/earth-topology.png')
    .polygonsData(countryData)
    .polygonCapColor(() => 'rgba(236, 3, 252, 0.6)')
    .polygonSideColor(() => 'rgba(236, 3, 252, 0.1)')
    .polygonStrokeColor(() => '#111')
    .polygonAltitude(0.05)

  useFrame(({ clock }) => {
    globe.rotation.y = clock.getElapsedTime() * 0.5
  })

  return (
    <primitive object={globe} position={[0, 0, 0]} scale={[0.2, 0.2, 0.2]} />
  )
}

function Globe() {
  const [countriesData, setCountriesData] = useState(null)
  const [countryCode, setCountryCode] = useState('NZ')

  useEffect(() => {
    // Load and parse the GeoJSON file
    fetch('/assets/ne_110m_admin_0_countries.geojson')
      .then((response) => response.json())
      .then((data) => {
        // Store the country/ies data in state
        setCountriesData(
          data.features.filter((d) => d.properties.ISO_A2 == countryCode)
        )
      })
      .catch((error) => {
        console.error('Error loading GeoJSON:', error)
      })
  }, [countryCode])

  return (
    <div className="w-[45%] h-[36rem]">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 40]}
            fov={75}
            aspect={window.innerWidth / window.innerHeight}
            near={0.1}
            far={1000}
          />
          <ambientLight intensity={1} />
          <directionalLight color="white" position={[0, 0, 5]} />
          <group position={[0, 0, 0]}>
          { countriesData && <GlobeModel countryData={countriesData} />}
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Globe
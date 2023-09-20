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
import * as turf from '@turf/turf'
import { getCountry } from '../helpers'

function GlobeModel({ countryData, centerCoordinates, countryCode }) {
  // TODO:
  // need to convert center co-ords to a rotation value
  // apply rotation

  const [initialYRotation, setInitialYRotation] = useState<null | number>(null)
  const globe = useRef(new ThreeGlobe({ animateIn: true }))

  globe.current
    .globeImageUrl('/assets/earth-blue-marble.jpg')
    .bumpImageUrl('/assets/earth-topology.png')
  if (countryData) {
    globe.current
      .polygonsData(countryData)
      .polygonCapColor(() => 'rgba(236, 3, 252, 0.6)')
      .polygonSideColor(() => 'rgba(236, 3, 252, 0.1)')
      .polygonStrokeColor(() => '#111')
      .polygonAltitude(0.05)
  }

  useEffect(() => {
    if (centerCoordinates) {
      // Reset the globe to its default rotation
      globe.current.rotation.set(0, 0, 0)

      // Convert geographic coordinates to radians
      const phi = (90 - centerCoordinates[1]) * (Math.PI / 180)
      const theta = centerCoordinates[0] * (Math.PI / 180)

      // Set the initial globe rotation
      globe.current.rotation.x = phi
      globe.current.rotation.y = -theta

      // Store the initial y-rotation
      setInitialYRotation(-theta)
    } else {
      setInitialYRotation(null)
    }
  }, [centerCoordinates])

  useFrame(({ clock }) => {
    if (initialYRotation !== null) {
      // globe.current.rotation.y = initialYRotation + clock.getElapsedTime() * 0.5
    } else {
      globe.current.rotation.y = clock.getElapsedTime() * 0.5
    }
  })

  return (
    <primitive
      object={globe.current}
      position={[0, 0, 0]}
      scale={[0.15, 0.15, 0.15]}
    />
  )
}

function Globe({ selectedCountry }) {
  const [countriesData, setCountriesData] = useState(null)
  const [countryCode, setCountryCode] = useState(null)
  const [centerCoordinates, setCenterCoordinates] = useState<null | number[]>(
    null
  )

  useEffect(() => {
    const country = getCountry(selectedCountry)
    if (country) {
      console.log(country)
      setCountryCode(country.code)
      setCenterCoordinates(country.coords)
    }
  }, [selectedCountry])

  // TODO:
  // calculate center of polygon
  // update state for center coords
  // use these co-ords as a prop for GlobeModel

  useEffect(() => {
    if (countryCode !== null) {
      // Load and parse the GeoJSON file
      fetch('/assets/ne_110m_admin_0_countries.geojson')
        .then((response) => response.json())
        .then((data) => {
          // Find the single feature representing the selected country
          const country = data.features.find(
            (d) => d.properties.ISO_A2 === countryCode
          )
          if (country) {
            setCountriesData([country])
          } else {
            console.error(`Country with code ${countryCode} not found`)
          }
        })
        .catch((error) => {
          console.error('Error loading GeoJSON:', error)
        })
    } else {
      // Clear the countriesData when countryCode is null
      setCountriesData(null)
    }
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
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={1} />
          <directionalLight color="white" position={[0, 0, 5]} />
          <group position={[0, 0, 0]}>
            <GlobeModel
              countryData={countriesData}
              centerCoordinates={centerCoordinates}
              countryCode={countryCode}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Globe

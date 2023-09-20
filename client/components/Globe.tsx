/* eslint-disable react/no-unknown-property */

import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useEffect, useState } from 'react'
import ThreeGlobe from 'three-globe'
import { getCountry } from '../helpers'
import {
  GlobeModelProps,
  GlobeProps,
  GeoJSONResponse,
  GeoJSONFeature,
} from '../../models/Globe'

function GlobeModel({
  countryData,
  centerCoordinates,
  selectedCountry,
}: GlobeModelProps) {
  const [initialYRotation, setInitialYRotation] = useState<null | number>(null)
  // useRef means that a new globe isn't created each time the user interacts (is that bad or good idk)
  const globe = useRef(new ThreeGlobe({ animateIn: true }))

  globe.current
    .globeImageUrl('/assets/earth-blue-marble.jpg')
    .bumpImageUrl('/assets/earth-topology.png')
  if (countryData && selectedCountry !== 'disabledOption') {
    globe.current
      .polygonsData(countryData)
      .polygonCapColor(() => '#00ffffee')
      .polygonSideColor(() => '#00ffff66')
      .polygonStrokeColor(() => '#111')
      .polygonAltitude(0.1)
  } else {
    globe.current.polygonsData([]) // reset polygon data when 'All' is selected
  }

  useEffect(() => {
    if (centerCoordinates && selectedCountry !== 'disabledOption') {
      // Reset the globe to its default rotation
      globe.current.rotation.set(0, 0, 0)

      // Convert geographic coordinates to radians
      // const phi = (90 - centerCoordinates[1]) * (Math.PI / 180)
      const theta = centerCoordinates[0] * (Math.PI / 180)

      // globe.current.rotation.x = phi
      globe.current.rotation.y = -theta

      setInitialYRotation(-theta)
    } else {
      setInitialYRotation(null)
    }
  }, [centerCoordinates, selectedCountry])

  useFrame(({ clock }) => {
    if (selectedCountry !== 'disabledOption' && initialYRotation !== null) {
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

function Globe({ selectedCountry }: GlobeProps) {
  const [countriesData, setCountriesData] = useState<GeoJSONFeature[] | null>(
    null
  )
  const [countryCode, setCountryCode] = useState<null | string>(null)
  const [centerCoordinates, setCenterCoordinates] = useState<null | number[]>(
    null
  )

  useEffect(() => {
    console.log('country in globe', selectedCountry)
    const country = getCountry(selectedCountry)
    if (country) {
      console.log(country)
      setCountryCode(country.code)
      setCenterCoordinates(country.coords)
    }
  }, [selectedCountry])

  useEffect(() => {
    if (countryCode !== null) {
      // Load and parse the GeoJSON file
      fetch('/assets/ne_110m_admin_0_countries.geojson')
        .then((response) => response.json() as Promise<GeoJSONResponse>)
        .then((data) => {
          // Find the single feature representing the selected country
          const country = data.features.find(
            (d) => d.properties.ISO_A2 === countryCode
          ) as GeoJSONFeature | undefined
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
              selectedCountry={selectedCountry}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Globe

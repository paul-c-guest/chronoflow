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
import { getCountryCode } from '../helpers'

function GlobeModel({ countryData, centroidCoordinates }) {
  // inside globemodel add a useEffect to rotate the globe to centroid coords
  // need to convert center co-ords to a rotation value
  // apply rotation
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
    console.log(centroidCoordinates)
    if (centroidCoordinates) {
      const phi = (90 - centroidCoordinates[0]) * (Math.PI / 180)
      const theta = (centroidCoordinates[1] + 180) * (Math.PI / 180)
      globe.current.rotation.x = phi
      globe.current.rotation.y = theta
    }
  }, [centroidCoordinates])

  useFrame(({ clock }) => {
    if (!centroidCoordinates) {
      globe.current.rotation.y += clock.getElapsedTime() * 0.5
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
  const [centroidCoordinates, setCentroidCoordinates] = useState<
    null | number[]
  >(null)

  useEffect(() => {
    const code = getCountryCode(selectedCountry)
    console.log(code)
    setCountryCode(code)
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
          const countryFeature = data.features.find(
            (d) => d.properties.ISO_A2 === countryCode
          )

          if (countryFeature) {
            // Find the centroid of the country's polygon
            const centroid = turf.centroid(countryFeature)

            // Set the centroid coordinates
            setCentroidCoordinates([
              centroid.geometry.coordinates[1],
              centroid.geometry.coordinates[0],
            ])
          } else {
            console.error(`Country with code ${countryCode} not found`)
          }

          // Set the country data
          setCountriesData([countryFeature])
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
              centroidCoordinates={centroidCoordinates}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Globe

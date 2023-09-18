/* eslint-disable react/no-unknown-property */

import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useLayoutEffect, useEffect, useMemo } from 'react'
import ThreeGlobe from 'three-globe'

function GlobeModel() {
  // const N = 300
  // const gData = [...Array(N).keys()].map(() => ({
  //   lat: (Math.random() - 0.5) * 180,
  //   lng: (Math.random() - 0.5) * 360,
  //   size: Math.random() / 3,
  //   color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
  // }))

  const gData = [
    {
      lat: 37.0902,
      lng: -95.7129,
      size: Math.random() / 3,
      color: 'red',
    },
    {
      lat: -40.9006,
      lng: 174.886,
      size: Math.random() / 3,
      color: 'green',
    },
  ]

  const globe = new ThreeGlobe({ animateIn: true })

  globe
    .globeImageUrl('/assets/earth-blue-marble.jpg')
    .bumpImageUrl('/assets/earth-topology.png')
    .pointsData(gData)
    .pointAltitude('size')
    .pointColor('color')

  useFrame(({ clock }) => {
    globe.rotation.y = clock.getElapsedTime() * 0.5
  })

  return (
    <primitive object={globe} position={[0, 0, 0]} scale={[0.2, 0.2, 0.2]} />
  )
}

function Globe() {
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
            <GlobeModel />
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Globe

{
  /* <OrbitControls enableZoom={false} /> */
}

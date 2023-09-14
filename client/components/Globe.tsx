/* eslint-disable react/no-unknown-property */

import { Canvas, useFrame } from '@react-three/fiber'
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useProgress,
} from '@react-three/drei'
import { Suspense } from 'react'

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Html center>{Math.floor(progress)} % loaded</Html>
}

function GlobeModel() {
  const { scene } = useGLTF('/assets/globe/scene.gltf')

  useFrame(({ clock }) => {
    scene.rotation.y = clock.getElapsedTime() * 0.5
  })

  return <primitive object={scene} scale={[1.5, 1.5, 1.5]} />
}

function Globe() {
  return (
    <div className="w-1/2 h-[36rem]">
      <Canvas>
        <Suspense fallback={<Loader />}>
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 40]}
            fov={75}
            aspect={window.innerWidth / window.innerHeight}
            near={0.1}
            far={1000}
          />
          <ambientLight intensity={1} />
          <OrbitControls
            enableZoom={false}
            // maxPolarAngle={0.5}
            // minPolarAngle={0}
          />
          <group position={[0, 15, 0]}>
            <GlobeModel />
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Globe

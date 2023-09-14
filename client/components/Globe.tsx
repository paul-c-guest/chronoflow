/* eslint-disable react/no-unknown-property */

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'

function GlobeModel() {
  const { scene } = useGLTF('/assets/globe/scene.gltf')

  useFrame(({ clock }) => {
    scene.rotation.y = clock.getElapsedTime()
  })

  return <primitive object={scene} />
}

function Globe() {
  return (
    <div>
      <h1>globe</h1>
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 20]}
          fov={75}
          aspect={window.innerWidth / window.innerHeight}
          near={0.1}
          far={1000}
        />
        <ambientLight intensity={1} />
        <OrbitControls />
        <GlobeModel />
      </Canvas>
    </div>
  )
}

export default Globe

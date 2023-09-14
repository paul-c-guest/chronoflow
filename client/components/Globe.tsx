/* eslint-disable react/no-unknown-property */

// import { createRoot } from 'react-dom/client'
// import { Canvas } from '@react-three/fiber'

import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

function Globe() {
  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 20

    const canvas = document.getElementById('threeJsCanvas')

    const renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    new OrbitControls(camera, renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const loader = new GLTFLoader()
    loader.load('/globe-2.0/scene.gltf', (gltf) => {
      scene.add(gltf.scene)
    })

    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()
  }, [])

  return (
    <div>
      <h1>globe</h1>
      <canvas id="threeJsCanvas"></canvas>
    </div>
  )
}

export default Globe

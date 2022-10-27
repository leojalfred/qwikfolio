import {
  $,
  component$,
  Slot,
  useClientEffect$,
  useOnWindow,
  useSignal,
  useStore
} from '@builder.io/qwik'
import * as THREE from 'three'
import { fadeInVisibleSections } from '~/helpers'

export let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer
export const stars: THREE.Mesh<
  THREE.SphereGeometry,
  THREE.MeshBasicMaterial
>[] = []

export function init() {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.z = 5

  scene = new THREE.Scene()

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
}

export function render(scrollDifference: number) {
  renderer.render(scene, camera)

  for (const star of stars) {
    star.position.z += scrollDifference / 10
    if (star.position.z > 1000) star.position.z -= 2000
    else if (star.position.z < -1000) star.position.z += 2000
  }

  camera.lookAt(0, 0, 0)
}

export default component$(() => {
  useClientEffect$(() => {
    init()

    // add stars
    for (let z = -1000; z < 1000; z += 5) {
      const geometry = new THREE.SphereGeometry(0.5, 32, 32)
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
      const sphere = new THREE.Mesh(geometry, material)

      sphere.position.x = Math.random() * 1000 - 500
      sphere.position.y = Math.random() * 1000 - 500
      sphere.position.z = z

      scene.add(sphere)
      stars.push(sphere)
    }

    renderer.render(scene, camera)
  })

  const main = useSignal<HTMLDivElement>()
  const state = useStore({
    lastScrollTop: 0,
    scrollDifference: 0
  })

  useOnWindow('load', $(fadeInVisibleSections))
  useOnWindow('scroll', $(fadeInVisibleSections))
  useOnWindow('resize', $(fadeInVisibleSections))

  useOnWindow(
    'resize',
    $(() => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(window.innerWidth, window.innerHeight)

      requestAnimationFrame(() => render(state.scrollDifference))
    })
  )

  return (
    <div
      className="canvas"
      ref={main}
      onScroll$={() => {
        if (main.value) {
          const st = main.value.scrollTop
          state.scrollDifference = st - state.lastScrollTop
          requestAnimationFrame(() => render(state.scrollDifference))
          state.lastScrollTop = st <= 0 ? 0 : st
        }
      }}
    >
      <Slot />
    </div>
  )
})

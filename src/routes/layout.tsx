import {
  component$ /* Slot */,
  useClientEffect$,
  useRef,
  useStore
} from '@builder.io/qwik'
import * as THREE from 'three'
// import Header from '../components/header/header';

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

export function addSphere() {
  for (let z = -1000; z < 1000; z += 5) {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32)
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const sphere = new THREE.Mesh(geometry, material)

    sphere.position.x = Math.random() * 1000 - 500
    sphere.position.y = Math.random() * 1000 - 500
    sphere.position.z = z
    sphere.scale.x = sphere.scale.y = 2

    scene.add(sphere)
    stars.push(sphere)
  }
}

export function render() {
  renderer.render(scene, camera)
}

export default component$(() => {
  useClientEffect$(() => {
    init()
    addSphere()
    render()
  })

  // TODO handle window resize

  const main = useRef()
  const state = useStore({
    lastScrollTop: 0,
    scrollDifference: 0
  })

  return (
    // <>
    //   <main>
    //     <Header />
    //     <section>
    //       <Slot />
    //     </section>
    //   </main>
    //   <footer>
    //     <a href="https://www.builder.io/" target="_blank">
    //       Made with ♡ by Builder.io
    //     </a>
    //   </footer>
    // </>
    <main
      ref={main}
      onScroll$={() => {
        if (main.current) {
          const st = main.current.scrollTop
          state.scrollDifference = st - state.lastScrollTop
          requestAnimationFrame(() => {
            renderer.render(scene, camera)

            for (let i = 0; i < stars.length; i++) {
              const star = stars[i]
              star.position.z += state.scrollDifference / 10
              if (star.position.z > 1000) star.position.z -= 2000
              else if (star.position.z < -1000) star.position.z += 2000
            }
          })
          state.lastScrollTop = st <= 0 ? 0 : st
        }
      }}
    >
      <div></div>
    </main>
  )
})

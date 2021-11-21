import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TextureLoader } from 'three'

// textures
const textureLoader = new THREE.TextureLoader()

const doorColorTesture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTesture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientTesture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTesture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTesture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTesture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTesture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTesture = textureLoader.load('/textures/matcaps/5.png')
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Odjects

const material = new THREE.MeshBasicMaterial({map: matcapTesture})

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(.5, 16, 16),
    material
)

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(.3, 0.2, 16, 32),
    material
)

sphere.position.x = - 1.5
torus.position.x = 1.5
scene.add(sphere, plane, torus)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // update object 
    sphere.rotation.z = .1 * elapsedTime
    plane.rotation.x = .1 * elapsedTime
    torus.rotation.y = .5 * elapsedTime


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
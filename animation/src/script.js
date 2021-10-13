import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Axeshelper
const AxesHelper = new THREE.AxesHelper(2)
scene.add(AxesHelper)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// clock
const clock = new THREE.Clock()

//Animations
const tick = () => {

    // clock
    const elapseTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = elapseTime * Math.PI * 2
    camera.position.y = Math.cos(elapseTime)
    // camera.position.x = Math.sin(elapseTime)
    camera.lookAt(mesh.position)
    
    // render
    renderer.render(scene, camera)
    
    window.requestAnimationFrame(tick)
}

tick()
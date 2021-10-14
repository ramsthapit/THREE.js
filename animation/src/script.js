import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

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
// const AxesHelper = new THREE.AxesHelper(2)
// scene.add(AxesHelper)

// Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
const aspectRatio = sizes.width/sizes.height
const camera = new THREE.OrthographicCamera(-1*aspectRatio, 1*aspectRatio, 1, -1, 0.1, 100)
camera.position.z = 3
camera.position.y = 1
camera.position.x = 1
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// clock
// const clock = new THREE.Clock()

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 1})

//Animations
const tick = () => {

    // // clock
    // const elapseTime = clock.getElapsedTime()

    // // Update objects
    mesh.rotation.y += 0.01
    // camera.position.y = Math.cos(elapseTime)
    // // camera.position.x = Math.sin(elapseTime)
    camera.lookAt(mesh.position)
    
    // render 
    renderer.render(scene, camera)
    
    window.requestAnimationFrame(tick)
}

tick()
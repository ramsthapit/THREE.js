import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // update sizes
    sizes.width =  window.innerWidth
    sizes.height = window.innerHeight
    
    // update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)



// Axeshelper
const AxesHelper = new THREE.AxesHelper(2)
scene.add(AxesHelper)

// Camera
const aspectRatio = sizes.width/sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000)

camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// clock
const clock = new THREE.Clock()

//Animations
const tick = () => {

    // clock
    const elapseTime = clock.getElapsedTime()
    
    // update control
    controls.update()
    
    // Update camera
    camera.position.y = cursor.y * 3
    // camera.position.x = cursor.x * 3
    // camera.lookAt(new THREE.Vector3())
    
    // render 
    renderer.render(scene, camera)
    
    window.requestAnimationFrame(tick)
}

tick()
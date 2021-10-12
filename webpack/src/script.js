import './style.css'
import * as THREE from 'three'


// scene
const scene = new THREE.Scene()

// red cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'blue' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// postion
// mesh.position.y = 0.8
// mesh.position.x = 1
// mesh.position.z = -3
mesh.position.set(1,0.8,-3)

// Scale
mesh.scale.set(2, 1, 1)

// Rotation
mesh.rotation.reorder('YXZ')
// mesh.rotation.x = 3.14159
mesh.rotation.y = Math.PI * 0.5
mesh.rotation.x = Math.PI * 0.25

// axes helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// sizes
const sizes = {
  width: 800,
  height:600
}

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(1,2,4)

scene.add(camera)

// lookAt
// camera.lookAt(new THREE.Vector3(1,1,0))
camera.lookAt(mesh.position)

// console.log(mesh.position.distanceTo(camera.position))

// render
const canvas = document.querySelector('.webgl')
console.log(canvas);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)

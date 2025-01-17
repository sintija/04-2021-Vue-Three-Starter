import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import LoadingController from './LoadingController'

class Floor {
    constructor() {
        this.bind()
        //create the instance of the loader
        this.modelLoader = new GLTFLoader(LoadingController)
    }

    init(scene) {
        this.scene = scene
        this.floor

        this.modelLoader.load('./assets/models/floor.glb', (glb) => {
            //console.log(glb)
            glb.scene.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    this.floor = child
                }

            })

            this.floor.translateY(-4)
            this.floor.scale.multiplyScalar(1.5)

            this.scene.add(this.floor)

        })
    }

    update() {

    }

    bind() {

    }
}

const _instance = new Floor()
export default _instance
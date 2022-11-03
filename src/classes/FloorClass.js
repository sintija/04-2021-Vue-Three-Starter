import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'






class Floor {
    constructor() {
        this.bind()
        //create the instance of the loader
        this.modelLoader = new GLTFLoader()
    }

    init(scene) {
        this.scene = scene

        this.modelLoader.load('./assets/models/floor.glb', (glb) => {
            //console.log(glb)

             this.scene.add(glb.scene)

        })
    }

    update() {

    }

    bind() {

    }
}

const _instance = new Floor()
export default _instance
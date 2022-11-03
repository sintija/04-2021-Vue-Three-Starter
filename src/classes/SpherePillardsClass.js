//importing the model
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'





class SpherePillards {
    constructor() {
        this.bind()
        //instantiate the  model loader
        this.modelLoader = new GLTFLoader()
         //instantiate the  texture loader
         this.texLoader = new THREE.TextureLoader()

    }

    init(scene) {

        //loading the matcaps 
        const gTex = this.texLoader.load('./assets/textures/greyMetal.png')
        const bTex = this.texLoader.load('./assets/textures/blackMetal.png')
        this.scene = scene


        //creating the materials 
        //grey metal 
        this.gMatCap = new THREE.MeshMatcapMaterial({
            matcap: gTex

        })
        this.bMatCap = new THREE.MeshMatcapMaterial({
            matcap: bTex

        })



         //Loading the model
        this.modelLoader.load('./assets/models/pillard.glb', (glb) => {
            // console.log(glb)

            //selecting the element from the scene

            glb.scene.traverse(child => {
                if(child.name == "base")
                //apply the texture from the mat cap
                child.material = this.bMatCap
                if(child.name == "Cylinder")
                child.material = this.gMatCap
            })




            //loading the scene onto the screen
            this.scene.add(glb.scene)


        })


    }

    update() {

    }

    bind() {

    }
}

const _instance = new SpherePillards()
export default _instance
//importing the model
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { SphereGeometry } from 'three'





class SpherePillards {
    constructor() {
        this.bind()
        //instantiate the  model loader
        this.modelLoader = new GLTFLoader()
         //instantiate the  texture loader
         this.texLoader = new THREE.TextureLoader()

    }

    init(scene) {
        this.scene = scene
        this.pillard

        //loading the matcaps 
        const gTex = this.texLoader.load('./assets/textures/greyMetal.png')
        const bTex = this.texLoader.load('./assets/textures/blackMetal.png')


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
                if(child.name == "base") {
                     //apply the texture from the mat cap
                 this.pillard = child
                child.material = this.bMatCap


                }
               
                if(child.name == "Cylinder")
                child.material = this.gMatCap
            })


             this.computePositions()
            //loading the scene onto the screen
            this.scene.add(glb.scene)


        })
    }

//function call when the pillars module is loaded 
    computePositions() {
        //console.log(this.pillard)
        this.scene.add(this.pillard)
        //ecosphere to take the pillars
        //creating the geometry


        
        const sphereGeom = new THREE.IcosahedronGeometry(2,4)
        const sphereMat = this.gMatCap
        //create the instance of the sphere
        // const sphere = new THREE.Mesh(sphereGeom,sphereMat)
        const sphere = new THREE.Mesh(sphereGeom, new THREE.MeshNormalMaterial({
            //making the wireframe
            wireframe: true

        }))

        //add it to the scene 
        console.log(sphereGeom)

        //creating the vertex array 
        let verArray = []






        for(let i= 0; i < sphereGeom.attributes.position.array.length; i+=3) {
              // console.log(i)
            // console.log(sphereGeom.attributes.position.array[i])
            const x = sphereGeom.attributes.position.array[i]
            const y = sphereGeom.attributes.position.array[i + 1]
            const z = sphereGeom.attributes.position.array[i + 2]
            verArray.push({
                x: x,
                y: y,
                z: z,
            })



          
        }
        console.log(verArray)
        this.scene.add(sphere)

    }

    update() {

    }

    bind() {

    }
}

const _instance = new SpherePillards()
export default _instance
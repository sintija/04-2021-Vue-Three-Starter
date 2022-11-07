//importing the model
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import {
    SphereGeometry
} from 'three'


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
        //create a new vector 
        this.upVec = new THREE.Vector3(0,1,0)
        this.pillards = new THREE.Group()
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
                if (child.name == "base") {
                    //apply the texture from the mat cap
                    this.pillard = child
                    child.material = this.bMatCap
                }

                if (child.name == "Cylinder")
                    child.material = this.gMatCap
            })
            this.computePositions()
            //loading the scene onto the screen
            // this.scene.add(glb.scene)
        })
    }

    //function call when the pillars module is loaded 
    computePositions() {
        //console.log(this.pillard)

        //ecosphere to take the pillars
        //creating the geometry
        const sphereGeom = new THREE.IcosahedronGeometry(2, 3)
        const sphereMat = this.gMatCap
        //create the instance of the sphere
        const sphere = new THREE.Mesh(sphereGeom,sphereMat)
        // const sphere = new THREE.Mesh(sphereGeom, new THREE.MeshNormalMaterial({
           
        //     wireframe: true

        // }))

        this.scene.add(sphere)
        // console.log(sphereGeom)

        //creating the vertex array 
        let verArray = []
        for (let i = 0; i < sphereGeom.attributes.position.array.length; i += 3) {
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
        //console.log(verArray)


        //create an array for pillards position 
        let pillPos = []

        //FILTER THE VERTICES
        //loop through the each of the icosphere vertices and see if those positions
        //exist in the pillars position array 
        //if they don't exist, add them and instatiate the pillard, if they do dont do anything

        for (let i = 0; i < verArray.length; i++) {
            let existsFlag = false
            for (let j = 0; j < pillPos.length; j++) {

                if (pillPos[j].x == verArray[i].x && pillPos[j].y == verArray[i].y && pillPos[j].z == verArray[i].z) {

                    //if pillars pos is equal to the vertex array 

                    existsFlag = true;
                    //console.log('hey')
                }
            }

            if (!existsFlag) {
                pillPos.push({
                    x: verArray[i].x,
                    y: verArray[i].y,
                    z: verArray[i].z,

                })

                //create a clone of pillards

                const c = this.pillard.clone()
                 //create a position vector 
                 const posVec = new THREE.Vector3(verArray[i].x, verArray[i].y, verArray[i].z)
                c.scale.multiplyScalar(.2)
               
                c.position.copy(posVec)
                c.quaternion.setFromUnitVectors(this.upVec, posVec.normalize())
                this.pillards.add(c)

            }

        }

        this.scene.add(this.pillards)

        console.log(pillPos)
        this.scene.add(sphere)

    }


    update() {
        // console.log('yoyo')
        let i = 0; 
        while (i < this.pillards.children.length) {
            this.pillards.children[i].children[0].position.y = (Math.sin(Date.now() * 0.01 + this.pillards.children[i].position.x) +1) * 1.5
            i++; 

        }

    }

    bind() {

    }
}

const _instance = new SpherePillards()
export default _instance
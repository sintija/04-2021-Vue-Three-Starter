import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

import spectrumFrag from '../shaders/spectrum.frag'
import spectrumVert from '../shaders/spectrum.vert'


class Spectrum {
    constructor() {
        this.bind()
        //create the instance of the loader
        this.modelLoader = new GLTFLoader()

        //texture loader to create a texture 
        this.textureLoader = new THREE.TextureLoader()

    }

    init(scene) {
        this.scene = scene

        this.uniforms = {
            uMatCap: {

                value: this.textureLoader.load('assets/textures/blackMetal.png')
            }, 
            uSpecterSize: {
                value: 0.8
            }, 

            uWaveBorder: {
                value: 0.3
            },

            uBorderColor: {
                value: new THREE.Color('hsl(287, 80%, 80%)')
            },

            uTime: {
                value: 0

            }


        }
     

        //passing the vertex, fragment shader and the uniforms
        this.shaderMat = new THREE.ShaderMaterial({
            transparent: true,
            fragmentShader: spectrumFrag,
            vertexShader: spectrumVert,
            uniforms: this.uniforms,
        

        })

        this.modelLoader.load('./assets/models/spectrum.glb', (glb) => {
            //console.log(glb)
            glb.scene.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    // child.material = new THREE.MeshNormalMaterial()
                    child.material = this.shaderMat
                    child.scale.multiplyScalar(4.5)
                    child.position.y = 0.5
                    child.position.x = 0

                }

            })
            this.scene.add(glb.scene)

        })
    }

    update() {
        this.uniforms.uTime.value +=1

    }

    bind() {

    }
}

const _instance = new Spectrum()
export default _instance
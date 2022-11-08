import { def } from '@vue/shared'
import * as THREE from 'three'

const _instance = new THREE.LoadingManager()

_instance.onProgress = function(url, loaded, total) {
    console.log(loaded /total * 100 + "%")
}




export default _instance
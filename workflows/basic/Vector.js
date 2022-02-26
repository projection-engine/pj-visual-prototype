import Node from '../../templates/Node'
import {TYPES} from "../../templates/TYPES";
import NODE_TYPES from "../../templates/NODE_TYPES";

export default class Vector extends Node {
    a = 0
    b = 0
    c = 0
    constructor() {
        super(
            [{label: 'Value', key: 'value', type: TYPES.VEC}],
            [{label: 'Value', key: 'value', type: TYPES.VEC}]);
        this.value = [0,0,0]
        this.name = 'Vector3'
    }

    get type() {
        return NODE_TYPES.DATA
    }

    compile() {
        return new Promise(resolve => {
            this.ready = true
            resolve()
        })
    }
}
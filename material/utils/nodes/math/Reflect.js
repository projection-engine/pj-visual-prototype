import Node from "../../../../components/templates/Node"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../../components/templates/NODE_TYPES"


export default class Reflect extends Node {
    constructor() {
        super([
            {label: 'Vector', key: 'a', accept: [DATA_TYPES.VEC3]},
            {label: 'Normal', key: 'n', accept: [DATA_TYPES.VEC3]}
        ], [
            {label: 'Result', key: 'reflectRes', type: DATA_TYPES.VEC3}
        ]);
        this.name = 'Reflect'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }


    getFunctionInstance() {
        return ''
    }

    async  getInputInstance(index) {
        return ''
    }

    getFunctionCall({n, a}, index) {
        this.reflectRes = 'reflectRes' + index

        if(a)
            return `vec3 ${this.reflectRes} = reflect(${a.name}, ${n.name});`
        else
            return ''
    }
}
import Node from "../../templates/Node"
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../templates/NODE_TYPES"


export default class AbsoluteWorldPosition extends Node {

    constructor() {
        super([], [
            {label: "Coordinates", key: "vPosition", type: DATA_TYPES.VEC4}
        ])

        this.name = "AbsoluteWorldPosition"
        this.size = 2
    }

    get type() {
        return NODE_TYPES.STATIC
    }

    getFunctionInstance() {
        return ""
    }

    async getInputInstance() {
        return ""
    }

    getFunctionCall( ) {
        this.vPosition = "vPosition"
        return ""
    }
}
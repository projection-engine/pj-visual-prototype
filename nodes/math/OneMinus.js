import Node from "../../templates/Node"
import {DATA_TYPES} from "../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../templates/NODE_TYPES"


export default class OneMinus extends Node {
    constructor() {
        super([
            {label: "A", key: "a", accept: [DATA_TYPES.FLOAT]}
        ], [
            {label: "Result", key: "oneMinusRes", type: DATA_TYPES.FLOAT}
        ])
        this.name = "1-X"
        this.size = 1
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }


    getFunctionInstance() {
        return ""
    }

    async  getInputInstance() {
        return ""
    }

    getFunctionCall({a}, index) {
        this.oneMinusRes = "oneMinusRes" + index
        if( a)
            return `float ${this.oneMinusRes} = 1. - ${a.name};`
        else
            return `float ${this.oneMinusRes};`
    }

}
import Node from "../Node"
import {DATA_TYPES} from "../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../data/NODE_TYPES"


export default class Max extends Node {
    constructor() {
        super([
            {label: "A", key: "a", accept: [DATA_TYPES.FLOAT]},
            {label: "B", key: "b", accept: [DATA_TYPES.FLOAT] }
        ], [
            {label: "Result", key: "maxRes", type: DATA_TYPES.FLOAT}
        ])
        this.equalTypeInputs = true
        this.name = "Max"
        this.size = 2
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }


     

    async  getInputInstance() {
        return ""
    }

    getFunctionCall({a,b}, index) {
        this.maxRes = "maxRes" + index
        if(b && a)
            return `float ${this.maxRes} = max(${a.name}, ${b.name});`
        else
            return `float ${this.maxRes};`
    }

}
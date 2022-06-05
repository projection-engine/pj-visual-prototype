import Node from "../../../../components/templates/Node"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"
import NODE_TYPES from "../../../../components/templates/NODE_TYPES"

import {v4 as uuidv4} from "uuid"

export default class EntityReference extends Node {
    constructor(id, name, components) {
        super(
            [],
            [
                {label: "Entity", key: "entityRes", type: DATA_TYPES.ENTITY, components: components}
            ])
        this.size = 2
        this.id = uuidv4()
        this.entityID = id
        this.name = name
    }

    get type() {
        return NODE_TYPES.REFERENCE
    }


    getFunctionInstance() {
        return ""
    }

    async  getInputInstance() {
        return ""
    }

    getFunctionCall(_, index) {
        this.entityRes = "entityRes" + index
        return `const ${this.entityRes} = params.entities['${this.entityID}'];`

    }

}
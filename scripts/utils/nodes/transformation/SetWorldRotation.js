import Node from "../../../../components/templates/Node"
import COMPONENTS from "../../../../../../engine/templates/COMPONENTS"
import NODE_TYPES from "../../../../components/templates/NODE_TYPES"
import {DATA_TYPES} from "../../../../../../engine/templates/DATA_TYPES"

export default class SetWorldRotation extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]},
            {label: 'Entity', key: 'entity', accept: [DATA_TYPES.ENTITY], componentRequired: COMPONENTS.TRANSFORM},
            {label: 'Quaternion', key: 'rotation', accept: [DATA_TYPES.VEC4]},

        ], [
            {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION}]);
        this.name = 'SetWorldRotation'
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }



    getFunctionInstance() {
        return ''
    }

    async getInputInstance(index) {
        return ''
    }

    getFunctionCall({rotation, entity}) {
        if (rotation && entity)
            return `
               ${entity.name}.components[params.COMPONENTS.TRANSFORM].rotationQuat = ${rotation.name}
            `
        return ''
    }
}
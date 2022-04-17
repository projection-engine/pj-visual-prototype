import Node from "../../../base/Node";
import NODE_TYPES from "../../../base/NODE_TYPES";
import {DATA_TYPES} from "../../../base/DATA_TYPES";

const toDeg = 57.29
export default class UpdateCameraLookAt extends Node {

    constructor() {
        super([
            {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]}
        ], [
            {label: 'Execute', key: 'EXECUTION', type: DATA_TYPES.EXECUTION},
        ]);
        this.name = 'UpdateCameraLookAt'
        this.size = 2
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }

    static compile(tick, {cameraRoot}, entities, attributes) {
        cameraRoot.updateViewMatrix()
        return attributes
    }
}
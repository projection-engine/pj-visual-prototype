import Node from "../../../base/Node";
import {DATA_TYPES} from "../../../base/DATA_TYPES";
import NODE_TYPES from "../../../base/NODE_TYPES";


export default class MouseX extends Node {

    constructor() {
        super(
            [],
            [{label: 'Position', key: 'x', type: DATA_TYPES.NUMBER}],
        );
        this.name = 'MouseX'
    }

    get type() {
        return NODE_TYPES.DATA
    }

    static compile(tick, inputs, entities, attributes, nodeID, exec, setExec, rTarget, keys, {x, y}) {

        attributes[nodeID] = {}
        attributes[nodeID].x = x

        return attributes
    }
}
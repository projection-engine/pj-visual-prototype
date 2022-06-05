import Node from "../../../../../components/templates/Node"
import NODE_TYPES from "../../../../../components/templates/NODE_TYPES"


export default class Getter extends Node {

    constructor(id, name, type) {
        super([], [{label: 'Value', key: 'value', type: type}]);

        this.id = id
        this.name = name
        this.size = 2
    }

    get type (){
        return NODE_TYPES.GETTER
    }
    static compile(tick, inputs, entities, attributes, nodeID, executors, setExecutors) {
        const id = nodeID.split('/')[0]
        attributes[nodeID] = {
            value:  executors[id].value
        }

        return attributes
    }
}
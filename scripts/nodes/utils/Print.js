import Node from '../../../components/Node'
import {DATA_TYPES} from "../../../components/DATA_TYPES";
import NODE_TYPES from "../../../components/NODE_TYPES";

export default class Print extends Node {
    data = ''
    constructor() {
        super([
                {label: 'Start', key: 'start', accept: [DATA_TYPES.EXECUTION]},
                {label: 'Data', key: 'data', accept: [DATA_TYPES.ANY], bundled: true, type: DATA_TYPES.STRING}
            ],
            [{label: 'Tick', key: 'tick', type: DATA_TYPES.EXECUTION}]);
        this.name = 'Print'
        this.size = 1
    }

    get type() {
        return NODE_TYPES.VOID_FUNCTION
    }
     getFunctionInstance() {
        return ''
    }

    async  getInputInstance(index) {
        return ''
    }

    getFunctionCall({data}) {
        return `console.log(${data ? data.name : this.data })`
    }

}
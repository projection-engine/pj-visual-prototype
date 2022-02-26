import {materialAvailable} from "../templates/MaterialAvailable";
import {basicAvailable} from "../templates/BasicAvailable";
import handleDropBoard from "./handleDropBoard";
import deleteNode, {removeLink} from "./deleteNode";

export default function getBoardOptions(pushNode,setSelected, hook, links) {
    const options = [...materialAvailable, ...basicAvailable]
    return [...options.map(o => {
        return {
            requiredTrigger: 'data-board',
            label: o.label,
            icon: <span className={'material-icons-round'}>{materialAvailable.indexOf(o) > -1 ? 'texture' : 'functions'}</span>,
            onClick: (_, mouseInfo) => {
                pushNode(handleDropBoard(o.dataTransfer), mouseInfo)
            }
        }
    }),
        {
            requiredTrigger: 'data-node',
            label: 'Edit',
            icon: <span className={'material-icons-round'}>edit</span>,
            onClick: (node) => {
                setSelected([node.getAttribute('data-node')])
            }
        },
        {
            requiredTrigger: 'data-node',
            label: 'Delete',
            icon: <span className={'material-icons-round'}>delete</span>,
            onClick: (node) => {
                deleteNode(node.getAttribute('data-node'), hook, setSelected)
            }
        },
        {
            requiredTrigger: 'data-link',
            label: 'Break link',
            icon: <span className={'material-icons-round'}>link_off</span>,
            onClick: (node) => {
                removeLink(links.find(l => (l.target + '-' + l.source) === node.getAttribute('data-link')), hook)
            }
        },
        {
            requiredTrigger: 'data-self',
            label: 'Break link',
            icon: <span className={'material-icons-round'}>link_off</span>,
            onClick: (node) => {
                removeLink(links.find(l => (l.target + '-' + l.source) === node.getAttribute('data-link')), hook)
            }
        },]
}
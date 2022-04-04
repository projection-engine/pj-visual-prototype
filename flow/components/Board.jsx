import PropTypes from "prop-types";
import React, {useMemo, useState} from "react";
import Node from "./Node";
import styles from '../styles/Board.module.css'
import handleDropBoard from "../utils/handleDropBoard";

import handleBoardScroll from "../utils/handleBoardScroll";
import useBoard from "../hooks/useBoard";
import {ContextWrapper} from "@f-ui/core";
import getBoardOptions from "../utils/getBoardOptions";
import OnDragProvider from "../hooks/DragProvider";
import SelectBox from "../../../../components/selectbox/SelectBox";
import Context from "./Context";
import deleteNode, {removeLink} from "../utils/deleteNode";
import Group from "./Group";

export default function Board(props) {
    const {scale, setScale} = props
    const {

        links,
        ref,
        handleLink
    } = useBoard(props.hook, scale, setScale)

    const handleDropNode = (n, e) => {
        const bounding = {
            x: ref.current.scrollLeft - ref.current.getBoundingClientRect().left,
            y: ref.current.scrollTop - ref.current.getBoundingClientRect().top
        }
        const mousePlacement = {
            x: e.clientX + bounding.x,
            y: e.clientY + bounding.y
        }
        const current = {
            x: mousePlacement.x,
            y: mousePlacement.y
        }
        n.x = (current.x - 100) / scale
        n.y = (current.y - 25) / scale
        props.hook.setNodes(prev => {
            return [...prev, n]
        })
    }
    const boardOptions = useMemo(() => {
        return getBoardOptions((n, mouseInfo) => {
            handleDropNode(n, mouseInfo)
        }, props.setSelected, props.hook, links, props.allNodes)
    }, [props.hook.nodes, props.hook.links, links])

    const [dragType, setDragType] = useState()
    const setSelected = (i) => {
        if (i && !props.selected.find(e => e === i))
            props.setSelected(prev => {
                return [...prev, i]
            })
        else if (props.selected.find(e => e === i))
            props.setSelected(prev => {
                const copy = [...prev]
                copy.splice(copy.indexOf(i), 1)
                return copy
            })
    }


    return (
        <OnDragProvider.Provider value={{setDragType, dragType}}>
            <ContextWrapper
                styles={{display: props.hide ? 'none' : undefined}}
                options={boardOptions}
                // attributes={{id: props.id + '-board'}}
                wrapperClassName={styles.contextWrapper}
                content={(s, handleClose) => (
                    <Context
                        deleteNode={() => deleteNode(s.getAttribute('data-node'), props.hook, props.setSelected)}
                        handleClose={handleClose}
                        scale={scale}
                        deleteGroup={() => {
                            const attr = s.getAttribute('data-group')
                            props.hook.setGroups(prev => prev.filter(pr => pr.id !== attr))
                        }}
                        deleteLink={() => removeLink(links.find(l => (l.target + '-' + l.source) === s.getAttribute('data-link')), props.hook)}
                        availableNodes={props.allNodes}
                        onSelect={(dataTransfer, mouseInfo) => {
                            handleDropNode(handleDropBoard(dataTransfer, props.allNodes), mouseInfo)
                        }}
                        selected={s}
                    />
                )}
                triggers={[
                    'data-node',
                    'data-board',
                    'data-link',
                    'data-group'
                ]}
                className={styles.context}


            >

                <SelectBox nodes={[...props.hook.groups, ...props.hook.nodes]} selected={props.selected}
                           setSelected={props.setSelected}/>
                <svg
                    onDragOver={e => e.preventDefault()}
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        height: '10000px',
                        width: '10000px',
                    }}
                    data-board={'self'}
                    onContextMenu={e => e.preventDefault()}
                    onDrop={e => {
                        e.preventDefault()
                        let allow = true, newEntity
                        if (props.onDrop) {
                            [allow, newEntity] = props.onDrop(e)
                        }
                        if (allow) {
                            const n = newEntity ? newEntity : handleDropBoard(e.dataTransfer.getData('text'), props.allNodes)
                            if (n)
                                handleDropNode(n, e)
                        }
                    }}
                    ref={ref}
                    className={[styles.wrapper, styles.background].join(' ')}
                    onMouseDown={e => {
                        if (e.button === 2)
                            handleBoardScroll(ref.current.parentNode, e)

                        if (e.target === ref.current) {
                            props.setSelected([])
                            if (props.onEmptyClick)
                                props.onEmptyClick()
                        }

                    }}
                >

                    {props.hook.groups?.map(group => (
                        <React.Fragment key={group.id}>
                            <Group
                                setSelected={(i) => {
                                    props.setSelected([i])
                                }}
                                submitName={newName => {
                                    props.hook.setGroups(prev => {
                                        return prev.map(p => {
                                            if (p.id === group.id)
                                                p.name = newName

                                            return p
                                        })
                                    })
                                }}
                                selected={props.selected}
                                group={group}
                                scale={scale}
                            />
                        </React.Fragment>
                    ))}
                    {links.map((l, i) => (
                        <g key={l.target + '-' + l.source} className={styles.link}>

                            <path
                                data-link={l.target + '-' + l.source}
                                fill={'none'}
                                stroke={l.color}
                                id={l.target + '-' + l.source}/>
                            <path
                                data-link={l.target + '-' + l.source}
                                fill={'none'}
                                stroke={'transparent'}
                                strokeWidth={'10'}

                                id={l.target + '-' + l.source + '-supplementary'}/>
                        </g>
                    ))}
                    {props.hook.nodes.map(node => (
                        <React.Fragment key={node.id}>
                            <Node
                                links={links}
                                setAlert={props.setAlert}
                                hidden={props.hide}
                                submitBundledVariable={(key, value) => {
                                    props.hook.setNodes(prev => {
                                        return prev.map(p => {
                                            if (p.id === node.id)
                                                p[key] = value
                                            return p
                                        })
                                    })
                                }}
                                setSelected={(i, multi) => {
                                    if (multi)
                                        setSelected(i)
                                    else
                                        props.setSelected([i])
                                }}
                                selected={props.selected}
                                node={node}
                                scale={scale}
                                handleLink={handleLink}/>
                        </React.Fragment>
                    ))}

                </svg>
            </ContextWrapper>
        </OnDragProvider.Provider>
    )
}
Board.propTypes = {
    id: PropTypes.any,
    onDrop: PropTypes.func,
    allNodes: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any,
        dataTransfer: PropTypes.string,
        tooltip: PropTypes.string,
        icon: PropTypes.node,
        getNewInstance: PropTypes.func
    })).isRequired,
    onEmptyClick: PropTypes.func,
    setAlert: PropTypes.func.isRequired,
    parentRef: PropTypes.object,
    hook: PropTypes.object,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelected: PropTypes.func,
    hide: PropTypes.bool
}
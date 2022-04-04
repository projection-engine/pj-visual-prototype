import styles from "../styles/Node.module.css";
import PropTypes from "prop-types";
import {TYPES} from "../TYPES";
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import OnDragProvider from "../hooks/DragProvider";
import {Dropdown, DropdownOption, DropdownOptions} from "@f-ui/core";
import Range from "../../../../components/range/Range";

export default function NodeIO(props) {
    const isExecution = useMemo(() => {
        return (props.data.accept && props.data.accept.includes(TYPES.EXECUTION)) || props.data.type === TYPES.EXECUTION
    }, [])
    const [bundledVariable, setBundledVariable] = useState(props.type === 'input' ? props.node[props.data.key] : undefined)
    const infoRef = useRef()
    const wrapperRef = useRef()
    const asInput = (e) => {
        e.preventDefault()
        const data = JSON.parse(e.dataTransfer.getData('text'))
        e.currentTarget.style.background = 'var(--fabric-background-primary)'

        if (data.type === 'output' && (props.data.accept.includes(data.attribute.type) || props.data.accept.includes(TYPES.ANY)))
            props.handleLink(data, {
                attribute: props.data,
                id: props.nodeID
            }, isExecution)
        else if (data.type !== 'output')
            props.setAlert({
                type: 'error',
                message: 'Can\'t link input with input.'
            })
        else
            props.setAlert({
                type: 'error',
                message: 'Invalid type'
            })
    }
    const getType = (a) => {
        switch (a) {
            case TYPES.VEC:
                return 'Vector'
            case TYPES.NUMBER:
                return 'Number'
            case TYPES.STRING:
                return 'String'
            case TYPES.COLOR:
                return 'RGB'
            case TYPES.TEXTURE:
                return 'Texture sample'
            case TYPES.OBJECT:
                return 'Object'
            case TYPES.EXECUTION:
                return 'Execution loop'
        }
    }
    const onDragContext = useContext(OnDragProvider)
    const parent = document.getElementById(props.nodeID)
    const handler = (e) => {
        if (parent) {
            const bBox = parent.getBoundingClientRect()

            if (e.type === 'dragover' && props.type === 'input' && props.data.accept) {

                infoRef.current.style.display = 'grid'
                infoRef.current.style.top = wrapperRef.current.offsetTop + 'px'
                infoRef.current.style.left = (e.clientX - bBox.x) + 'px'
                infoRef.current.style.borderLeft = props.data.accept.includes(onDragContext.dragType) || props.data.accept.includes(TYPES.ANY) ? 'green 2px solid' : 'red 2px solid'
            } else
                infoRef.current.style.display = 'none'
        }
    }
    useEffect(() => {
        const el = document.getElementById(props.nodeID + props.data.key)
        if (el) {
            el.addEventListener('dragover', handler)
            el.addEventListener('dragleave', handler)
            el.addEventListener('drop', handler)
        }
        return () => {
            if (el) {
                el.removeEventListener('drop', handler)
                el.removeEventListener('dragleave', handler)
                el.removeEventListener('dragover', handler)
            }
        }
    }, [onDragContext.dragType])

    const linkColor = useMemo(() => {
        if (props.type === 'input')
            return props.inputLinks.find(o => o.targetKey === props.data.key)?.color
        else
            return props.outputLinks.find(o => o.sourceKey === props.data.key)?.color

    }, [props.inputLinks, props.outputLinks])


    return (
        <>
            <div ref={infoRef} className={styles.infoWrapper}>
                {props.data.accept?.map((a, i) => (
                    <div className={styles.ioKey} key={i + '-key-' + a}>
                        <div className={styles.iconWrapper}
                             data-valid={`${onDragContext.dragType === a || a === TYPES.ANY}`}>
                                <span style={{fontSize: '.8rem'}}
                                      className={'material-icons-round'}>{onDragContext.dragType === a || a === TYPES.ANY ? 'check' : 'close'}</span>
                        </div>
                        {getType(a)}
                    </div>
                ))}
            </div>
            <div className={styles.attribute} ref={wrapperRef}
                 style={{justifyContent: props.type === 'input' ? 'flex-start' : 'flex-end'}}>

                {props.type === 'output' && (!isExecution || props.data.showTitle) ? (
                    <div data-disabled={`${props.data.disabled}`} className={styles.overflow}
                         style={{color: props.data.color, fontWeight: 'bold'}}>
                        {props.data.label}
                    </div>
                ) : null}
                <div
                    data-disabled={`${props.data.disabled}`}
                    id={props.nodeID + props.data.key}
                    className={isExecution ? styles.executionConnection : styles.connection}
                    draggable={!props.data.disabled && props.type !== 'input'}

                    style={{
                        '--fabric-accent-color': isExecution ? '#0095ff' : '#999999',
                        background: linkColor && !props.data.disabled ? linkColor : undefined,
                        display: props.data.bundled ? 'none' : undefined
                    }}
                    onDrop={e => {
                        onDragContext.setDragType(undefined)
                        if (props.type === 'input')
                            asInput(e)
                        else
                            props.setAlert({
                                type: 'error',
                                message: 'Can\'t link with output.'
                            })
                    }}
                    onDragEnd={props.onDragEnd}

                    onDrag={props.handleLinkDrag}
                    onDragStart={e => {
                        if (props.type !== 'input') {
                            e.dataTransfer
                                .setData(
                                    'text',
                                    JSON.stringify({
                                        id: props.nodeID,
                                        type: props.type,
                                        attribute: props.data
                                    })
                                )


                            onDragContext.setDragType(props.data.type)
                        } else
                            e.preventDefault()
                    }}>
                    {isExecution ?
                        <span className={'material-icons-round'}>navigate_next</span> : null}
                </div>

                {props.type === 'input' && (!isExecution || props.data.showTitle) ? (
                    <div data-disabled={`${props.data.disabled}`} className={styles.overflow}
                         style={{fontWeight: 'normal'}}>

                        {props.data.bundled ? null : props.data.label}
                        {props.data.bundled ? (
                            props.data.type === TYPES.NUMBER ?
                                <Range
                                    value={bundledVariable}
                                    handleChange={v => setBundledVariable(v)}
                                    onFinish={() => props.submitBundledVariable(bundledVariable)}
                                />
                                :
                                <Dropdown className={styles.bundled}  hideArrow={true} variant={bundledVariable !== undefined ? 'filled' : "outlined"}>
                                    {bundledVariable ? bundledVariable : props.data.label}
                                    <DropdownOptions>
                                        <DropdownOption
                                            option={{
                                                label: 'Clear',
                                                onClick: () => {
                                                    props.submitBundledVariable(undefined)
                                                    setBundledVariable(undefined)
                                                }
                                            }}
                                        />
                                        {props.data.options.map((o, i) => (
                                            <React.Fragment key={o.label + '-bundled-' + props.nodeID + '-' + i}>
                                                <DropdownOption
                                                    option={{
                                                        label: o.label,
                                                        onClick: () => {
                                                            props.submitBundledVariable(o.value)
                                                            setBundledVariable(o.value)
                                                        },
                                                        disabled: o.disabled
                                                    }}
                                                />
                                            </React.Fragment>
                                        ))}
                                    </DropdownOptions>
                                </Dropdown>
                        ):null}
                    </div>
                ) : null}
            </div>
        </>
    )
}


NodeIO.propTypes = {
    submitBundledVariable: PropTypes.func,
    node: PropTypes.object,
    handleLink: PropTypes.func,
    nodeID: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['input', 'output']),
    setAlert: PropTypes.func.isRequired,
    handleLinkDrag: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    data: PropTypes.shape({
        disabled: PropTypes.bool,
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.number,
        accept: PropTypes.arrayOf(PropTypes.number),
        color: PropTypes.string,
        showTitle: PropTypes.bool,
        bundled: PropTypes.bool,
        options: PropTypes.string
    }).isRequired,
    inputLinks: PropTypes.arrayOf(PropTypes.object).isRequired,
    outputLinks: PropTypes.arrayOf(PropTypes.object).isRequired
}
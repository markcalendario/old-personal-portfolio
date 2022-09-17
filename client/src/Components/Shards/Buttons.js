export function Button(props) {
    return (
        <button
            className={
                "button" +
                (props.pigment ? ' ' + props.pigment : '') +
                (props.className ? ' ' + props.className : '')
            }
            onClick={props.click}
        >
            {props.children}
        </button>
    )
}

export function LinkButton(props) {
    return (
        <button
            className={"link-button" + (props.pigment ? ` ${props.pigment}` : '')}
            onClick={props.click ? props.click : null}
        >
            {props.children}
        </button>
    )
}

export function IconButton(props) {
    return (
        <a className="icon-btn-white"
            target="_blank" rel="noreferrer"
            href={props.href}
        >
            {props.children}
        </a>
    )
}
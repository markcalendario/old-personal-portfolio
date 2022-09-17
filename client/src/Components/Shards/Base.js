export function Section(props) {
    return (
        <section id={props.id} className={props.class}>
            {props.children}
        </section>
    )
}

export function Container(props) {
    return (
        <div className="container">
            {props.children}
        </div>
    )
}

export function ContainerFluid(props) {
    return (
        <div className="container">
            {props.children}
        </div>
    )
}

export function Wrapper(props) {
    return (
        <div className="wrapper">
            {props.children}
        </div>
    )
}
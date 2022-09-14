

export function Capsule(props) {
    return (
        <div onMouseEnter={props.onMouseEnter} className="capsule-white">
            <div className="capsule-content">
                <div className="capsule-icon">
                    {props.icon}
                </div>
                <div className="capsule-text">
                    <h4>{props.text}</h4>
                </div>
            </div>
        </div>
    )
}
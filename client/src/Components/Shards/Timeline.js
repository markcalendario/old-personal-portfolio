export function Timeline(props) {
    return (
        <div className="timeline">
            <div className="timeline-content">
                <div className="line">
                </div>
                <div className="details-all">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export function TimelineEvent(props) {
    return (
        <div className="details">
            <div className="topper">
                <div data-aos="fade-up" className="dot"></div>
                {
                    props.year != null ? <h3 className="year">{props.year}</h3> : null
                }
            </div>
            {props.children}
        </div>
    )
}

export function TimelineEventDetails(props) {
    return (
        <div className="detail-block" data-aos="fade-left">
            <div className="title">
                {
                    props.title != null ? <h4>{props.title}</h4> : null
                }
            </div>
            <div className="context">
                {props.children}
            </div>
        </div>
    )
}
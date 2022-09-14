import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";

class HeartReact extends Component {

    state = {
        isReacted: this.props.isReacted
    }

    triggerClickAnimation = () => {
        this.setState({ isReacted: !this.state.isReacted })
    }

    render() {
        return (
            <div onClick={this.triggerClickAnimation} id="react" className={this.state.isReacted ? "reaction" : "no-reaction"}>
                <div className="wrapper">
                    <div className="react-lgoo">
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <p>{(typeof this.props.reactText !== 'undefined') ? " " + this.props.reactText : null}</p>
                </div>
            </div>
        )
    }
}

export default HeartReact;
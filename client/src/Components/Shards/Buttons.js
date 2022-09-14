import { Component } from "react";

export class Button extends Component {
    render() {
        return (
            <button
                className={
                    "button " +
                    (this.props.pigment) + ' ' +
                    (this.props.className)
                }
                onClick={this.props.click}
            >
                {this.props.children}
            </button>
        )
    }
}

export class LinkButton extends Component {
    render() {
        return (
            <button
                className={"link-button " + (this.props.pigment)}
                onClick={this.props.click}
            >
                {this.props.children}
            </button>
        )
    }
}

export class IconButton extends Component {
    render() {
        return (
            <a className="icon-btn-white"
                target="_blank" rel="noreferrer"
                href={this.props.href}
            >
                {this.props.children}
            </a>
        )
    }
}
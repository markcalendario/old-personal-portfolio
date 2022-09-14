import { Component } from "react";

export class Section extends Component {
    render() {
        return (
            <section id={this.props.id} className={this.props.class}>
                {this.props.children}
            </section>
        )
    }
}

export class Container extends Component {
    render() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        )
    }
}

export class ContainerFluid extends Component {
    render() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        )
    }
}

export class Wrapper extends Component {
    render() {
        return (
            <div className="wrapper">
                {this.props.children}
            </div>
        )
    }
}
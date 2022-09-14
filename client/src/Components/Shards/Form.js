import { Component } from "react";

export class FormControl extends Component {
    render() {
        return (
            <div className="form-control">
                {this.props.children}
            </div>
        )
    }
}
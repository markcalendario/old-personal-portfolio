import { Component } from "react";

import NotFoundIllustration from "../../Images/error/404.svg";
import ForbiddenIllustaration from "../../Images/error/403.svg";
import InternalErrorIllustration from "../../Images/error/500.svg";

import { PrimaryNavbar } from "../Shards/Navbar";
import Footer from "../Shards/Footer";

class InternalErrorPage extends Component {

    componentDidMount() {
        document.title = "Internal Error Occured"
    }

    render() {
        return (
            <>
                <PrimaryNavbar />
                <Error
                    illustration={InternalErrorIllustration}
                    errorText='{ status: 500, message: "Internal Error Occured" }'
                    paragraphText="This is my fault, not yours. I apologize for the inconvinience, thank you!"
                />
            </>
        )
    }
}

class NotFoundErrorPage extends Component {

    componentDidMount() {
        document.title = "Not Found"
    }

    render() {
        return (
            <>
                <PrimaryNavbar />
                <Error
                    illustration={NotFoundIllustration}
                    errorText='{ status: 404, message: "Not Found" }'
                    paragraphText="I do not have any results for the page that you have requested."
                />
            </>
        )
    }
}

class ForbiddenErrorPage extends Component {

    componentDidMount() {
        document.title = "Forbidden"
    }

    render() {
        return (
            <>
                <PrimaryNavbar />
                <Error
                    illustration={ForbiddenIllustaration}
                    errorText='{ status: 403, message: "Forbidden" }'
                    paragraphText="You do not have any permission to access this page."
                />
            </>
        )
    }
}

class Error extends Component {
    render() {
        return (
            <>
                <section id="error">
                    <div className="container">
                        <div className="wrapper">
                            <div className="content">
                                <figure>
                                    <img src={this.props.illustration} alt="Error" />
                                </figure>
                                <div className="texters">
                                    <code>{this.props.errorText}</code>
                                    <p>{this.props.paragraphText}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        )
    }
}

export { InternalErrorPage, NotFoundErrorPage, ForbiddenErrorPage };
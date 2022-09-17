import NotFoundIllustration from "../../Images/error/404.svg";
import ForbiddenIllustaration from "../../Images/error/403.svg";
import InternalErrorIllustration from "../../Images/error/500.svg";
import { Fragment, useEffect } from "react";
import { PrimaryNavbar } from "../Shards/Navbar";
import Footer from "../Shards/Footer";

export function InternalErrorPage() {

    useEffect(() => {
        document.title = "Internal Error Occured"
    }, [])

    return (
        <Fragment>
            <PrimaryNavbar />
            <Error
                illustration={InternalErrorIllustration}
                errorText='{ status: 500, message: "Internal Error Occured" }'
                paragraphText="This is my fault, not yours. I apologize for the inconvinience, thank you!"
            />
        </Fragment>
    )
}

export function NotFoundErrorPage() {

    useEffect(() => {
        document.title = "Not Found"
    }, [])

    return (
        <Fragment>
            <PrimaryNavbar />
            <Error
                illustration={NotFoundIllustration}
                errorText='{ status: 404, message: "Not Found" }'
                paragraphText="I do not have any results for the page that you have requested."
            />
        </Fragment>
    )
}

export function ForbiddenErrorPage() {

    useEffect(() => {
        document.title = "Forbidden"
    }, [])

    return (
        <Fragment>
            <PrimaryNavbar />
            <Error
                illustration={ForbiddenIllustaration}
                errorText='{ status: 403, message: "Forbidden" }'
                paragraphText="You do not have any permission to access this page."
            />
        </Fragment>
    )
}

export function Error(props) {
    return (
        <Fragment>
            <section id="error">
                <div className="container">
                    <div className="wrapper">
                        <div className="content">
                            <figure>
                                <img src={props.illustration} alt="Error" />
                            </figure>
                            <div className="texters">
                                <code>{props.errorText}</code>
                                <p>{props.paragraphText}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    )
}
import { Fragment } from "react";
import KennethLogo from "../../Images/kenneth-logo-black.png";

export function ProjectLoader() {
    return (
        <div id="project-loader">
            <div className="project-loader-wrapper">
                <div className="texts">
                    <div className="title"></div>
                    <br />
                    <div className="paragraph"></div>
                    <div className="paragraph"></div>
                    <div className="paragraph"></div>
                </div>
                <figure></figure>
            </div>
        </div>
    )
}

export function FeaturedProjectLoader() {
    return (
        <Fragment>
            <ProjectLoader />
            <ProjectLoader />
            <ProjectLoader />
        </Fragment>
    )
}

export function FullPageLoader() {
    return (
        <div className="full-page-loader">
            <div className="fpl-content">
                <div className="wrap">
                    <img src={KennethLogo} alt="Logo" />
                    <p>Loading, please wait...</p>
                </div>
            </div>
        </div>
    )
}


import { Component } from "react";
import KennethLogo from "../../Images/kenneth-logo-black.png";


class ProjectLoader extends Component {

    render() {
        return (
            <div id="project-loader">
                <div className="project-loader-wrapper">
                    <div className="texts">
                        <div className="title"></div>
                        <div className="paragraph"></div>
                        <div className="paragraph"></div>
                        <div className="paragraph"></div>
                    </div>
                    <figure></figure>
                </div>
            </div>
        )
    }
}

class FeaturedProjectLoader extends Component {
    render() {
        return (
            <>
                <ProjectLoader />
                <ProjectLoader />
                <ProjectLoader />
            </>
        )
    }
}

class FullPageLoader extends Component {
    render() {
        return (
            <div className="full-page-loader">
                <img src={KennethLogo} alt="Logo" />
                <p>Loading, please wait...</p>
            </div>
        )
    }
}

export { ProjectLoader, FeaturedProjectLoader, FullPageLoader }


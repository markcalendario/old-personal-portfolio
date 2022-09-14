import { Component } from "react";
import KennethLogo from "../../Images/kenneth-logo-white.png";
import KennethLogoBlack from "../../Images/kenneth-logo-black.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { Button, LinkButton } from "./Buttons";

// * Compilation of the Primary Navbar

// * Primary Navbar - This component is the top most navigation bar. 
// * The first navbar that you can see at the top of the Landing Page


class PrimaryNavbar extends Component {

    state = {
        isLargeScreen: null
    }

    componentDidMount() {
        this.initializeScreens();
    }

    componentDidUpdate() {
        window.addEventListener('resize', this.initializeScreens, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.initializeScreens, false);
    }

    initializeScreens = () => {

        if (window.innerWidth >= 768) {
            // Larger Screens
            this.setState({ isLargeScreen: true })
        } else {
            // Smaller Screens
            this.setState({ isLargeScreen: false })
        }

    }

    render() {
        return (
            <>
                {
                    (this.state.isLargeScreen)
                        ? <DesktopPrimaryNavbar
                            backgroundEnabled={this.props.backgroundEnabled}
                            backgroundColor={this.props.backgroundColor}
                        />
                        : <MobilePrimaryNavbar
                            backgroundEnabled={true}
                            backgroundColor="white"
                        />
                }
            </>
        )
    }

}

class DesktopPrimaryNavbar extends Component {

    render() {
        return (
            <nav id="primary-nav-desktop" className={(this.props.backgroundEnabled ? "solid-navbar" : "")}>
                <div className="container-fluid">
                    <div className="wrapper">

                        <figure className="logo">
                            <a href="/">
                                <img src={KennethLogo} alt="Mark Kenneth Logo" />
                            </a>
                            <h4>Mark Kenneth</h4>
                        </figure>

                        <div className="middle-links">

                            <a className="white-link-btn" href="/"> Home </a>
                            <a className="white-link-btn" href="/#about"> About </a>
                            <a className="white-link-btn" href="/#education-experience"> Timeline </a>

                        </div>

                        <div className="social-btn">
                            <LinkButton pigment='solid-stable-btn'>
                                <a href="https://www.github.com/markcalendario">
                                    Visit me <FontAwesomeIcon icon={faGithubAlt} />
                                </a>
                            </LinkButton>
                        </div>

                    </div>
                </div>
            </nav>
        )
    }
}

class MobilePrimaryNavbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDrawerOpen: false,
        }
    }

    changeDrawerStatus = () => {
        this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
    }

    render() {
        return (
            <nav id="primary-nav-mobile">
                <div className="container">
                    <div className="wrapper">
                        <figure className="logo">
                            <a href="/">
                                <img src={KennethLogo} alt="Mark Kenneth Logo" />
                            </a>
                            <h5>Mark Kenneth</h5>
                        </figure>

                        <figure id="effects">
                            <img className={
                                "drawer-effect-light drawer-effect-top "
                                + (this.state.isDrawerOpen
                                    ? "open-drawer quickest-drawer-animation"
                                    : "close-drawer slowest-drawer-animation"
                                )
                            }
                                src={KennethLogoBlack}
                                alt="Kenneth Logo Big Black" />

                            <img className={
                                "drawer-effect-light drawer-effect-mid "
                                + (
                                    this.state.isDrawerOpen
                                        ? "open-drawer quick-drawer-animation"
                                        : "close-drawer slow-drawer-animation"
                                )
                            }
                                src={KennethLogoBlack}
                                alt="Kenneth Logo Big Black"
                            />

                            <img className={
                                "drawer-effect-light drawer-effect-bottom "
                                + (
                                    this.state.isDrawerOpen
                                        ? "open-drawer slow-drawer-animation"
                                        : "close-drawer quick-drawer-animation"
                                )
                            }
                                src={KennethLogoBlack}
                                alt="Kenneth Logo Big Black"
                            />
                        </figure>

                        {/* DRAWER */}
                        <div
                            className={
                                "drawer " +
                                (this.state.isDrawerOpen
                                    ? "open-drawer slowest-drawer-animation"
                                    : "close-drawer quickest-drawer-animation"
                                )
                            }>

                            <Button className="drawer-close-button" pigment='liquid-danger-btn' click={this.changeDrawerStatus}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Button>

                            <div className="links">
                                <a href="/">
                                    <img src={KennethLogo} alt="Kenneth Logo" />
                                </a>
                                <a href="/" onClick={this.changeDrawerStatus} > Home </a>
                                <a href="/#about" onClick={this.changeDrawerStatus}> About </a>
                                <a href="/#education" onClick={this.changeDrawerStatus}> Education </a>
                            </div>
                        </div>

                        <Button pigment='solid-stable-btn' click={this.changeDrawerStatus}>
                            <FontAwesomeIcon icon={faBars} />
                        </Button>
                    </div>
                </div>
            </nav>
        )
    }
}

// * Compilation of the Secondary Navbar

// * The second navbar that you can see at the top of the About Section of the Landing Page

class SecondaryNavbar extends Component {

    state = {
        isLargeScreen: null
    }

    componentDidMount() {
        this.initializeScreens();
    }

    componentDidUpdate() {
        window.addEventListener('resize', this.initializeScreens, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.initializeScreens, false);
    }

    initializeScreens = () => {

        if (window.innerWidth >= 768) {
            // Larger Screens
            this.setState({ isLargeScreen: true })
        } else {
            // Smaller Screens
            this.setState({ isLargeScreen: false })
        }

    }

    render() {
        return (
            <>
                <section id="secondary-navbar-offset">
                    {this.state.isLargeScreen ? <DesktopSecondaryNavbar /> : <MobileSecondaryNavbar />}
                </section>
            </>
        )
    }

}

class DesktopSecondaryNavbar extends Component {

    state = {
        isStickyEnabled: false,

        isAboutActive: false,
        isExpertiseActive: false,
        isFeaturedActive: false,
        isServicesActive: false,

        linksStyle: {
            width: "100%"
        },

        navLogoStyle: {
            display: "block"
        },

        wrapperStyle: {
            justifyContent: "flex-end"
        }
    }

    componentDidMount() {
        this.setNavbarStickinessAndUI();
        this.initializeActiveSection();

        window.addEventListener('scroll', this.initializeActiveSection, false);
        window.addEventListener('scroll', this.setNavbarStickinessAndUI, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.initializeActiveSection, false);
        window.removeEventListener('scroll', this.setNavbarStickinessAndUI, false);
    }

    setNavbarStickinessAndUI = () => {
        const stickOnBump = document.getElementById("secondary-navbar-offset").offsetTop;

        if (window.scrollY >= stickOnBump) {
            this.setNavbarToStickOnTop()
        } else {
            this.setNavbarToStickOnNormalPos();
            this.activateSection(false, false, false, false) // Remove all active states
        }
    }

    setNavbarToStickOnNormalPos = () => {
        this.setState(
            {
                isStickyEnabled: false,
                linksStyle: { width: "100%" },
                navLogoStyle: { display: "none" },
                wrapperStyle: { justifyContent: "flex-end" }
            });
    }

    setNavbarToStickOnTop = () => {
        this.setState(
            {
                isStickyEnabled: true,
                linksStyle: { width: "75%" },
                navLogoStyle: { display: "block" },
                wrapperStyle: { justifyContent: "space-between" }

            });
    }

    initializeActiveSection = () => {

        let scroll = window.scrollY;

        const aboutBreakpoint = document.getElementById("about").offsetTop - 200;
        const expertiseBreakpoint = document.getElementById("expertise").offsetTop - 200;
        const timelineBreakPoint = document.getElementById("education-experience").offsetTop - 200;
        const featuredProjectBreakpoint = document.getElementById("featured-projects").offsetTop - 200;
        const servicesBreakPoint = document.getElementById("services").offsetTop - 200;

        // Activates the About link
        if (scroll >= aboutBreakpoint && scroll < expertiseBreakpoint) {
            this.activateSection(true, false, false, false, false)
        }

        // Activates the Expertise link
        else if (scroll >= expertiseBreakpoint && scroll < timelineBreakPoint) {
            this.activateSection(false, true, false, false, false)
        }

        else if (scroll >= timelineBreakPoint && scroll < featuredProjectBreakpoint) {
            this.activateSection(false, false, true, false, false)
        }

        // Activates the Featured link
        else if (scroll >= featuredProjectBreakpoint && scroll < servicesBreakPoint) {
            this.activateSection(false, false, false, true, false)
        }

        // Activates the Services link
        else if (scroll >= servicesBreakPoint) {
            this.activateSection(false, false, false, false, true)
        }
    }

    activateSection = (about, expertise, timeline, featured, services) => {
        this.setState(
            {
                isAboutActive: about,
                isExpertiseActive: expertise,
                isTimelineActive: timeline,
                isFeaturedActive: featured,
                isServicesActive: services
            }
        );
    }

    render() {
        return (
            <section id="secondary-nav-desktop" className={(this.state.isStickyEnabled ? "sticky-secondary-nav" : "")}>
                <div className="container">
                    <div style={this.state.wrapperStyle} className="wrapper">
                        <img style={this.state.navLogoStyle} src={KennethLogoBlack} alt="Kenneth Logo Black" />
                        <div style={this.state.linksStyle} className="links">

                            <a className={'black-link-btn ' + ((this.state.isAboutActive) ? "active" : null)} href="/#about">About</a>

                            <a className={'black-link-btn ' + ((this.state.isExpertiseActive) ? "active" : null)} href="/#expertise">Expertise</a>

                            <a className={'black-link-btn ' + ((this.state.isTimelineActive) ? "active" : null)} href="/#education-experience">Timeline</a>

                            <a className={'black-link-btn ' + ((this.state.isFeaturedActive) ? "active" : null)} href="/#featured-projects">Featured</a>

                            <a className={'black-link-btn ' + ((this.state.isServicesActive) ? "active" : null)} href="/#services">Services</a>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class MobileSecondaryNavbar extends Component {

    state = {
        isSticky: null,
        isDrawerOpen: false,

    }

    componentDidMount() {
        this.readyStickyState();
    }

    componentDidUpdate() {
        window.addEventListener('scroll', this.readyStickyState, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.readyStickyState, false);
    }

    readyStickyState = () => {
        let navMobileOffset = document.getElementById("secondary-navbar-offset").offsetTop;

        if (window.scrollY >= navMobileOffset) {
            this.setState({ isSticky: true });
        }
        else {
            this.setState({ isSticky: false });
        }
    }

    changeDrawerStatus = () => {
        this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    }


    render() {

        return (
            <section className={this.state.isSticky ? "sticky-secondary-nav" : ""} id="secondary-nav-mobile">
                <div className="container">
                    <div className="wrapper">
                        <nav className="nav">
                            <img src={KennethLogoBlack} alt="Kenneth Logo Black" />
                            <Button pigment='solid-stable-btn' click={this.changeDrawerStatus}>
                                <FontAwesomeIcon icon={faBars} />
                            </Button>
                        </nav>

                        <div id="effects">
                            <img className={
                                "drawer-effect-dark drawer-effect-top "
                                + (this.state.isDrawerOpen
                                    ? "open-drawer quickest-drawer-animation"
                                    : "close-drawer slowest-drawer-animation"
                                )
                            }
                                src={KennethLogo}
                                alt="Kenneth Logo Big Black" />

                            <img className={
                                "drawer-effect-dark drawer-effect-mid "
                                + (
                                    this.state.isDrawerOpen
                                        ? "open-drawer quick-drawer-animation"
                                        : "close-drawer slow-drawer-animation"
                                )
                            }
                                src={KennethLogo}
                                alt="Kenneth Logo Big Black"
                            />

                            <img className={
                                "drawer-effect-dark drawer-effect-bottom "
                                + (
                                    this.state.isDrawerOpen
                                        ? "open-drawer slow-drawer-animation"
                                        : "close-drawer quick-drawer-animation"
                                )
                            }
                                src={KennethLogo}
                                alt="Kenneth Logo Big Black"
                            />
                        </div>

                        {/* DRAWER */}
                        <div
                            className={
                                "drawer " +
                                (this.state.isDrawerOpen
                                    ? "open-drawer slowest-drawer-animation"
                                    : "close-drawer quickest-drawer-animation")
                            }>


                            <Button className="drawer-close-button" pigment='liquid-danger-btn' click={this.changeDrawerStatus}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Button>

                            <div className="links">
                                <a href="/">
                                    <img src={KennethLogoBlack} alt="Kenneth Logo Black" />
                                </a>
                                <a href="#about" onClick={this.changeDrawerStatus} > About </a>
                                <a href="#expertise" onClick={this.changeDrawerStatus}> Expertise </a>
                                <a href="#education-experience" onClick={this.changeDrawerStatus}> Timeline </a>
                                <a href="#featured-projects" onClick={this.changeDrawerStatus}> Featured </a>
                                <a href="#services" onClick={this.changeDrawerStatus}> Services </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

// * Project Navbar

class PagesNavbar extends Component {
    render() {
        return (
            <nav id="pages-navbar">
                <div className="container">
                    <div className="wrapper">
                        <div className="logo">
                            <figure>
                                <a href="/">
                                    <img src={KennethLogo} alt="Mark Kenneth Calendario logo" />
                                </a>
                            </figure>
                            <div className="text">
                                <p>Mark Kenneth</p>
                                <h3>{this.props.page}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export { PrimaryNavbar, SecondaryNavbar, PagesNavbar };
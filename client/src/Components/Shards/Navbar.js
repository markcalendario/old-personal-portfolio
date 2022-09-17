import { Fragment, useCallback, useEffect, useState } from "react";
import KennethLogo from "../../Images/kenneth-logo-white.png";
import KennethLogoBlack from "../../Images/kenneth-logo-black.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { Button, LinkButton } from "./Buttons";

// * Compilation of the Primary Navbar

// * Primary Navbar - This component is the top most navigation bar. 
// * The first navbar that you can see at the top of the Landing Page

function PrimaryNavbar(props) {
    const [isLargeScreen, setIsLargeScreen] = useState(null)

    const initializeScreens = useCallback(() => {

        if (window.innerWidth >= 768) {
            // Larger Screens
            setIsLargeScreen(true)
        } else {
            // Smaller Screens
            setIsLargeScreen(false)
        }
    }, [])

    useEffect(() => {
        initializeScreens();
        window.addEventListener('resize', initializeScreens, false);
        return () => window.removeEventListener('resize', initializeScreens, false)
    }, [initializeScreens])

    return (
        <Fragment>
            {
                (isLargeScreen)
                    ? <DesktopPrimaryNavbar
                        backgroundEnabled={props.backgroundEnabled}
                        backgroundColor={props.backgroundColor}
                    />
                    : <MobilePrimaryNavbar
                        backgroundEnabled={true}
                        backgroundColor="white"
                    />
            }
        </Fragment>
    )
}

function DesktopPrimaryNavbar(props) {
    return (
        <nav id="primary-nav-desktop" className={(props.backgroundEnabled ? "solid-navbar" : "")}>
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

function MobilePrimaryNavbar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const changeDrawerStatus = () => {
        setIsDrawerOpen(prev => !prev)
    }

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
                            + (isDrawerOpen
                                ? "open-drawer quickest-drawer-animation"
                                : "close-drawer slowest-drawer-animation"
                            )
                        }
                            src={KennethLogoBlack}
                            alt="Kenneth Logo Big Black" />

                        <img className={
                            "drawer-effect-light drawer-effect-mid "
                            + (
                                isDrawerOpen
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
                                isDrawerOpen
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
                            (isDrawerOpen
                                ? "open-drawer slowest-drawer-animation"
                                : "close-drawer quickest-drawer-animation"
                            )
                        }>

                        <Button className="drawer-close-button" pigment='liquid-danger-btn' click={changeDrawerStatus}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>

                        <div className="links">
                            <a href="/">
                                <img src={KennethLogo} alt="Kenneth Logo" />
                            </a>
                            <a href="/" onClick={changeDrawerStatus} > Home </a>
                            <a href="/#about" onClick={changeDrawerStatus}> About </a>
                            <a href="/#education" onClick={changeDrawerStatus}> Education </a>
                        </div>
                    </div>

                    <Button pigment='solid-stable-btn' click={changeDrawerStatus}>
                        <FontAwesomeIcon icon={faBars} />
                    </Button>
                </div>
            </div>
        </nav>
    )
}

// * Compilation of the Secondary Navbar

// * The second navbar that you can see at the top of the About Section of the Landing Page

function SecondaryNavbar() {
    const [isLargeScreen, setIsLargeScreen] = useState(null)

    const initializeScreens = useCallback(() => {
        if (window.innerWidth >= 768) {
            // Larger Screens
            setIsLargeScreen(true)
        } else {
            // Smaller Screens
            setIsLargeScreen(false)
        }

    }, [])

    useEffect(() => {
        initializeScreens()
        window.addEventListener('resize', initializeScreens, false);

        return () => window.removeEventListener('resize', initializeScreens, false)
    }, [initializeScreens])


    return (
        <Fragment>
            <section id="secondary-navbar-offset">
                {isLargeScreen ? <DesktopSecondaryNavbar /> : <MobileSecondaryNavbar />}
            </section>
        </Fragment>
    )
}

function DesktopSecondaryNavbar() {
    const [isStickyEnabled, setIsStickyEnabled] = useState(false)
    const [isAboutActive, setIsAboutActive] = useState(false)
    const [isExpertiseActive, setIsExpertiseActive] = useState(false)
    const [isFeaturedActive, setIsFeaturedActive] = useState(false)
    const [isServicesActive, setIsServicesActive] = useState(false)
    const [isTimelineActive, setIsTimelineActive] = useState(false)
    const [linksStyle, setLinksStyle] = useState({ width: "100%" })
    const [navLogoStyle, setNavLogoStyle] = useState({ display: "block" })
    const [wrapperStyle, setWrapperStyle] = useState({ justifyContent: "flex-end" })

    const setNavbarStickinessAndUI = useCallback(() => {
        const stickOnBump = document.getElementById("secondary-navbar-offset").offsetTop;

        if (window.scrollY >= stickOnBump) {
            setNavbarToStickOnTop()
        } else {
            setNavbarToStickOnNormalPos();
            activateSection(false, false, false, false) // Remove all active states
        }
    }, [])

    const setNavbarToStickOnNormalPos = () => {
        setIsStickyEnabled(false)
        setLinksStyle({ width: "100%" })
        setNavLogoStyle({ display: "none" })
        setWrapperStyle({ justifyContent: "flex-end" })
    }

    const setNavbarToStickOnTop = () => {
        setIsStickyEnabled(true)
        setLinksStyle({ width: "75%" })
        setNavLogoStyle({ display: "block" })
        setWrapperStyle({ justifyContent: "space-between" })
    }

    const initializeActiveSection = useCallback(() => {
        let scroll = window.scrollY;

        const aboutBreakpoint = document.getElementById("about").offsetTop - 200;
        const expertiseBreakpoint = document.getElementById("expertise").offsetTop - 200;
        const timelineBreakPoint = document.getElementById("education-experience").offsetTop - 200;
        const featuredProjectBreakpoint = document.getElementById("featured-projects").offsetTop - 200;
        const servicesBreakPoint = document.getElementById("services").offsetTop - 200;

        // Activates the About link
        if (scroll >= aboutBreakpoint && scroll < expertiseBreakpoint) {
            activateSection(true, false, false, false, false)
        }
        // Activates the Expertise link
        else if (scroll >= expertiseBreakpoint && scroll < timelineBreakPoint) {
            activateSection(false, true, false, false, false)
        }
        // Activates the Timeline link
        else if (scroll >= timelineBreakPoint && scroll < featuredProjectBreakpoint) {
            activateSection(false, false, true, false, false)
        }
        // Activates the Featured link
        else if (scroll >= featuredProjectBreakpoint && scroll < servicesBreakPoint) {
            activateSection(false, false, false, true, false)
        }
        // Activates the Services link
        else if (scroll >= servicesBreakPoint) {
            activateSection(false, false, false, false, true)
        }
    }, [])

    const activateSection = (about, expertise, timeline, featured, services) => {
        setIsAboutActive(about)
        setIsExpertiseActive(expertise)
        setIsTimelineActive(timeline)
        setIsFeaturedActive(featured)
        setIsServicesActive(services)
    }

    useEffect(() => {
        setNavbarStickinessAndUI();
        initializeActiveSection();

        window.addEventListener('scroll', initializeActiveSection, false);
        window.addEventListener('scroll', setNavbarStickinessAndUI, false);

        return () => {
            window.removeEventListener('scroll', initializeActiveSection, false)
            window.removeEventListener('scroll', setNavbarStickinessAndUI, false)
        }
    }, [initializeActiveSection, setNavbarStickinessAndUI])

    return (
        <section id="secondary-nav-desktop" className={(isStickyEnabled ? "sticky-secondary-nav" : "")}>
            <div className="container">
                <div style={wrapperStyle} className="wrapper">
                    <img style={navLogoStyle} src={KennethLogoBlack} alt="Kenneth Logo Black" />
                    <div style={linksStyle} className="links">

                        <a className={'black-link-btn ' + ((isAboutActive) ? "active" : '')} href="/#about">About</a>

                        <a className={'black-link-btn ' + ((isExpertiseActive) ? "active" : '')} href="/#expertise">Expertise</a>

                        <a className={'black-link-btn ' + ((isTimelineActive) ? "active" : '')} href="/#education-experience">Timeline</a>

                        <a className={'black-link-btn ' + ((isFeaturedActive) ? "active" : '')} href="/#featured-projects">Featured</a>

                        <a className={'black-link-btn ' + ((isServicesActive) ? "active" : '')} href="/#services">Services</a>

                    </div>
                </div>
            </div>
        </section>
    )

}

function MobileSecondaryNavbar() {
    const [isSticky, setIsSticky] = useState(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const readyStickyState = useCallback(() => {
        let navMobileOffset = document.getElementById("secondary-navbar-offset").offsetTop;

        if (window.scrollY >= navMobileOffset)
            setIsSticky(true)
        else
            setIsSticky(false)

    }, [])

    useEffect(() => {
        readyStickyState()
        window.addEventListener('scroll', readyStickyState, false);
        return () => { window.removeEventListener('scroll', readyStickyState, false) }
    }, [readyStickyState])


    const changeDrawerStatus = () => {
        setIsDrawerOpen(prev => !prev);
    }

    return (
        <section className={isSticky ? "sticky-secondary-nav" : ""} id="secondary-nav-mobile">
            <div className="container">
                <div className="wrapper">
                    <nav className="nav">
                        <img src={KennethLogoBlack} alt="Kenneth Logo Black" />
                        <Button pigment='solid-stable-btn' click={changeDrawerStatus}>
                            <FontAwesomeIcon icon={faBars} />
                        </Button>
                    </nav>

                    <div id="effects">
                        <img className={
                            "drawer-effect-dark drawer-effect-top "
                            + (isDrawerOpen
                                ? "open-drawer quickest-drawer-animation"
                                : "close-drawer slowest-drawer-animation"
                            )
                        }
                            src={KennethLogo}
                            alt="Kenneth Logo Big Black" />

                        <img className={
                            "drawer-effect-dark drawer-effect-mid "
                            + (
                                isDrawerOpen
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
                                isDrawerOpen
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
                            (isDrawerOpen
                                ? "open-drawer slowest-drawer-animation"
                                : "close-drawer quickest-drawer-animation")
                        }>

                        <Button className="drawer-close-button" pigment='liquid-danger-btn' click={changeDrawerStatus}>
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>

                        <div className="links">
                            <a href="/">
                                <img src={KennethLogoBlack} alt="Kenneth Logo Black" />
                            </a>
                            <a href="#about" onClick={changeDrawerStatus} > About </a>
                            <a href="#expertise" onClick={changeDrawerStatus}> Expertise </a>
                            <a href="#education-experience" onClick={changeDrawerStatus}> Timeline </a>
                            <a href="#featured-projects" onClick={changeDrawerStatus}> Featured </a>
                            <a href="#services" onClick={changeDrawerStatus}> Services </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// * Project Navbar

function PagesNavbar(props) {
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
                            <h3>{props.page}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export { PrimaryNavbar, SecondaryNavbar, PagesNavbar };
import { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGithubAlt, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

import KennethLogoWhite from "../../Images/kenneth-logo-white.png";
import { IconButton } from "./Buttons";


class Footer extends Component {

    getYear = () => {
        return new Date().getFullYear();
    }

    render() {
        return (
            <footer>
                <div className="container">
                    <div className="wrapper">
                        <div className="icon">
                            <img src={KennethLogoWhite} alt="Kenneth Logo" />
                            <p> Mark Kenneth Calendario &copy;  {this.getYear()}</p>
                        </div>

                        <div className="notice">
                            <p>EN . This website was developed by Mark Kenneth Calendario. It cannot and should not be reproduced in any forms or by any means without the consent from him.</p>
                        </div>

                        <div className="notice">
                            <p>TAG . Ang website na ito ay nilikha ni Mark Kenneth Calendario. Ito ay hindi maaari at hindi dapat kopyahin sa anumang banhay o sa anumang paraan nang walang pahintulot galing sa kaniya.</p>
                        </div>

                        <div className="contact">
                            <IconButton href="https://www.github.com/markcalendario">
                                <FontAwesomeIcon icon={faGithubAlt} />
                            </IconButton>

                            <IconButton href="https://www.facebook.com/markcalendario">
                                <FontAwesomeIcon icon={faFacebook} />
                            </IconButton>

                            <IconButton href="https://instagram.com/_kendies19">
                                <FontAwesomeIcon icon={faInstagram} />
                            </IconButton>
                        </div>

                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;

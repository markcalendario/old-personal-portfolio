import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { IconButton } from "./Buttons";

import KennethLogoWhite from "../../Images/kenneth-logo-white.png";
function Footer() {

    const getYear = () => {
        return new Date().getFullYear();
    }

    return (
        <footer>
            <div className="container">
                <div className="wrapper">
                    <div className="icon">
                        <img src={KennethLogoWhite} alt="Kenneth Logo" />
                        <p> Mark Kenneth Calendario &copy;  {getYear()}</p>
                    </div>

                    <div className="notice">
                        <p>EN . This website was developed by Mark Kenneth Calendario. It cannot and should not be reproduced in any forms or by any means without the consent from him.</p>
                    </div>

                    <div className="notice">
                        <p>FIL . Ang website na ito ay ginawa ni Mark Kenneth Calendario. Ito ay hindi maaari at hindi dapat kopyahin sa anumang banhay o sa anumang paraan nang walang pahintulot galing sa kaniya.</p>
                    </div>

                    <div className="contact">
                        <IconButton href="https://www.github.com/markcalendario">
                            <FontAwesomeIcon icon={faGithubAlt} />
                        </IconButton>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer;

import React, { Fragment, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane, faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { isEmpty, isValidEmail } from "../../Functions/form-validator";

import { Button } from "./Buttons";
import { FormControl } from "./Form";

let agreement = require('../../Images/illustrations/agreement.svg');

function Modal(props) {
    return (
        <div className="modal-overlay">
            <div className="modal">

                <Button className='close-modal' pigment='liquid-danger-btn' click={props.triggerVisibility}>
                    <FontAwesomeIcon icon={faTimes} />
                </Button>

                <div className="container">
                    <div className="wrapper">
                        {props.children}
                    </div>
                </div>

            </div >
        </div>
    )
}

export function RequestProjectModal(props) {
    const [formResultText, setFormResultText] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const getFormValues = () => {

        const form = new FormData(document.getElementById("project-request-form"))
        const data = {
            customerEmail: form.get('customer-email'),
            customerName: form.get('customer-name'),
            requestedProjectTitle: form.get('customer-project'),
            requestedProjectDescription: form.get('project-description'),
            requestedStack: form.get('web-stack'),
            requestedProjectDeadline: form.get('deadline')

        }

        return data;
    }

    const isFormValid = (data) => {

        let dataValues = Object.values(data);
        dataValues.forEach((value) => {
            if (isEmpty(value)) {
                setFormResultText("Some of the form fields are empty.")
                return false
            }
        })

        if (!isValidEmail(data.customerEmail)) {
            setFormResultText("Please put a valid email address.")
            return false
        }

        return true
    }

    const submitRequestProjectContract = async (e) => {
        e.preventDefault();

        let formData = getFormValues()

        if (!isFormValid(formData)) return 0;

        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(formData)
        }

        setIsSubmitting(true)

        await fetch(process.env.REACT_APP_API_URL + "/email-serve/project-request", options)
            .then((response) => {
                return response.json()
            }).then(result => {
                setIsSubmitting(false)
                if (!result.isEmailSent) {
                    setFormResultText("It seems that there's a problem with my emailing service. Try again later.")
                    return 0
                }

                setRequestResubmissionLimit()
                props.triggerVisibility()
            })
    }

    const setRequestResubmissionLimit = () => {
        const ONEWEEK_EXPIRY = 604800

        localStorage.setItem(
            'project_requested_time_limit',
            Math.floor(Date.now() / 1000 + ONEWEEK_EXPIRY) // 1 Week
        );
    }

    const getButtonText = () => {
        if (!isSubmitting) {
            return (
                <Fragment>
                    <FontAwesomeIcon icon={faPaperPlane} /> Submit a project request
                </Fragment>
            )
        }

        return (
            <Fragment>
                <FontAwesomeIcon icon={faSpinner} /> Preparing your coffee... 🤩
            </Fragment>
        )
    }

    return (
        <Modal triggerVisibility={props.triggerVisibility}>
            <div id="hire-me-modal-content">

                <figure className="content">
                    <img src={agreement.default} alt="agreement" />
                </figure>

                <div className="content">
                    <div className="header">
                        <h1>Project Request</h1>
                        <p>Tell us about your project.</p>
                    </div>

                    <form id="project-request-form" onSubmit={submitRequestProjectContract} method="post">
                        <h3 className="form-header-text" >Add your contact info</h3>

                        <FormControl>
                            <label data-required="true" htmlFor="customer-email">Email Address</label>
                            <input type="email" name="customer-email" placeholder="We will send you an email." />
                        </FormControl>

                        <FormControl>
                            <label data-required="true" htmlFor="customer-name">Your Full Name</label>
                            <input type="text" name="customer-name" placeholder="Your full name" />
                        </FormControl>

                        <h3 className="form-header-text">Tell us about your project.</h3>

                        <FormControl>
                            <label data-required="true" htmlFor="customer-project">What is your project all about.</label>
                            <input type="text" name="customer-project" placeholder="Ex. Student Information Management" />
                        </FormControl>

                        <FormControl>
                            <label data-required="true" htmlFor="customer-email">Describe your project</label>
                            <textarea name="project-description" rows="3" placeholder="Describe your project"></textarea>
                        </FormControl>

                        <FormControl>

                            <label data-required="true" htmlFor="web-stack">Select a web stack</label>
                            <select name="web-stack">

                                <option value="MERN" >MERN (MongoDB, ExpressJS, ReactJS, NodeJS) [FOR UI AND SERVER PROCESSES]</option>
                                <option value="WAMP">WAMP (Windows, Apache, MySQL, PHP) [FOR UI AND SERVER PROCESSES]</option>
                                <option value="HTML/CSS" >HTML AND CSS [UI ONLY]</option>
                                <option value="REACT">NODE JS AND REACT [UI ONLY]</option>
                                <option value="ANY">ANY</option>

                            </select>

                        </FormControl>

                        <FormControl>
                            <label data-required="true" htmlFor="deadline">Select a deadline</label>
                            <select name="deadline">
                                <option value="1 Month">1 Month (Applicable for a very small project)</option>
                                <option value="3 Months">3 Months (Medium Project)</option>
                                <option value="6 Months">6 Months (Large Project)</option>
                            </select>
                        </FormControl>

                        <p className="form-result-text">
                            {formResultText}
                        </p>

                        <FormControl>
                            <p>
                                <span className="green">To clients: </span>
                                Mark Calendario does not save any information or data to our database you put in this form.
                            </p>

                            <Button pigment='solid-stable-btn'>
                                {getButtonText()}
                            </Button>

                        </FormControl>

                    </form>
                </div>
            </div>
        </Modal >
    )
}
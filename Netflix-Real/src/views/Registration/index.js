import React, { useState } from "react";
import './registration.scss'
import * as Icon from 'react-feather';
import { Link, NavLink } from "react-router-dom";
import { IconNetflix } from "../../assets/Icon";
import { Footer, SignUpNavigationBar } from "../../components";
import { Button } from "reactstrap";

const Registration = () => {
    const backgroudUrl = 'https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Devices.png'

    const nextClicked = () => {

    }

    return (
        <div id='registration'>
            <div className={`registration`}>
                <SignUpNavigationBar />
                <div className='registration__background-image' />
                <div className={`registration__body`}>
                    <div className={`registration__body__content`}>
                        <div className={`registration__body__content__main`}>
                            <img className={`registration__body__content__main__image-devices`} src={backgroudUrl} />
                            <div>
                                <h1 className="registration__body__content__main__step-title">
                                    Finish setting up your account</h1>
                                <div className="registration__body__content__main__step-content">
                                    Netflix is personalized for you. Create a password to watch on any device at any time.
                                </div>
                            </div>
                            <NavLink to='/signup/registrationform'>
                                <Button className={`registration__body__content__main__button-next`} >
                                    <span>Next
                                    </span>
                                </Button>
                            </NavLink>





                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div>
                    <Footer style={{ background: '#f3f3f3' }} />
                </div>

            </div>

        </div>
    )
}
export default Registration;
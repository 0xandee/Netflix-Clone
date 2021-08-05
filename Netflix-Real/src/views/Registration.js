import React, { useState } from "react";
import '../scss/registration.scss'
import * as Icon from 'react-feather';
import { Link, NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import IconNetflix from "../assets/Icon/ic_netflix";

const Registration = () => {
    const backgroudUrl = 'https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Devices.png'

    const nextClicked = () => {

    }

    return (
        <div id='registration'>
            <div className={`registration`}>
                <div className='registration__background-image'>
                </div>

                <div className={`registration__header`}>
                    <IconNetflix className={'registration__header__logo'} />
                    <Link >
                        Sign Out
                    </Link>
                </div>
                <div className={`registration__body`}>
                    <div className={`registration__body__content`}>
                        <div className={`registration__body__content__main`}>

                            <img className={`registration__body__content__main__image-devices`} src={backgroudUrl} />
                            <div >
                                <span class="registration__body__content__main__step-indicator" >STEP <b>1</b> OF <b>3</b>
                                </span>
                                <h1 class="registration__body__content__main__step-title">

                                    Finish setting up your account</h1>
                                <div class="registration__body__content__main__step-content">
                                    Netflix is personalized for you. Create a password to watch on any device at any time.
                                </div>
                            </div>

                            <NavLink to='/signup/regform'>
                                <button className={`registration__body__content__main__button-next`} >
                                    <span>Next
                                    </span>
                                </button>
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
import React, { useState } from "react";
import '../scss/registrationForm.scss'
import * as Icon from 'react-feather';
import { Link, NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import CustomInput from "../components/CustomInput";
import { FormGroup, Input, Label } from "reactstrap";
import IconNetflix from "../assets/Icon/ic_netflix";

const RegistrationForm = () => {
    const nextClicked = () => {

    }

    return (
        <div id='regForm'>
            <div className={`reg-form`}>
                <div className='reg-form__background-image'>
                </div>

                <div className={`reg-form__header`}>
                    <IconNetflix className={'reg-form__header__logo'} />
                    <Link >
                        Sign In
                    </Link>
                </div>
                <div className={`reg-form__body`}>
                    <div className={`reg-form__body__content`}>
                        <div className={`reg-form__body__content__main`}>
                            <div >
                                <span class="reg-form__body__content__main__step-indicator" >STEP <b>1</b> OF <b>3</b>
                                </span>
                                <h1 class="reg-form__body__content__main__step-title">

                                    Create a password to start your membership</h1>
                                <div class="reg-form__body__content__main__step-content">
                                    Just a few more steps and you're done!
                                    We hate paperwork, too.
                                </div>
                                <CustomInput
                                    placeHolder={`Please enter a valid email`}
                                    label={`Enter your email`}
                                    style={{ background: '#fff', border: '1px solid gray', height: '60px' }}

                                    textStyle={{ color: 'black' }}
                                    type='text' />
                                <CustomInput
                                    placeHolder={`Password is required`}
                                    label={`Password`}
                                    style={{ background: '#fff', border: '1px solid gray', height: '60px' }}

                                    textStyle={{ color: 'black' }}
                                    type='password' />
                                <span>
                                    <input type='checkbox' size ='40' />
                                    <span> Please do not email me Netflix special offers.</span>
                                </span>
                            </div>

                            <NavLink to='/signup/regform'>
                                <button className={`reg-form__body__content__main__button-next`} >
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
export default RegistrationForm;
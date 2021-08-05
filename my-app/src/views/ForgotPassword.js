import React, { useState } from "react";
import '../scss/forgotPassword.scss'
import * as Icon from 'react-feather';
import { Link, NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import CustomInput from "../components/CustomInput";
import { FormGroup, Input, Label } from "reactstrap";

const ForgotPassword = () => {
    const backgroudUrl = 'https://assets.nflxext.com/ffe/siteui/acquisition/login/login-the-crown_2-1500x1000.jpg'
    const [isCheck, setIsCheck] = useState(true);

    const emailClicked = () => {
        setIsCheck(true)
    }

    const smsClicked = () => {
        setIsCheck(false)
    }

    const forgotPasswordClicked = () => {
        
    }

    return (
        <div id='forgotPassword'>
            <div className={`forgot-password`}>
                <div className='forgot-password__background-image'>
                    <img className={`forgot-password__background-image__image-style`} src={backgroudUrl}
                        alt="" />
                </div>

                <div className={`forgot-password__header`}>
                    <img className={`forgot-password__header__logo`}
                        src='https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/logo.36f34a9f.svg' alt='logo'
                    />
                    <Link >
                        Sign Out
                    </Link>
                </div>
                <div className={`forgot-password__body`}>
                    <div className={`forgot-password__body__content`}>
                        <div className={`forgot-password__body__content__main`}>
                            <h1 className={`forgot-password__body__content__main__title`}>Forgot Email/Password</h1>
                            <div style={{color:'whitesmoke'}}> How would you like to reset your password?</div>
                            <div style={{ padding: '20px 15px' }}>
                                <div className={`radio_container`} onClick={emailClicked}>
                                    <input type="radio" name="radio1" checked={isCheck} />
                                    <label>
                                        E-mail
                                    </label>
                                </div>

                                <div className={`radio_container`} onClick={smsClicked} >
                                    <input type="radio" name="radio1" checked={!isCheck} />
                                    <label>
                                        Text Message(SMS)
                                    </label>
                                </div>
                            </div>


                            <CustomInput
                                placeHolder={`Please enter a valid ${isCheck ? 'email' : 'phone number'}`}
                                label={`Enter your ${isCheck ? 'email' : 'phone number'}`}
                                style={{ background: '#fff' }}
                                textStyle={{ color: 'black' }}
                                type='text' />
                            <div style={{color:'whitesmoke'}}>
                                We will text you a verification code to reset your password. Message and data rates may apply.

                            </div>

                            <button className={`forgot-password__body__content__main__button-forgot-password`} onClick={forgotPasswordClicked}>
                                <span>{` ${isCheck ? 'Email':'Text' } Me`}
                                </span>
                            </button>




                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>

            </div>

        </div>
    )
}
export default ForgotPassword;
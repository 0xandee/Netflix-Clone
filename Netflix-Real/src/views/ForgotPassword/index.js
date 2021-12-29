import React, { useState } from "react";
import './forgotPassword.scss'
import * as Icon from 'react-feather';
import { Link, NavLink, useHistory } from "react-router-dom";
import { IconNetflix } from '../../assets/Icon';
import { FormGroup, Input, Label } from "reactstrap";
import { CustomInput, Footer } from "../../components";
import { requestForgotPassword } from "../../services/api/auth";

const ForgotPassword = () => {
    const history = useHistory()
    const backgroudUrl = 'https://assets.nflxext.com/ffe/siteui/acquisition/login/login-the-crown_2-1500x1000.jpg'
    const [email, setEmail] = useState('')
    const [isEmailError, setIsEmailError] = useState(false)
    const [errorTextEmail, setErrorTextEmail] = useState('Please enter a valid email')
    const [isCheckOTP, setIsCheckOTP] = useState(false);

    const forgotPasswordClicked = async () => {
        if (email == "" || !email.match('@gmail.com')) {
            setIsEmailError(true)
        }
        else {
            try {
                setIsEmailError(false)
                const res = await requestForgotPassword(email)
                if (res.status == 200)
                    setIsCheckOTP(true)
                else if (res.status == 302) {
                    setIsEmailError(true)
                    setErrorTextEmail('Account not exist in our web')
                }
                else if (res.status == 500) {
                    history.push('/maintenance')
                }
            }
            catch {
                history.push('/maintenance')
            }
        }
    }

    const backToSignInClicked = () => {
        history.push('/signin')
    }

    return (
        <div id='forgotPassword'>
            <div className={`forgot-password`}>
                <div className='forgot-password__background-image'>
                    <img className={`forgot-password__background-image__image-style`} src={backgroudUrl}
                        alt="" />
                </div>
                <div className={`forgot-password__header`}>
                    <IconNetflix className='forgot-password__header__logo' />
                </div>
                <div className={`forgot-password__body`}>
                    <div className={`forgot-password__body__content`}>
                        <div className={`forgot-password__body__content__main`}>

                            {!isCheckOTP ?
                                <div>
                                    <h1 className={`forgot-password__body__content__main__title`}>Forgot Password</h1>
                                    <CustomInput
                                        label={`Enter your email`}
                                        style={{ background: '#fff' }}
                                        textStyle={{ color: 'black' }}
                                        type='text'
                                        value={email}
                                        onChange={setEmail} />
                                    <div className={`error-label ${isEmailError && 'visible'}`}> {isEmailError && errorTextEmail}</div>
                                    <div style={{ color: 'black' }}>
                                        We will text you a verification code to reset your password. Message and data rates may apply.
                                    </div>
                                    <div className={`forgot-password__body__content__main__button-forgot-password`} onClick={forgotPasswordClicked}>
                                        <span> Email Me
                                        </span>
                                    </div>
                                </div>
                                :
                                <div className="d-flex flex-column text-xl-center font-weight-bold ">
                                    <label>
                                        We have send new password to your email.
                                    </label>
                                    <label>
                                        Please check your email and log in again with new password.
                                    </label>
                                    <label>
                                        If you want to change password, you can go to account section and change it there.
                                    </label>
                                    <div className={`forgot-password__body__content__main__button-forgot-password`} onClick={backToSignInClicked}>
                                        <span> Back to Sign in
                                        </span>
                                    </div>
                                </div>
                            }
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
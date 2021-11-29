import React, { useState } from "react";
import './forgotPassword.scss'
import * as Icon from 'react-feather';
import { Link, NavLink } from "react-router-dom";
import { IconNetflix } from '../../assets/Icon';
import { FormGroup, Input, Label } from "reactstrap";
import { CustomInput, Footer } from "../../components";

const ForgotPassword = () => {
    const backgroudUrl = 'https://assets.nflxext.com/ffe/siteui/acquisition/login/login-the-crown_2-1500x1000.jpg'
    const [email, setEmail] = useState('')
    const [isEmailError, setIsEmailError] = useState(false)
    const [errorTextEmail, setErrorTextEmail] = useState('Please enter a valid email')
    const [isCheckOTP, setIsCheckOTP] = useState(false);
    const [mailOTPCode, setMailOTPCode] = useState('');
    const [isOTPError, setIsOTPError] = useState(false)
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isNewPasswordError, setIsNewPasswordError] = useState(false)
    const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false)

    const forgotPasswordClicked = () => {
        if (email == "" || !email.match('@gmail.com')) {
            setIsEmailError(true)
        }
        else {
            setIsEmailError(false)
            setIsCheckOTP(true)

        }
    }
    const checkOTPClicked = () => {
        setIsChangePassword(true)
    }

    const checkNewPassword = () => {
        if(!newPassword.match(confirmPassword))
        {
            setIsConfirmPasswordError(true)
           
        }
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
                            <h1 className={`forgot-password__body__content__main__title`}>Forgot Password</h1>
                            {!isCheckOTP ?
                                <div>
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
                                !isChangePassword ?
                                    <div>
                                        <CustomInput
                                            label={`Enter your OTP code`}
                                            style={{ background: '#fff' }}
                                            textStyle={{ color: 'black' }}
                                            type='text'
                                            value={mailOTPCode}
                                            onChange={setMailOTPCode} />
                                        <div className={`error-label ${isOTPError && 'visible'}`}> {isOTPError && 'Wrong OTP Code'}</div>
                                        <div className={`forgot-password__body__content__main__button-forgot-password`} onClick={checkOTPClicked}>
                                            <span> Send
                                            </span>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <CustomInput
                                            label={`Enter your new password`}
                                            style={{ background: '#fff' }}
                                            textStyle={{ color: 'black' }}
                                            type='password'
                                            value={newPassword}
                                            onChange={setNewPassword} />
                                        <div className={`error-label ${isNewPasswordError && 'visible'}`}> {isNewPasswordError && 'Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter'}</div>
                                        <CustomInput
                                            label={`Confirm your password`}
                                            style={{ background: '#fff' }}
                                            textStyle={{ color: 'black' }}
                                            type='password'
                                            value={confirmPassword}
                                            onChange={setConfirmPassword} />
                                        <div className={`error-label ${isConfirmPasswordError && 'visible'}`}> {isConfirmPasswordError  && 'Password is not matched'}</div>
                                       
                                        <div className={`forgot-password__body__content__main__button-forgot-password`} onClick={checkNewPassword}>
                                            <span> Change Password
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
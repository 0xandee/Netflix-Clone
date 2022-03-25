import React, { useCallback, useEffect, useState } from "react";
import './forgotPassword.scss'
import {useHistory } from "react-router-dom";
import { IconNetflix } from '../../assets/Icon';
import { CustomInput, Footer } from "../../components";
import { requestForgotPassword } from "../../services/api/auth";
import AccountMenuImg from '../../assets/Images/account_menu_image.png'
import ChangePasswordImg from '../../assets/Images/change_password.png'

const ForgotPassword = () => {
    const history = useHistory()
    const [seconds, setSeconds] = React.useState(0);
    const backgroudUrl = 'https://assets.nflxext.com/ffe/siteui/acquisition/login/login-the-crown_2-1500x1000.jpg'
    const [email, setEmail] = useState('')
    const [isEmailError, setIsEmailError] = useState(false)
    const [errorTextEmail, setErrorTextEmail] = useState('Please enter a valid email')
    const [isCheckOTP, setIsCheckOTP] = useState(false);

    const forgotPasswordClicked = useCallback(async () => {
        var emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email === "" || !email.match(emailValid)) {
            setIsEmailError(true)
        }
        else {
            try {
                setIsEmailError(false)
                const res = await requestForgotPassword(email)
                if (res.status === 200) {
                    setIsCheckOTP(true)
                    setSeconds(59)
                }
                else if (res.status === 302) {
                    setIsEmailError(true)
                    setErrorTextEmail('Account not exist in our web')
                }
                else if (res.status === 500) {
                    history.push('/maintenance')
                }
            }
            catch {
                history.push('/maintenance')
            }
        }
    }, [])

    const backToSignInClicked = () => {
        history.push('/signin')
    }

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            forgotPasswordClicked()
        }
    }, [forgotPasswordClicked])

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)

        }
    }, [handleKeyDown]);

    const resendEmailClicked = async () => {
        try {
            const res = await requestForgotPassword(email)
            if (res.status === 200) {
                setSeconds(59)
            }
            else {
                history.push('maintenance')
            }
        }
        catch (e) {
        }
    }

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        }
    }, [seconds]);

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
                <div className={`forgot-password__body d-flex justify-content-center align-items-center`}>
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
                                        If you want to change your password, you can go to your account section and change it there.
                                    </label>
                                    <div class="d-flex mt-3">
                                        1.
                                        <img src={AccountMenuImg} alt='menu-1' />
                                    </div>
                                    <div class="d-flex mt-3">
                                        2.
                                        <img style={{ width: '600px', maxWidth: '100%' }} src={ChangePasswordImg} alt='changepass-2' />
                                    </div>
                                    <div className='d-flex align-items-center justify-content-center text-center'>
                                        Don't receive any activation email ?
                                        <div className='ml-2'>
                                            {seconds > 0 ?
                                                `00:${seconds > 9 ? seconds : '0' + seconds}`
                                                :
                                                <div className='resend-email' onClick={resendEmailClicked}>
                                                    Resend email
                                                </div>
                                            }
                                        </div>
                                    </div>
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
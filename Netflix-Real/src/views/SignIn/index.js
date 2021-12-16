import React, { useState, Component, useCallback } from "react";
import './signIn.scss'
import * as Icon from 'react-feather';
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { CustomInput, Footer } from "../../components";
import { IconNetflix } from "../../assets/Icon";

import { connect } from 'react-redux';
import { userLoginFetch } from '../../services/redux/actions';
import { requestLogin } from "../../services/api/auth";
import { to_Decrypt, to_Encrypt } from "../../services/aes256";
import { useEffect } from "react";

const SignIn = (props) => {
    const backgroudUrl = 'https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/f50f46d7-13f0-4412-a37c-34808af2dd0c/VN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg'
    const history = useHistory()
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorTextEmail, setErrorTextEmail] = useState('Please enter a valid email')
    const [errorTextPassword, setErrorTextPassword] = useState('Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter')

    const signInClick = useCallback(async () => {
        var errorCheck = false;
        console.log("🚀 ~ file: index.js ~ line 27 ~ signInClick ~ username", username)
        if (username == "" || !username.match('@gmail.com')) {

            setIsEmailError(true);
            errorCheck = true;
        } else {
            setIsEmailError(false)
        }
        //  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        //  if (password == "" || !password.match(passw)) {
        //     setIsPasswordError(true);
        //     setErrorTextPassword('Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter')

        //     errorCheck = true;
        // } else {
        //     setIsPasswordError(false)
        // }
        if (!errorCheck) {
            try {
                const response = await requestLogin(username, password)
                if (response.status === 200) {
                    console.log("response", response);
                    const data = await response.json()
                    localStorage.setItem("access_token", data.accessToken);

                    var index = username.indexOf("@");
                    if (index != -1) {
                        localStorage.setItem("username", username.slice(0, index));
                    }

                    if (data.first)
                        history.push('/choosetype')
                    else
                        history.push('/home')
                }
                else {
                    setIsPasswordError(true)
                    setIsEmailError(false)
                    setErrorTextPassword("Username or password incorrect")
                }
            }
            catch {
                setIsPasswordError(true)
                setIsEmailError(false)
                setErrorTextPassword("Username or password incorrect")
            }

        }
    }, [username, password])
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            console.log("🚀 ~ file: index.js ~ line 75 ~ handleKeyDown ~ e.key", e.key)
            signInClick()
        }
    }, [signInClick])

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)

        }
    }, [handleKeyDown]);

    return (
        <div id='signIn'>
            <div className={`sign-in`}>
                <div className='sign-in__background-image'>
                    <img className={`sign-in__background-image__image-style`} src="https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/f50f46d7-13f0-4412-a37c-34808af2dd0c/VN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/f50f46d7-13f0-4412-a37c-34808af2dd0c/VN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/f50f46d7-13f0-4412-a37c-34808af2dd0c/VN-en-20210719-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/f50f46d7-13f0-4412-a37c-34808af2dd0c/VN-en-20210719-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt="" />
                </div>
                <div className={`sign-in__header`}>
                    {/* <img className={`sign-in__header__logo`}
                        src='https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/logo.36f34a9f.svg' alt='logo'
                    /> */}
                    <IconNetflix className={`sign-in__header__logo`} />
                </div>
                <div className={`sign-in__body`}>
                    <div className={`sign-in__body__content`}>
                        <div className={`sign-in__body__content__main`}>
                            <h1 className={`sign-in__body__content__main__title`}>Sign In</h1>
                            <CustomInput
                                value={username}
                                onChange={setUsername}
                                placeHolder='Please enter a valid email or phone number.'
                                label='Enter your email or phone'
                                type='text' />
                            <div className={`error-label ${isEmailError && 'visible'}`}> {isEmailError && errorTextEmail}</div>

                            <CustomInput
                                value={password}
                                onChange={setPassword}
                                placeHolder='Your password must contain between 4 and 60 characters.'
                                label='Password'
                                type='password' />
                            <div className={`error-label ${isPasswordError && 'visible'}`}> {isPasswordError && errorTextPassword}</div>

                            <div onClick={signInClick} className={`sign-in__body__content__main__button-sign-in`}>
                                {/* <NavLink to='/home' > */}
                                <span> Sign In
                                </span>
                                {/* </NavLink> */}
                            </div>

                            <span>
                                <NavLink to='/forgot-password' >
                                    Forgot password ?
                                </NavLink>
                            </span>
                            <div style={{ display: 'flex', flexDirection: 'row', color: '#c8c8c8', size: '14', marginTop: '40px', justifyContent: 'center' }}>
                                <span> Don't have account yet?
                                </span>
                                <NavLink className={`sign-up`} to='/signup/registration' >
                                    Sign Up
                                </NavLink>
                            </div>
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
const mapDispatchToProps = dispatch => ({
    userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(SignIn);
// export default SignIn;
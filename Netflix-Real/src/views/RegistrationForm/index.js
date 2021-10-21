import React, { useState, Component } from "react";
import './registrationForm.scss'

import { useHistory } from "react-router-dom";
import { CustomInput, Footer } from "../../components";
import { to_Decrypt, to_Encrypt } from "../../services/aes256";
import { connect } from 'react-redux';
import { userPostFetch } from '../../services/redux/actions';
import { requestRegister } from "../../services/api/auth";

const RegistrationForm = () => {
    const history = useHistory()
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorTextEmail, setErrorTextEmail] = useState('Please enter a valid email')
    const [errorTextPassword, setErrorTextPassword] = useState('Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter')

    const nextClicked = () => {
        if (username == "" || !username.match('@gmail.com')) {
            setIsEmailError(true)
        }
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (password == "" || !password.match(passw)) {
            setIsPasswordError(true)
        }
        else {         
            const passEncrypt = to_Encrypt(password);
            requestRegister(username, passEncrypt, username, async (res) => {
                console.log("🚀 ~ file: index.js ~ line 31 ~ requestRegister ~ res", res)
                if (res.status == 200) {
                    history.push('/signup/chooseplan')
                }
                else {
                    if (res.status == 400) {
                        setIsEmailError(true)
                        setErrorTextEmail(res.message)
                    }

                }
            });
        }

    }


    return (
        <div id='regForm'>
            <div className={`reg-form`}>
                <div className='reg-form__background-image'>
                </div>
                <div className={`reg-form__body`}>
                    <div className={`reg-form__body__content`}>
                        <div className={`reg-form__body__content__main`}>
                            <div >
                                <span className="reg-form__body__content__main__step-indicator" >STEP <b>1</b> OF <b>3</b>
                                </span>
                                <h1 className="reg-form__body__content__main__step-title">

                                    Create a password to start your membership</h1>
                                <div className="reg-form__body__content__main__step-content">
                                    Just a few more steps and you're done!
                                    We hate paperwork, too.
                                </div>
                                <CustomInput
                                    label={`Enter your email`}
                                    style={{ background: '#fff', border: '1px solid gray', height: '60px' }}
                                    textStyle={{ color: 'black' }}
                                    type='text'
                                    value={username}
                                    onChange={setUsername} />
                                <div className={`error-label ${isEmailError && 'visible'}`}> {errorTextEmail}</div>
                                <CustomInput
                                    label={`Password`}
                                    style={{ background: '#fff', border: '1px solid gray', height: '60px' }}
                                    textStyle={{ color: 'black' }}
                                    type='password'
                                    value={password}
                                    onChange={setPassword} />
                                <div className={`error-label ${isPasswordError && 'visible'}`}> {errorTextPassword}</div>


                            </div>
                            {/* <NavLink to='/signup/chooseplan'> */}
                            <div className={`reg-form__body__content__main__button-next`} onClick={nextClicked}>
                                <span>Next
                                </span>
                            </div>
                            {/* </NavLink> */}
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer style={{ background: '#f3f3f3' }} />
                </div>
            </div>
        </div >
    )
}

const mapDispatchToProps = dispatch => ({
    userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(RegistrationForm);

// export default RegistrationForm;
import React, { useState,  Fragment } from "react";
import './registrationForm.scss'
import { Row, Col } from 'reactstrap'
import Select from 'react-select';
import {  NavLink, useHistory } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/flatpickr.css';
import { CustomInput, Footer, SignUpNavigationBar } from "../../components";
import { requestRegister, verifyEmail } from "../../services/api/auth";
import { countryListData } from "../../config/countryData";
import { toast } from 'react-toastify'
import { useEffect } from "react";

const genderData = [
    { value: 0, label: 'Male' },
    { value: 1, label: 'Female' },
    { value: 2, label: 'Other' },
]

const ErrorToast = (props) => (
    <Fragment>
        <div className='toastify-header'>
            <div className='title-wrapper'>
                <h6 className='toast-title'>Error!</h6>
            </div>
        </div>
        <div className='toastify-body'>
            <span role='img' aria-label='toast-text'>
                {props.data != null ?
                    props.data :
                    'Something wrongs with server. Please refresh this page'
                }
            </span>
        </div>
    </Fragment>
)


const RegistrationForm = () => {
    const history = useHistory()
    const [seconds, setSeconds] = React.useState(0);
    const [isEmailError, setIsEmailError] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorTextEmail, setErrorTextEmail] = useState('Please enter a valid email')
    const [errorTextPassword, setErrorTextPassword] = useState('Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter')
    const [dob, setDob] = useState(new Date(''))
    const [country, setValueCountry] = useState()
    const [gender, setGender] = useState()
    const [isSucess, setIsSucess] = useState(false)
    const [errorDob, setErrorDob] = useState(false)
    const [errorGenders, setErrorGenders] = useState(false)
    const [errorCountry, setErrorCountry] = useState(false)

    const notifyError = (data) => toast.error(<ErrorToast data={data} />, { hideProgressBar: true })

    const selectStyle = {
        control: base => ({
            ...base,
            height: 60,
            border: '1px solid gray'
        })
    };

    const nextClicked = async () => {
        var emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       
        if (dob == 'Invalid Date') {
            setErrorDob(true)
        }
        else setErrorDob(false)

        if (country == null) {
            setErrorCountry(true)
        }
        else setErrorCountry(false)
        if (gender == null) {
            setErrorGenders(true)
        }
        else setErrorGenders(false)
        if (email == "" || !email.match(emailValid)) {
            setIsEmailError(true)
        }
        else setIsEmailError(false)
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (password == "" || !password.match(passw)) {
            setIsPasswordError(true)
            setErrorTextPassword('Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter')
        }

        else {
            try {
                setIsPasswordError(false)
                const offset = dob.getTimezoneOffset()
                let temp = new Date(dob.getTime() - (offset * 60 * 1000))
                // dates.push(currentDate.toISOString().split('T')[0]);
                let realDob =
                    temp.getFullYear()
                    + '-' +
                    ((temp.getMonth() > 8) ?
                        (temp.getMonth() + 1) :
                        ('0' + (temp.getMonth() + 1)))
                    + '-' +
                    ((temp.getDate() > 9) ?
                        temp.getDate() : ('0' + temp.getDate()));

                const response = await requestRegister({ email, password, gender, country, dob: realDob })

                if (response.status >= 200 && response.status <= 299) {
                    await verifyEmail(email)               
                    setIsSucess(true)
                    setSeconds(59)
                }
                else if (response.status === 422) {
                    setIsEmailError(true)
                    setErrorTextEmail('Email already registered')
                }
                else if (response.status === 400) {
                    setIsEmailError(true)
                    setErrorTextEmail('Email have been blocked')
                }
                else {
                    setIsEmailError(true)
                    setErrorTextEmail(response.statusText)
                }
            }
            catch {
                notifyError()
            }
        }

    }
    const resendEmailClicked = async () => {
        try {
            const res = await verifyEmail(email)
            if (res.status === 200) {
                setSeconds(59)
            }
            else  if (res.status === 500) {
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
        <div id='regForm'>
            <div className={`registration`}>
                <SignUpNavigationBar />
                <div className='registration__background-image'>
                </div>
                <div className={`registration__body d-flex align-items-center`}>
                    {isSucess ?
                        <div className=' align-self-center justify-content-center text-center '>
                            <h1>
                                Registered successfully !!
                            </h1>
                            <h2>
                                Please check your registered email to finish the registration process
                            </h2>
                            <div className='d-flex align-items-center justify-content-center text-center'>
                                Don't receive any activation email ? Check in your spam or 
                                <div className='ml-2'>
                                    {seconds > 0 ?
                                        `resend in 00:${seconds > 9 ? seconds : '0' + seconds}`
                                        :
                                        <div className='resend-email' onClick={resendEmailClicked}>
                                            Resend email
                                        </div>
                                    }
                                </div>
                            </div>
                            <NavLink to='/signin' className=" text-decoration-none d-flex justify-content-center">
                                <div className=" px-5 mt-4 w-75">
                                    <div className={`registration__body__content__main__button-next `} onClick={nextClicked}>
                                        <span> Back to log in page
                                        </span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        :
                        <div className={`registration__body__content`}>
                            <div className={`registration__body__content__main`}>
                                <div >
                                    <h1 className="registration__body__content__main__step-title">
                                        Create a password to start your membership</h1>
                                    <div className="registration__body__content__main__step-content">
                                        Just a few more steps and you're done!
                                        We hate paperwork, too.
                                    </div>
                                    <CustomInput
                                        label={`Enter your email`}
                                        style={{ background: '#fff', border: '1px solid gray', height: '60px' }}
                                        textStyle={{ color: 'black' }}
                                        type='text'
                                        value={email}
                                        onChange={setEmail} />
                                    <div className={`error-label ${isEmailError && 'visible'}`}> {isEmailError && errorTextEmail}</div>
                                    <CustomInput
                                        label={`Password`}
                                        style={{ background: '#fff', border: '1px solid gray', height: '60px' }}
                                        textStyle={{ color: 'black' }}
                                        type='password'
                                        value={password}
                                        onChange={setPassword} />
                                    <div className={`error-label ${isPasswordError && 'visible'}`}> {isPasswordError && errorTextPassword}</div>
                                    <Row >
                                        <Col sm='6'>
                                            <Flatpickr
                                                className="form-control"
                                                placeholder='Date of Birth'
                                                id='dob-picker'
                                                value={dob}
                                                style={{ background: 'white', height: '60px', border: '1px solid gray' }}
                                                onChange={date => {
                                                    setDob(date[0])
                                                }}
                                            />
                                            <div className={`error-label ${errorDob && 'visible'}`}> {errorDob && 'Please choose date'}</div>

                                        </Col>
                                        <Col sm='6'>
                                            <Select
                                                className="react-select"
                                                classNamePrefix="select"
                                                placeholder='Gender'
                                                isDisabled={false}
                                                isLoading={false}
                                                isClearable={false}
                                                isRtl={false}
                                                isSearchable={true}
                                                name="country"
                                                options={genderData}
                                                onChange={(prop) => setGender(prop)}
                                                selectValue={gender}
                                                styles={selectStyle}
                                            />
                                            <div className={`error-label ${errorGenders && 'visible'}`}> {errorGenders && 'Please select gender'}</div>

                                        </Col>
                                    </Row>
                                    <Row >
                                        <Select
                                            className="react-select"
                                            classNamePrefix="select"
                                            placeholder='Country'
                                            isDisabled={false}
                                            isLoading={false}
                                            isClearable={false}
                                            isRtl={false}
                                            isSearchable={true}
                                            name="country"
                                            options={countryListData}
                                            onChange={(prop) => setValueCountry(prop)}
                                            selectValue={country}
                                            styles={selectStyle}
                                        />
                                        <div className={`error-label ${errorCountry && 'visible'}`}> {errorCountry && 'Please select country'}</div>

                                    </Row>

                                </div>
                                {/* <NavLink to='/signup/chooseplan'> */}
                                <div className={`registration__body__content__main__button-next`} onClick={nextClicked}>
                                    <span>Next
                                    </span>
                                </div>
                                {/* </NavLink> */}
                            </div>
                            <div>
                            </div>
                        </div>
                    }
                </div>
                <div>
                    <Footer style={{ background: '#f3f3f3' }} />

                </div>

            </div>

        </div >
    )
}

export default RegistrationForm;

// export default RegistrationForm;
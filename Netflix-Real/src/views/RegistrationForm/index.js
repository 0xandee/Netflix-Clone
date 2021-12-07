import React, { useState, Component, Fragment } from "react";
import './registrationForm.scss'
import { Row, Col, Label, Avatar, Button } from 'reactstrap'
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/flatpickr.css';
import { CustomInput, Footer, SignUpNavigationBar } from "../../components";
import { to_Decrypt, to_Encrypt } from "../../services/aes256";
import { connect } from 'react-redux';
import { userPostFetch } from '../../services/redux/actions';
import { requestRegister } from "../../services/api/auth";
import { countryListData } from "../../config/countryData";
import { X, Check } from "react-feather";
import { toast } from 'react-toastify'

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
            {/* <small className='text-muted'>11 Min Ago</small>   */}
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
        if (dob == 'Invalid Date') {
            setErrorDob(true)
        }
        else setErrorDob(false)
        console.log("🚀 ~ file: index.js ~ line 77 ~ nextClicked ~ country", country)

        if (country == null) {
            setErrorCountry(true)
        }
        else setErrorCountry(false)
        if (gender == null) {
            setErrorGenders(true)
        }
        else setErrorGenders(false)
        if (email == "" || !email.match('@gmail.com')) {
            setIsEmailError(true)
        }
        else setIsEmailError(false)
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (password == "" || !password.match(passw)) {
            setIsPasswordError(true)
        }

        else {
            try {
                setIsPasswordError(false)
                // const passEncrypt = to_Encrypt(password);
                const response = await requestRegister({ email, password, gender, country, dob: dob.toISOString().slice(0, 10) })
                console.log("🚀 ~ file: index.js ~ line 64 ~ nextClicked ~ response", response)
                if (response.status >= 200 && response.status <= 299) {
                    setIsSucess(true)
                }
                else if (response.status == 422) {
                    setIsEmailError(true)
                    setErrorTextEmail('Email already registered')
                }
                else if (response.status == 400) {
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



    return (
        <div id='regForm'>
            <div className={`registration`}>
                    <SignUpNavigationBar />         
                <div className='registration__background-image'>
                </div>

                <div className={`registration__body`}>
                    {isSucess ?
                        <div className=' align-self-center justify-content-center text-center '>
                            <h1>
                                Registered successfully !!
                            </h1>
                            <h2>
                                Please close this page and check your registered email
                            </h2>
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
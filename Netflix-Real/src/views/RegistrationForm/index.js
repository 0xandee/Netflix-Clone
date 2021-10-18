import React, { useState, Component } from "react";
import './registrationForm.scss'
import * as Icon from 'react-feather';
import { Link, NavLink } from "react-router-dom";


import { FormGroup, Input, Label } from "reactstrap";
import { IconNetflix } from "../../assets/Icon";
import { CustomInput, Footer } from "../../components";

import {connect} from 'react-redux';
import {userPostFetch} from '../../services/redux/actions';

const RegistrationForm = () => {
    const nextClicked = () => {}

    var state = {
        username: "",
        password: "",
        avatar: "",
        bio: ""
    }
    
    var handleChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
    }

    var handleSubmit = event => {
    event.preventDefault()
    this.props.userPostFetch(this.state)
    }

    return (
        <div id='regForm'>
            <div className={`reg-form`}>
                <div className='reg-form__background-image'>
                </div>
                <div className={`reg-form__body`}>
                    <div className={`reg-form__body__content`}>
                        <form className={`reg-form__body__content__main`} onSubmit={this.handleSubmit}>
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
                                    placeHolder={`Please enter a valid email`}
                                    label={`Enter your email`}
                                    style={{ background: '#fff', border: '1px solid gray', height: '60px' }}
                                    textStyle={{ color: 'black' }}
                                    type='text'
                                    value={this.state.username}
                                    onChange={this.handleChange} />
                                <CustomInput
                                    placeHolder={`Password is required`}
                                    label={`Password`}
                                    style={{ background: '#fff', border: '1px solid gray', height: '60px' }}
                                    textStyle={{ color: 'black' }}
                                    type='password'
                                    value={this.state.password}
                                    onChange={this.handleChange} />
                                <span>
                                    <input type='checkbox' size ='40' />
                                    <span> Please do not email me Netflix special offers.</span>
                                </span>
                            </div>
                            {/* <NavLink to='/signup/chooseplan'> */}
                                <button className={`reg-form__body__content__main__button-next`} type='submit'>
                                    <span>Next
                                    </span>
                                </button>
                            {/* </NavLink> */}
                        </form>
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

const mapDispatchToProps = dispatch => ({
    userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
  })
  
  export default connect(null, mapDispatchToProps)(RegistrationForm);

// export default RegistrationForm;
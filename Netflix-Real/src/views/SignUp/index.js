import React from "react";
import './signUp.scss'

import {  NavLink } from "react-router-dom";

import { IconCheckmark } from "../../assets/Icon";
import { Footer } from "../../components";

const SignUp = () => {
    const backgroudUrl = 'https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Checkmark.png'

    return (
        <div id='signUp'>
            <div className={`sign-up`}>
                <div className='sign-up__background-image'>
                </div>

                <div className={`sign-up__body`}>
                    <div className={`sign-up__body__content`}>
                        <div className={`sign-up__body__content__main`}>
                            <img className={`sign-up__body__content__main__image-devices`} src={backgroudUrl} alt='backgroundImage'/>
                            <div >
                                <span className="sign-up__body__content__main__step-indicator" >STEP <b>2</b> OF <b>3</b>
                                </span>
                                <h1 className="sign-up__body__content__main__step-title">
                                    Choose your plan</h1>
                                <div className="sign-up__body__content__main__step-content">
                                    <span>
                                        <IconCheckmark className={`sign-up__icon-checkmark`} />
                                      <p>No commitments, cancel anytime.
                                          </p>  
                                    </span>
                                    <span>
                                        <IconCheckmark className={`sign-up__icon-checkmark`} />
                                      <p> Everything on Netflix for one low price.
                                          </p> 
                                    </span>
                                    <span>
                                        <IconCheckmark className={`sign-up__icon-checkmark`} />
                                      <p> No ads and no extra fees. Ever.
                                          </p> 
                                    </span>
                                </div>
                            </div>

                            <NavLink to='/signup/chooseplanform'>
                                <button className={`sign-up__body__content__main__button-next`} >
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
export default SignUp;
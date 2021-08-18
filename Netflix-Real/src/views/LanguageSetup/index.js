import React, { useState } from "react";
import './languageSetup.scss';
import { Link, NavLink } from "react-router-dom";
import { Footer, LanguageItem } from "../../components";

const langData = [{
    id: 1,
    language: 'Action'
},{
    id: 2,
    language: 'Comedy'
},{
    id: 3,
    language: 'Drama'
},{
    id: 4,
    language: 'Fantasy'
},{
    id: 5,
    language: 'Horror'
},{
    id: 6,
    language: 'Mystery'
},{
    id: 7,
    language: 'Romance'
},{
    id: 8,
    language: 'Thriller'
},{
    id: 9,
    language: 'Western'
},{
    id: 10,
    language: 'Musical'
},{
    id: 11,
    language: 'Historical'
},{
    id: 12,
    language: 'Hyrid Genre'
}]

const LanguageSetup = () => {
    return (
        <div id='langSetup'>
            <div className={`registration`}>
                <div className='registration__background-image'>
                </div>
                <div className={`registration__body`}>
                    <div className={`registration__body__content`}>
                        <div className={`registration__body__content__main`}>
                            <div >
                                <span className="registration__body__content__main__step-indicator" >STEP <b>3</b> OF <b>3</b>
                                </span>
                                <h1 className="registration__body__content__main__step-title">

                                Which genre do you like to watch shows and movies in?</h1>
                                <div className="registration__body__content__main__step-content">
                                    Letting us know helps set up your personalization.
                                </div>
                            </div>

                            <ul className="all-languages registration__body__content__main__languages-container mt-3 w-100">
                                {langData.map(item => (<LanguageItem id={item.id} language={item.language}/>))}
                            </ul>

                            <NavLink to='/signup/choosemovies' className='submitBtnContainer'>
                                <button className={`registration__body__content__main__button-next`} >
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
export default LanguageSetup;
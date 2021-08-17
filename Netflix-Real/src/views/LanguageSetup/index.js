import React, { useState } from "react";
import './languageSetup.scss';
import { Link, NavLink } from "react-router-dom";
import { Footer, LanguageItem } from "../../components";

const langData = [{
    id: 1,
    language: 'Chinese'
},{
    id: 2,
    language: 'Spanish'
},{
    id: 3,
    language: 'English'
},{
    id: 4,
    language: 'Arabic'
},{
    id: 5,
    language: 'Hindi'
},{
    id: 6,
    language: 'Vietnamese'
},{
    id: 7,
    language: 'Portuguese'
},{
    id: 8,
    language: 'Russian'
},{
    id: 9,
    language: 'Japanese'
},{
    id: 10,
    language: 'Korean'
},{
    id: 11,
    language: 'Italian'
},{
    id: 12,
    language: 'French'
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

                                Which languages do you like to watch shows and movies in?</h1>
                                <div className="registration__body__content__main__step-content">
                                    Letting us know helps set up your personalization and audio, subtitles.
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
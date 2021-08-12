import React, { useState } from "react";
import './onboardingMovies.scss';
import { Link, NavLink } from "react-router-dom";
import { Footer, OnboardingMovieItem } from "../../components";

const artworkData = [{
    id: 1,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABdq7uWdcgr-iutmrDG4_pw7ak_o_DrkfwJmSyQTahiEMVr-Hc5xZr9aGEk4v3Rg1yys06uvHXIA_dF4kpnR1emwajA.jpg?r=a43'
},{
    id: 2,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABWVrqreoTb1Evojb0HBnTGcyAftKFkHKpyotCBCbtz8C0vN8jtVq0w_sSqcpba9qs_90CopZxolVRIy5dEpTMh4ggmjHMaSmE5rSuUPP7JB2f7f6gkiH-8kZPOs.jpg?r=20d'
},{
    id: 3,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABX-_GKy3ey9eeZwZflmrwgeko8lLWIpkZq8jziWBi1FYOAJsqBr3XHvGlkV-4-rKqxW-bNBe-CbudVzreQI-q-aj4w.jpg?r=8aa'
},{
    id: 4,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABUO2PnUpSpQQ1c9fZviK06V_dhWfoCxna5yp2sbNn6NyEmnolJnwA8MbhanckGLSCe5mIw1v8vC6B85qmWZgyxj6DsapJv4d19XSphT-ylkq5u-idf6OmQI5z5M.jpg?r=319'
},{
    id: 5,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABUVtaA-j-Wz6jSNlw55hX58S75Pxrc-g1nKLX0WrSoAqVoBvAbRO8WFb-ujggPfYE13Qik9eSfb22B77YkxhKJ7E7ecSeukLRR4SL9ec0x3D-lQBFqXJa7M-CpU.jpg?r=b1f'
},{
    id: 6,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABfhY52RXjTMD-fDGRa9HZF-u3kPV8f5h0bd_ipkMxV3evPmzXJtCay-uw88uwymiAMPyknbtkC289ZO_S2cy8dDEZ7RqlcZbRX8S_6kX5EEii6uXcirkdKKNMHg.jpg?r=b85'
},{
    id: 7,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABWVrqreoTb1Evojb0HBnTGcyAftKFkHKpyotCBCbtz8C0vN8jtVq0w_sSqcpba9qs_90CopZxolVRIy5dEpTMh4ggmjHMaSmE5rSuUPP7JB2f7f6gkiH-8kZPOs.jpg?r=20d'
},{
    id: 8,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABX-_GKy3ey9eeZwZflmrwgeko8lLWIpkZq8jziWBi1FYOAJsqBr3XHvGlkV-4-rKqxW-bNBe-CbudVzreQI-q-aj4w.jpg?r=8aa'
},{
    id: 9,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABUO2PnUpSpQQ1c9fZviK06V_dhWfoCxna5yp2sbNn6NyEmnolJnwA8MbhanckGLSCe5mIw1v8vC6B85qmWZgyxj6DsapJv4d19XSphT-ylkq5u-idf6OmQI5z5M.jpg?r=319'
},{
    id: 10,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABUVtaA-j-Wz6jSNlw55hX58S75Pxrc-g1nKLX0WrSoAqVoBvAbRO8WFb-ujggPfYE13Qik9eSfb22B77YkxhKJ7E7ecSeukLRR4SL9ec0x3D-lQBFqXJa7M-CpU.jpg?r=b1f'
},{
    id: 11,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABfhY52RXjTMD-fDGRa9HZF-u3kPV8f5h0bd_ipkMxV3evPmzXJtCay-uw88uwymiAMPyknbtkC289ZO_S2cy8dDEZ7RqlcZbRX8S_6kX5EEii6uXcirkdKKNMHg.jpg?r=b85'
},{
    id: 12,
    artLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABX-_GKy3ey9eeZwZflmrwgeko8lLWIpkZq8jziWBi1FYOAJsqBr3XHvGlkV-4-rKqxW-bNBe-CbudVzreQI-q-aj4w.jpg?r=8aa'
}]

const OnboardingMovies = () => {
    return (
        <div id='langSetup'>
            <div className={`registration`}>
                <div className='registration__background-image'>
                </div>
                <div className={`registration__body`}>
                    <div className={`registration__body__content`}>
                        <div className={`registration__body__content__main`}>
                            {/* Uncomment to show choose 3 you like */}
                            <div >
                                <span class="registration__body__content__main__step-indicator" >STEP <b>3</b> OF <b>3</b>
                                </span>
                                <h1 class="registration__body__content__main__step-title">

                                Andy Vo, choose 3 you like.</h1>
                                <div class="registration__body__content__main__step-content">
                                It will help us find TV shows &amp; movies you'll love! Click the ones you like!
                                </div>
                                <NavLink to='/signup/regform' className='submitBtnContainer'>
                                    <button className={`registration__body__content__main__button-next`} >
                                        <span>Next</span>
                                    </button>
                                </NavLink>
                            </div>
                            {/* <div className='mb-3'>
                                <span class="registration__body__content__main__step-indicator" >STEP <b>3</b> OF <b>3</b></span>
                                <h1 class="registration__body__content__main__step-title">Personalizing for Andy Vo.</h1>
                                <div className="registration__body__content__main__waiting-spinner">
                                    <div className="basic-spinner center-absolute"></div>
                                </div>
                                <div class="registration__body__content__main__step-content">
                                    We're looking for movies and TV shows we think you'll love.
                                </div>
                            </div> */}

                            <div className="registration__body__content__main__boxes">
                                {artworkData.map(item => (<OnboardingMovieItem id={item.id} artLink={item.artLink}/>))}
                            </div>
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
export default OnboardingMovies;
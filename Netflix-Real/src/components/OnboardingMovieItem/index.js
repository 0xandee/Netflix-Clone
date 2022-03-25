import React, { useState } from "react";
import './OnboardingMovieItem.scss';

const OnboardingMovieItem = (props) => {
    const [isCheck, setIsCheck] = useState(false);
    const movieChecked = () => {
        setIsCheck(!isCheck)
        if (!isCheck)
            props.checkedMoviesClicked(props.id)
        else props.notCheckedMoviesClicked(props.id)
    }

    return (
        <div id='onboardingMovies'>
            <div className={`${isCheck ? 'selected' : 'not-selected'} box w-100 h-100`}
             style={{ height: '30vh'}} 
             value={props.id}
              onClick={movieChecked}>
                <img className="art h-100 w-100" style={{ minHeight: '30vh', maxHeight: '30vh' }} src={props.artLink} alt="art" />
                <div className="overlay-thumb">
                    <span className="thumb-up">
                        <svg viewBox="0 0 38 44" className="svg-icon svg-icon-rating-thumbs-up"><title>thumbs-up</title><path d="M33.2259059,39.0138889 C33.2259059,41.128741 31.2435159,41.8394049 29.6453354,41.9746203 L18.0300552,42 C8.69111018,42 9.16114109,39.0138889 2,38.4166667 L2,24.0833333 L7.07360698,21.1623699 L13.2619026,9.95583842 C13.2619026,9.95583842 13.9677739,0.974629541 13.9677739,0.480247712 C13.9677739,0.480247712 19.5402979,-2.23393403 20.9216431,5.2426348 C22.3029884,12.7192036 21.344293,17.3331909 21.0839076,17.9993896 L33.2134373,18.0247694 C34.8116178,18.1599847 36.8064765,18.9823701 36.8064765,21.0972222 C36.8064765,23.2120744 34.8240865,23.9227383 33.2259059,24.0579536 L34.4194295,24.0833333 C36.01761,24.2439284 38,24.9545923 38,27.0694444 C38,29.1842966 36.01761,29.8949605 34.4194295,30.0301758 L32.0323824,30.0555556 C33.6305629,30.2161506 35.612953,30.9268145 35.612953,33.0416667 C35.612953,35.1565188 33.6305629,35.8671827 32.0323824,36.002398 L29.6453354,36.0277778 C31.2435159,36.1883728 33.2259059,36.8990367 33.2259059,39.0138889 Z"></path></svg>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default OnboardingMovieItem;
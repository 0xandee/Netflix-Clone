import React from 'react';
import About from '../About';
import DetailInfo from '../DetailInfo';
import Episodes from '../Episodes';
import MoreLikeThis from '../MoreLikeThis';
import './PreviewInfo.scss';



const PreviewInfo = () => {
    return (
        <div className="PreviewInfo__container">
            <div className="DetailInfo__container">
                <DetailInfo/>
                <Episodes/>
                <MoreLikeThis/>
                <About/>
            </div>
        </div>
    );
};

export default PreviewInfo;
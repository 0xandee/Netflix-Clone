import React from 'react';
import './PreviewInfo.scss';

import DetailInfo from './DetailInfo';
import Episodes from './Episodes';
import MoreLikeThis from './MoreLikeThis';
import About from './About';

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
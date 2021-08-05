import React from 'react';
import './PreviewPopup.scss';
import PreviewPlayer from '../PreviewPlayer';
import PreviewInfo from '../PreviewInfo';

const PreviewPopup = () => {
    return (
        <div className="pop-up__dialog pop-up__container background max-width">
            <PreviewPlayer/>
            <PreviewInfo/>
        </div>
    );
};

export default PreviewPopup;
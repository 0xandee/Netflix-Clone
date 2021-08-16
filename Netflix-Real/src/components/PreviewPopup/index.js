import React from 'react';
import './PreviewPopup.scss';
import PreviewPlayer from '../PreviewPlayer';
import PreviewInfo from '../PreviewInfo';

const PreviewPopup = (props) => {
    return (
        <div className="pop-up__dialog pop-up__container">
            <div className="background max-width">
                <PreviewPlayer onCloseButton = {props.onCloseButton}/>
                <PreviewInfo />

            </div>

        </div>
    );
};

export default PreviewPopup;
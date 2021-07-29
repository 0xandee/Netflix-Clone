import React from 'react';
import './PreviewButtonControl.scss';

const CloseButton = () => {
    return (
        <div className="">
            <button className="PlayButton__close-color PlayButton__close-button">
                <div className="PlayIcon_icon-container">
                    <div id="AddIcon" className="CloseIcon_icon">
                    <svg viewBox="0 0 24 24" data-uia="previewModal-closebtn" role="button" aria-label="close" tabindex="0"><path d="M12 10.586l7.293-7.293 1.414 1.414L13.414 12l7.293 7.293-1.414 1.414L12 13.414l-7.293 7.293-1.414-1.414L10.586 12 3.293 4.707l1.414-1.414L12 10.586z" fill="currentColor"></path></svg>                    </div>
                </div>
            </button>
        </div>
    );
};

export default CloseButton;
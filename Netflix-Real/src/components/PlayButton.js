import React from 'react';
import '../scss/PreviewButtonControl.scss';

const PlayButton = () => {
    return (
        <div>
            <button className="PlayButton__primary-color PlayButton__primary-button">
                <div className="PlayIcon_icon-container">
                    <div id="PlayIcon" className="PlayIcon_icon">
                        <svg viewBox="0 0 24 24">
                            <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
                        </svg>
                    </div>
                </div>
                <span className="PlayButton__primary-text PlayButton__primary-text-transform plr-2">Play</span>
            </button>
        </div>
    );
};

export default PlayButton;
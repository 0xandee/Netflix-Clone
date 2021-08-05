import React from 'react';
import './PreviewButtonControl.scss';

const AddButton = () => {
    return (
        <div className="ml-2">
            <button className="PlayButton__secondary-color PlayButton__secondary-button">
                <div className="PlayIcon_icon-container">
                    <div id="AddIcon" className="AddIcon_icon">
                        <svg viewBox="0 0 24 24">
                            <path d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z" fill="currentColor"></path>
                        </svg>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default AddButton;
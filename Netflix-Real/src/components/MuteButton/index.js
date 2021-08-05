import React from 'react';
import '../PreviewButtonControl/PreviewButtonControl.scss';

const MuteButton = () => {
    return (
        <div className="">
            <button className="PlayButton__secondary-color PlayButton__secondary-button">
                <div className="PlayIcon_icon-container">
                    <div id="AddIcon" className="AddIcon_icon">
                    <svg viewBox="0 0 24 24"><path d="M9 7.828L6.828 10H4v4h2.828L9 16.172V7.828zM11 21l-5-5H2V8h4l5-5v18zm2.744-4.611l-1.414-1.414a4.161 4.161 0 0 0 0-5.885l1.414-1.414a6.161 6.161 0 0 1 0 8.713zm2.47 1.825L14.8 16.8a6.742 6.742 0 0 0 0-9.535l1.414-1.414a8.742 8.742 0 0 1 0 12.363zm2.47 1.825l-1.415-1.415a9.323 9.323 0 0 0 0-13.184l1.415-1.414c4.421 4.422 4.421 11.59 0 16.013z" fill="currentColor"></path></svg>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default MuteButton;
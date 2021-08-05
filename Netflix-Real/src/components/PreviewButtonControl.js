import React from 'react';
import '../scss/PreviewButtonControl.scss'

import PlayButton from './PlayButton'
import AddButton from './AddButton'
import LikeButton from './LikeButton'
import DislikeButton from './DislikeButton'
import MuteButton from './MuteButton'
import CloseButton from './CloseButton'

const PreviewButtonControl = () => {
    return (
        <div>
            <div className="PreviewButton__container PreviewButton__float-left-container">
                <PlayButton/>
                <AddButton/>
                <LikeButton/>
                <DislikeButton/>
            </div>
            <div className="PreviewButton__container PreviewButton__float-right-container">
                <MuteButton/>
            </div>
            <div className="PreviewButton__container PreviewButton__float-top-right-container">
                <CloseButton/>
            </div>
        </div>
    )
};

export default PreviewButtonControl;
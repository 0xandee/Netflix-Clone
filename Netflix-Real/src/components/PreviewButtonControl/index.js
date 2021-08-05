import React from 'react';
import AddButton from '../AddButton';
import CloseButton from '../CloseButton';
import DislikeButton from '../DislikeButton';
import {PlayButton} from '../index';
import LikeButton from '../LikeButton';
import MuteButton from '../MuteButton';
import './PreviewButtonControl.scss'



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
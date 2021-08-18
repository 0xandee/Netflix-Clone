import React from 'react';
import AddButton from '../AddButton';
import CloseButton from '../CloseButton';
import DislikeButton from '../DislikeButton';
import {PlayButton} from '../index';
import LikeButton from '../LikeButton';
import MuteButton from '../MuteButton';
import './PreviewButtonControl.scss'



const PreviewButtonControl = (props) => {
    return (
        <div>
            <div className="PreviewButton__container PreviewButton__float-left-container px-3">
                <PlayButton />
                <AddButton/>
                <LikeButton/>
                <DislikeButton/>
            </div>
            <div className="PreviewButton__container PreviewButton__float-right-container px-3">
                <MuteButton/>
            </div>
            <div className="PreviewButton__container PreviewButton__float-top-right-container px-3 py-3">
                <CloseButton onCloseButton = {props.onCloseButton}/>
            </div>
        </div>
    )
};

export default PreviewButtonControl;
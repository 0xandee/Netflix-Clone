import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { showPopUpInfo } from '../../services/redux/actions';
import '../PreviewButtonControl/PreviewButtonControl.scss';

const CloseButton = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const showed = useSelector((state) => state.isPopUp)
    const handleOncloseButtonClick = () => {
        //props.onCloseButton.history.push(props.onCloseButton.location.pathname)
        dispatch(showPopUpInfo(!showed))
        history.goBack()

    }

    return (
        <div className="">
            <button className="PlayButton__close-color PlayButton__close-button" onClick={props.onCloseButton}>
                <div className="PlayIcon_icon-container">
                    <div id="AddIcon" className="CloseIcon_icon">
                        <svg viewBox="0 0 24 24" data-uia="previewModal-closebtn" role="button" aria-label="close" tabindex="0"><path d="M12 10.586l7.293-7.293 1.414 1.414L13.414 12l7.293 7.293-1.414 1.414L12 13.414l-7.293 7.293-1.414-1.414L10.586 12 3.293 4.707l1.414-1.414L12 10.586z" fill="currentColor"></path></svg>                    </div>
                </div>
            </button>
        </div>
    );
};

export default CloseButton;
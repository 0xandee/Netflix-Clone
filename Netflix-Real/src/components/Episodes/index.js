import React from 'react';
import { useHistory } from 'react-router-dom';

import './Episodes.scss';


const Episodes = (props) => {
    const history = useHistory()

    const playClicked = () => {
        history.push(`/watch/${props.item.id}`)
    }
    

    return (
        <div className="px-4">
            <div className="episodesSelector__header">
                <h3 className="episodesSelector__label">Episodes</h3>

            </div>
            <div className="episodesSelector__container" onClick={playClicked}>
                <div className="titleCardList__container episode__item">
                    
                    <div className="titleCard_imageWrapper">
                        <img className="w-100" src={props.item.uri_avatar} alt="Episode 1" />
                    </div>
                    <div className="titleCardList__metadataWrapper w-100">
                        <div className="titleCardList__title">
                            <span className="titleCard__title_text">Episode 1</span>
                            <span><span className="duration ellipsized">82m</span></span>
                        </div>
                        <p className="titleCard-synopsis previewModal__small-text">{props.item.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Episodes;
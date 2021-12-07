import React from 'react';
import DropdownSelector from '../DropdownSelector';
import './Episodes.scss';


const Episodes = (props) => {
    return (
        <div className="px-4">
            <div className="episodesSelector__header">
                <h3 className="episodesSelector__label">Episodes</h3>

            </div>
            <div className="episodesSelector__container">
                <div className="titleCardList__container episode__item">
                    <div className="titleCard_title_index">1</div>
                    <div className="titleCard_imageWrapper">
                        <img src={props.item.uri_avatar} alt="Episode 1" />
                    </div>
                    <div className="titleCardList__metadataWrapper">
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
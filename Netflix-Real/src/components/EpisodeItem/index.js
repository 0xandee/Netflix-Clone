import React from 'react';
import '../Episodes/Episodes.scss';

const EpisodeItem = () => {
    return (
        <div className="titleCardList__container episode__item">
            <div className="titleCard_title_index">1</div>
            <div className="titleCard_imageWrapper">
                <img src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABQAocJ1BC_Oag00Y_BHCCo-Gs-ykAuSgxJkSGA1mPm05pzXp063WlRJQCQ4l6JYjVe21qMzcqcAGhhIdkjWJppNWWjVY9TR3WYY0ulyD5w_TVNpn.webp?r=be8" alt="Episode 1"/>
            </div>
            <div className="titleCardList__metadataWrapper">
                <div className="titleCardList__title">
                    <span className="titleCard__title_text">Episode 1</span>
                    <span><span className="duration ellipsized">82m</span></span>
                </div>
                <p className="titleCard-synopsis previewModal__small-text">For the first time in 20 years, everyone's finally working under the same roof. A patient with a familiar name finds Chae Song-hwa.</p>
            </div>
        </div>
    );
};

export default EpisodeItem;
import React from 'react';
import '../Episodes/Episodes.scss';
import MoreLikeThisItem from '../MoreLikeThisItem';


const MoreLikeThis = () => {
    return (
        <div  className="pb-3">
            <div className="episodesSelector__header">
                <h3 className="episodesSelector__label">More Like This</h3>
            </div>
            <div className="section__container">
                <div className="moreLikeThis__container">
                    <MoreLikeThisItem/><MoreLikeThisItem/><MoreLikeThisItem/><MoreLikeThisItem/>
                    <MoreLikeThisItem/><MoreLikeThisItem/><MoreLikeThisItem/><MoreLikeThisItem/>
                </div>
            </div>
        </div>
    );
};

export default MoreLikeThis;
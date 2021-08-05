import React from 'react';
import '../Episodes/Episodes.scss';

const MoreLikeThisItem = () => {
    return (
        <div>
            <div className="titleCard__container more-like-this-item">
                <div className="titleCard-imageWrapper has-duration">
                    <img src="https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABelZZL2PYPSGWT2ofKhqG8cCWnWxp7jZAVPZ7TTYRxZ54yJvP4PzNiToKqL9fJ3TidR_kOm07ztQ7OODqhmny2OlfBTeZ7dVh9uVNo9o3xbUbQjCyp_8BeDIa8vP.jpg?r=975" alt="El Camino: A Breaking Bad Movie"/>
                </div>
                <div className="titleCard--metadataWrapper">
                    <div className="videoMetadata--container-container">
                        <div className="videoMetadata--container">
                            <div className="videoMetadata--first-line">
                                <span class="match-score">93% Match</span>
                            </div>
                        </div>
                        <div>
                            <div className="has-smaller-buttons">
                                <div class="ltr-1ksxkn9">
                                    <div class="small ltr-dguo2f" role="presentation">
                                        <svg viewBox="0 0 24 24"><path d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z" fill="currentColor"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="titleCard-synopsis previewModal--small-text">America's fate rests in the hands of a low-level official after an attack on Washington decimates the government in this gripping political thriller.</p>
                </div>
            </div>
        </div>
    );
};

export default MoreLikeThisItem;
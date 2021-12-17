import React from 'react';
import '../Episodes/Episodes.scss';
import { favMoviePost } from '../../services/api/user';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
const MoreLikeThisItem = (props) => {
    const { item } = props
    const addFavoriteClicked = async () => {
        try {
            const response = await favMoviePost(item.id, read_cookie('access_token'))
            console.log("🚀 ~ file: index.js ~ line 9 ~ addFavoriteClicked ~ response", response)
        }
        catch {

        }

    }
    return (
        <div id='moreLikeThis'>
            <div className="titleCard__container more-like-this-item">
                <div className="titleCard-imageWrapper has-duration h-50 w-100">
                    <img className='w-100 h-100' src={item.uri_avatar} alt={item.m_name} />
                </div>
                <div className="titleCard--metadataWrapper">
                    <div className="videoMetadata--container-container">
                        <div className="videoMetadata--container">
                            <div className="videoMetadata--first-line">
                                <span className="match-score">93% Match</span>
                            </div>
                        </div>
                        <div>
                            <div className="has-smaller-buttons d-flex justify-content-center" onClick={addFavoriteClicked}>
                                <div className="small ltr-dguo2f" role="presentation">
                                    <svg viewBox="0 0 24 24"><path d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z" fill="currentColor"></path></svg>
                                </div>
                            </div>

                        </div>
                    </div>
                    <p className="titleCard-synopsis previewModal--small-text">{item.description}</p>
                </div>
            </div>
        </div>
    );
};

export default MoreLikeThisItem;
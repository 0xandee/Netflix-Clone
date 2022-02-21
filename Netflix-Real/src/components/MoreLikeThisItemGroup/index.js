import React from 'react';
import '../Episodes/Episodes.scss';
import { favMoviePost } from '../../services/api/user';
import { useHistory } from "react-router-dom";
import { getToken } from '../../services/function';
import { useState } from 'react';
import { Tooltip } from 'reactstrap';
const MoreLikeThisItem = (props) => {
    const { item } = props
    const history = useHistory()
    const [iconAdd, setAdd] = useState(false);

    const toggleAddPlaylist = () => setAdd(!iconAdd);

    const itemClicked = () => {
        props.setClickedMovie(item)
    }

    const addFavoriteClicked = async (e) => {
        e.stopPropagation();
        try {
            const response = await favMoviePost(item.id, getToken())
            if (response.status === 200) {
                history.push('/maintenance')
            }
        }
        catch {
            history.push('/maintenance')
        }

    }
    return (
        <div id='moreLikeThis' onClick={itemClicked}>
            <div className="titleCard__container more-like-this-item pb-4" >
                <div className="d-flex has-duration h-25 w-100">
                    <img className='w-25 h-125' src={item.uri_avatar} alt={item.m_name} />
                    <div className="d-flex  justify-content-center align-items-center px-4 pt-2 w-100 text-center" style={{ backgroundColor: '#333' }}>
                        <p className="titleCard-synopsis previewModal--small-text">{item.description}</p>
                    </div>

                </div>
                <div className="titleCard--metadataWrapper">
                    <div className="videoMetadata--container-container">
                        <div className="videoMetadata--container">
                            <div className="videoMetadata--first-line d-flex flex-column justify-content-center">
                                <span className="match-score">{item.percentage_match > 0 && `${item.percentage_match}% Match`}</span>
                                <span className="title-movie">{item.name}</span>
                            </div>
                        </div>
                        <div>
                            <div id="AddIconItem" className="has-smaller-buttons d-flex justify-content-center" onClick={addFavoriteClicked} style={{ zIndex: '4' }}>
                                <div className="small ltr-dguo2f" role="presentation">
                                    <svg viewBox="0 0 24 24"><path d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z" fill="currentColor"></path></svg>
                                </div>
                            </div>
                            <Tooltip placement="auto" isOpen={iconAdd} target="AddIconItem" toggle={toggleAddPlaylist}>
                                Add to Playlist
                            </Tooltip>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MoreLikeThisItem;
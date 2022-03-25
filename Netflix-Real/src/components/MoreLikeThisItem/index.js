import React, { Fragment } from 'react';
import '../Episodes/Episodes.scss';
import { favMoviePost } from '../../services/api/user';
import { useHistory } from "react-router-dom";
import { getToken } from '../../services/function';
import { useState } from 'react';
import { Tooltip } from 'reactstrap';
import { toast } from 'react-toastify';

const SuccessToast = (props) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
       
        </div>
      </div>
      <div className='toastify-body'>
        <span role='img' aria-label='toast-text'>
          {props.data != null ?
            props.data :
            'Successfully added movie to playlist'
          }
        </span>
      </div>
    </Fragment>
  )

  const InfoToast = (props) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
        </div>
      </div>
      <div className='toastify-body'>
        <span role='img' aria-label='toast-text'>
          {props.data != null ?
            props.data :
            'Movie is already in Playlist!!'
          }
        </span>
      </div>
    </Fragment>
  )

const MoreLikeThisItem = (props) => {
    const { item } = props
    const history = useHistory()
    const [iconAdd, setAdd] = useState(false);

    const notifySuccess = (data) => toast.success(<SuccessToast data={data} />, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })
    const notifyInfo = (data) => toast.info(<InfoToast data={data} />, { position: toast.POSITION.TOP_CENTER, hideProgressBar: true })


    const toggleAddPlaylist = () => setAdd(!iconAdd);

    const itemClicked = () => {
        history.push(`/detail/${item.id}`)
    }

    const addFavoriteClicked = async (e) => {
        e.stopPropagation();
        try {
            const response = await favMoviePost(item.id, getToken())
            if (response.status === 201) {
                notifySuccess()
            }
            
        }
        catch (err) {
            if(err.response.status === 422)
            {
                notifyInfo()
            }
            //  history.push('/maintenance')
        }

    }
    return (
        <div id='moreLikeThis' onClick={itemClicked}>
            <div className="titleCard__container more-like-this-item pb-4" >
                <div className="d-flex has-duration h-25 w-100">
                <img className=' h-125' style={{width:'30%'}} src={item.uri_avatar} alt={item.m_name} />
                    <div className="d-flex  justify-content-center align-items-center px-3 pt-2 w-100 " style={{ backgroundColor: '#333' }}>
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
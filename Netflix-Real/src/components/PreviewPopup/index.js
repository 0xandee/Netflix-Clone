import React, { useEffect, useHistory, useState } from 'react';
import './PreviewPopup.scss';
import '../PreviewInfo/PreviewInfo.scss';
import '../PreviewPlayer/PreviewPlayer.scss';
import { IconBackArrow } from "../../assets/Icon";
import { PreviewButtonControl, Episodes, DetailInfo, MoreLikeThisItem } from "../index";
import NavigationBar from '../NavigationBar';
import { useParams } from 'react-router';
import { to_Decrypt, to_Encrypt } from '../../services/aes256';
import { getMovieAPI } from '../../services/api/movie';

const PreviewPopup = (props) => {
    // const { item } = props.location.state;
    const { idMovie } = useParams()
    const [dataMovie, setDataMovie] = useState([]);
    // const history = useHistory();
   

    useEffect(() => {

        getMovieAPI(to_Decrypt(idMovie.toString()), async (res) => {
            console.log("🚀 ~ file: index.js ~ line 85 ~ getMoviesByTypeAPI ~ res", res)
            if (res.status == 200) {
                setDataMovie(res.data)
               
            }
            else {
                if (res.status == 400) {

                }
            }
        });
    }, [setDataMovie])

    return (
        <div className="pop-up__container">
            <NavigationBar />
            <div style={{ padding: '0 7vw', minWidth: '800px' }}>
                <div className="position-relative  background max-width">
                    {/* <div className={`video-player__top`}>
                        <div className={`video-player__top__icon-container`}>
                            <IconBackArrow className={'video-player__top__icon-back '} />
                            <span className={'ps-2'}>Back to Browse</span>
                        </div>
                    </div> */}
                    {/* <PreviewPlayer item = {item}/> */}
                    <div className="position-relative float-start w-75 pt-4 ">
                        <div className="mask-image position-relative d-flex flex-row  mb-5">
                            <img style={{ maxHeight: '510px', marginRight: '2vh' }} className='w-25 h-100  ' alt="playerArt" src={dataMovie.uri_thumbnail} />

                            <div className='position-relative d-flex flex-column mb-5'>
                                <DetailInfo item={dataMovie} />
                                <PreviewButtonControl />
                            </div>
                        </div>
                        <Episodes item={dataMovie} />
                    </div>
                    {/* <PreviewInfo item = {item} /> */}
                    <div className="PreviewInfo__container float-end w-25 py-4 ml-4">
                        <div className="DetailInfo__container">
                            <div className="pb-3">
                                <div className="episodesSelector__header">
                                    <h3 className="episodesSelector__label">More Like This</h3>
                                </div>
                                <div className="section__container">
                                    <div className="moreLikeThis__container">
                                        <MoreLikeThisItem item={dataMovie} />
                                        <MoreLikeThisItem item={dataMovie} />
                                        <MoreLikeThisItem item={dataMovie} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPopup;
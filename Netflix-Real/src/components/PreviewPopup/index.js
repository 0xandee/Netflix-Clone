import React, { useEffect, useHistory } from 'react';
import './PreviewPopup.scss';
import '../PreviewInfo/PreviewInfo.scss';
import '../PreviewPlayer/PreviewPlayer.scss';
import { IconBackArrow } from "../../assets/Icon";
import { PreviewButtonControl, Episodes, DetailInfo, MoreLikeThisItem } from "../index";
import NavigationBar from '../NavigationBar';

const PreviewPopup = (props) => {
    const {item} = props.location.state;
    // const history = useHistory();
   
    useEffect(() => {
        console.log("🚀 ~ file: index.js ~ line 43 ~ PreviewPopup ~ props",props)
      }, [])

    return (
        <div className="pop-up__container pt-5">
             <NavigationBar />
            <div>
                <div className="background max-width">
                    {/* <div className={`video-player__top`}>
                        <div className={`video-player__top__icon-container`}>
                            <IconBackArrow className={'video-player__top__icon-back '} />
                            <span className={'ps-2'}>Back to Browse</span>
                        </div>
                    </div> */}
                    {/* <PreviewPlayer item = {item}/> */}
                    <div className="position-relative float-start w-75 pt-4">
                        <div className="mask-image position-relative d-flex justify-content-center">
                            <img style={{maxHeight:'510px'}} className='w-75 h-100' alt="playerArt" src={item.uri_thumbnail} />
                            <PreviewButtonControl/>
                        </div>
                        <DetailInfo item={item}/>
                        <Episodes />
                    </div>
                    {/* <PreviewInfo item = {item} /> */}
                    <div className="PreviewInfo__container float-end w-25 py-4">
                        <div className="DetailInfo__container">
                            <div className="pb-3">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPopup;
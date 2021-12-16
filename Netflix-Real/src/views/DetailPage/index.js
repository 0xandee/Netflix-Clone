import React, { useEffect, useState } from 'react';
import './PreviewPopup.scss';
// import '../PreviewInfo/PreviewInfo.scss';
// import '../PreviewPlayer/PreviewPlayer.scss';
import { IconBackArrow } from "../../assets/Icon";
import { PreviewButtonControl, Episodes, DetailInfo, MoreLikeThisItem,NavigationBar } from "../../components";
import { useParams } from 'react-router';
import { to_Decrypt, to_Encrypt } from '../../services/aes256';
import { getMovieAPI } from '../../services/api/movie';
import { useHistory } from 'react-router-dom';

const DetailPage = (props) => {
    // const { item } = props.location.state;
    const { idMovie } = useParams()
    const [dataMovie, setDataMovie] = useState([]);
    const history = useHistory();


    useEffect(async () => {
        const response = await getMovieAPI(idMovie.toString(), localStorage.getItem('access_token'))
        if (response.status === 200) {
            let data = await response.json()
            setDataMovie(data)
        }
    }, [setDataMovie])

    return (
        <div className="pop-up__container">
            <NavigationBar />
            <div style={{ padding: '0 7vw', minWidth: '800px' }}>
                <div className="position-relative  background max-width">
                  
                    <div className="position-relative float-start w-75 pt-4 ">
                        <div className="mask-image position-relative d-flex flex-row  mb-5">
                            <img style={{ maxHeight: '510px', marginRight: '2vh' }}
                                className='w-25 h-100  ' alt="playerArt" src={dataMovie.uri_thumbnail} />

                            <div className='position-relative d-flex flex-column mb-5'>
                                <DetailInfo item={dataMovie} />
                                <PreviewButtonControl item={dataMovie} />
                            </div>
                        </div>
                        <Episodes item={dataMovie} />
                    </div>
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

export default DetailPage;
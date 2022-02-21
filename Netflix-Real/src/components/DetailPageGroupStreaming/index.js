import React, { useEffect, useState } from 'react';
import './PreviewPopup.scss';

import { getMovieAPI, getMoviesByListID, getRecommGroupMoviesState2 } from '../../services/api/movie';
import { useHistory } from 'react-router-dom';
import { getToken } from '../../services/function';
import { Col, Row } from 'reactstrap';
import { DetailInfo, MoreLikeThisItemGroup } from '..';

const DetailPageGroupStreaming = (props) => {
    const { idMovie, members, item, setClickedMovie } = props

    const [dataMovie, setDataMovie] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const history = useHistory();
    const [percentMatched, setPercentMatched] = useState(0);

    useEffect(() => {
        async function fetchData() {
            // You can await here
            try {
                if (item != undefined) {
                    setDataMovie(item)
                }
                else if (idMovie != undefined) {
                    const response = await getMovieAPI(idMovie)
                    if (response.status === 200) {
                        let data = await response.data
                        setDataMovie(data)
                    }
                    else if (response.status === 500) {
                        history.push('/maintenance')
                    }
                }


            }
            catch (err) {
            }
        }
        fetchData();
    }, [item])

    useEffect(() => {
        async function fetchData() {
            // You can await here
            try {
                const response = await getRecommGroupMoviesState2(members.join("&id="), item.id.toString())
                if (response.status === 200) {
                    const data = await response.json()
                    setPercentMatched(data.percentage_match)
                    setIsFetching(false)
                    const res = await getMoviesByListID(data.map((key) => key.id), getToken())
                    const data2 = await res.data

                    setRecommendedMovies(data2.slice(0, 20));
                    setIsFetching(false)
                }

            }
            catch {
                // history.push('/maintenance')
            }
        }
        fetchData();
    }, [item,members])

    return (
        <div className="pop-up__container" >
            {isFetching ?
                <div style={{ display: 'flex', marginBottom: '10px', width: '100%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <span className='text-light mb-3' style={{ fontSize: '24px' }}>
                        Please wait
                    </span>
                    <div className="spinner-border" role="status" style={{ height: '5vh', width: '5vh', color: '#e50914' }} />
                </div>
                :
                <div className="mx-auto" style={{ padding: '0 0 0 3% ', width: '100%' }}>
                    {/* <div className=' mb-3' onClick={() => localStorage.setItem('access_token', '1')}>
                        REmove token key
                    </div> */}
                    <Row className="position-relative  background max-width">
                        <Col xs='12' lg='9' className="position-relative float-start  pt-4 ">
                            <Row className="mask-image position-relative d-flex flex-row mb-5">
                                <Col lg='3' className="d-flex justify-content-center  mt-3" >
                                    <img style={{ maxHeight: '510px', maxWidth: '220px', marginRight: '2vh' }}
                                        className='w-100 h-100  ' alt="playerArt" src={dataMovie.uri_thumbnail} />
                                </Col>
                                <Col lg='9' className='position-relative d-flex flex-column float-start  mt-3 mb-5'>
                                    <DetailInfo item={dataMovie} percentMatched={percentMatched} />
                                    <Col onClick={() => props.handlePlay(item)} lg='4' className="mx-4 mt-3 PlayButton__primary-color PlayButton__primary-button d-flex flex-row justify-content-center align-items-center"  >
                                        <div className="PlayIcon_icon-container px-2">
                                            <div id="PlayIcon" className="PlayIcon_icon">
                                                <svg viewBox="0 0 24 24">
                                                    <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
                                                </svg>
                                            </div>

                                        </div>
                                        <span className="PlayButton__primary-text PlayButton__primary-text-transform plr-2 ">Play</span>
                                    </Col>
                                    {/* <PreviewButtonControl item={dataMovie} handlePlay={props.handlePlay(item)} /> */}
                                </Col>
                            </Row>

                        </Col>
                        <Col xs='12' lg='3' className="position-relative float-end mt-4" >
                            <h3 className="position-absolute text-light text-center" style={{ top: '-2%', zIndex: '1000' }}>More Like This</h3>
                            <div className="my-3 py-2 px-3 ml-4 overflow-auto w-100 more-like-this-container" style={{ height: '80vh', padding: '0 50px' }} >

                                <div className="pb-3 d-flex flex-column justify-content-center align-items-center">

                                    {recommendedMovies.length && recommendedMovies.map((movie) =>
                                        movie.id != item.id &&
                                        <MoreLikeThisItemGroup key={movie.id} item={movie} setClickedMovie={setClickedMovie} />
                                    )}

                                </div>
                            </div>
                        </Col>

                    </Row>
                </div>
            }

        </div>
    );
};

export default DetailPageGroupStreaming;
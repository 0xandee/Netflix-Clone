import React, { useEffect, useState } from 'react';
import './PreviewPopup.scss';
import { PreviewButtonControl, Episodes, DetailInfo, MoreLikeThisItem, NavigationBar, CustomModal } from "../../components";
import { useParams } from 'react-router';
import { getMovieAPI, getMoviesByListID, getRecommUserMoviesState2, updateMovieClicked } from '../../services/api/movie';
import { useHistory } from 'react-router-dom';
import { getToken } from '../../services/function';
import { Col, Row } from 'reactstrap';




const DetailPage = (props) => {
    const { idMovie } = useParams()
    const [dataMovie, setDataMovie] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [percentMatched, setPercentMatched] = useState(0);


    const toggleModal = () => {
        localStorage.clear()
        history.push('/signin')
    };

    useEffect(() => {
        async function fetchData() {
            // You can await here
            try {
                await updateMovieClicked(idMovie.toString())
                const response = await getMovieAPI(idMovie.toString())
                if (response.status === 200) {
                    let data = await response.data
                    console.log("🚀 ~ file: index.js ~ line 36 ~ fetchData ~ data", data)
                    setDataMovie(data)

                }
                else if (response.status === 403) {
                    setOpen(true)
                }
                else if (response.status === 500) {
                    history.push('/maintenance')
                }
            }
            catch (err) {
            }
        }
        fetchData();
    }, [idMovie])

    useEffect(() => {
        async function fetchData() {
            // You can await here
            try {
                const response = await getRecommUserMoviesState2(localStorage.getItem('id_user'), idMovie.toString())
                if (response.status === 200) {
                    const data = await response.json()
                    setPercentMatched(data.percentage_match)
                    const res = await getMoviesByListID(data.list_recommend.slice(0, 20).map((key) => key.id != 0 &&key.id), getToken())
                    const data2 = await res.data
                    const result = data2.map(v => ({ ...v, ...data.list_recommend.find(sp => v != null && sp.id === v.id )}));

                     setRecommendedMovies(result);
                    setIsFetching(false)

                }
                else if (response.status === 403) {
                    setOpen(true)
                }

            }
            catch {
                // history.push('/maintenance')
            }
        }
        fetchData();
    }, [idMovie])

    return (
        <div className="pop-up__container">
            <NavigationBar />
            {isFetching ?
                <div style={{ display: 'flex', marginBottom: '10px', width: '100%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <span className='text-light mb-3' style={{ fontSize: '24px' }}>
                        Please wait
                    </span>
                    <div className="spinner-border" role="status" style={{ height: '5vh', width: '5vh', color: '#e50914' }} />
                </div>
                :
                <div className="mx-auto" style={{ padding: '0 0 0 6vw ', width: '100%' }}>
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
                                    <PreviewButtonControl item={dataMovie} />
                                </Col>
                            </Row>
                            <Episodes item={dataMovie} />
                        </Col>
                        <Col xs='12' lg='3' className="position-relative float-end mt-4" >
                            <h3 className="position-absolute text-light text-center" style={{ top: '-2%', zIndex: '1000' }}>More Like This</h3>
                            <div className="my-3 py-2 px-3 ml-4 overflow-auto w-100 more-like-this-container" style={{ height: '80vh', padding: '0 50px' }} >

                                <div className="pb-3 d-flex flex-column justify-content-center align-items-center">

                                    {recommendedMovies.length && recommendedMovies.map((item) =>
                                        item.id != idMovie &&
                                        <MoreLikeThisItem key={item.id} item={item} />
                                    )}

                                </div>
                            </div>
                        </Col>

                    </Row>
                </div>
            }
            <CustomModal isOpen={open} onClick={toggleModal} headerText={"Session Timed out"} buttonText='Back to log in page' bodyText=
                {"Look like your log in session have been timed out. So please log in again.\nWe are so sorry for this inconvenience"
                } />
        </div>
    );
};

export default DetailPage;
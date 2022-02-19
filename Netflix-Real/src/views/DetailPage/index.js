import React, { useEffect, useState } from 'react';
import './PreviewPopup.scss';
// import '../PreviewInfo/PreviewInfo.scss';
// import '../PreviewPlayer/PreviewPlayer.scss';
import { IconBackArrow } from "../../assets/Icon";
import { PreviewButtonControl, Episodes, DetailInfo, MoreLikeThisItem, NavigationBar, CustomModal } from "../../components";
import { useParams } from 'react-router';
import { to_Decrypt, to_Encrypt } from '../../services/aes256';
import { getMovieAPI, getMoviesByListID, getRecommUserMoviesState2, updateMovieClicked } from '../../services/api/movie';
import { useHistory } from 'react-router-dom';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { getToken } from '../../services/function';
import { Col, Container, Row } from 'reactstrap';

const DetailPage = (props) => {
    // const { item } = props.location.state;
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
                    setDataMovie(data)
                    setIsFetching(false)
                }
                else if (response.status == 403) {
                    setOpen(true)
                }
                else if (response.status == 500) {
                    history.push('/maintenance')
                }
            }
            catch (err) {
            }
        }
        fetchData();
    }, [setDataMovie])

    useEffect(() => {
        async function fetchData() {
            // You can await here
            try {
                const response = await getRecommUserMoviesState2(localStorage.getItem('id_user'), idMovie.toString())
                if (response.status === 200) {
                    const data = await response.json()
                    setPercentMatched(data.percentage_match)
                    const res = await getMoviesByListID(data.list_recommend.map((key) => key.id),getToken())
                    const data2 = await res.json()
                    const result = data2.map(v => ({ ...v, ...data.list_recommend.find(sp => sp.id === v.id) }));

                    setRecommendedMovies(result.slice(0, 20));
                    setIsFetching(false)
                }
                else if (response.status == 403) {
                    setOpen(true)
                }
                // else if (response.status == 500) {
                //     history.push('/maintenance')
                // }
            }
            catch {
                // history.push('/maintenance')
            }
        }
        fetchData();
    }, [])

    return (
        <div className="pop-up__container">
            <NavigationBar />
            {isFetching ?
                <div style={{ display: 'flex', marginBottom: '10px', width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span className='text-light mb-3' style={{ fontSize: '24px' }}>
                        Please wait
                    </span>
                    <div class="spinner-border" role="status" style={{ height: '5vh', width: '5vh', color: '#e50914' }} />
                </div>

                :
                <div style={{ padding: '0 7vw', width: '100%' }}>
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
                        <Col xs='12' lg='3' className="position-relative float-end mt-4">
                            <h3 className="position-absolute text-light px-4" style={{ top: '-2%', zIndex: '1000' }}>More Like This</h3>
                            <div className="my-3 py-2 px-4 ml-4 overflow-auto w-100 more-like-this-container" style={{ height: '80vh' }} >

                                <div className="pb-3 d-flex flex-column justify-content-center align-items-center">

                                    {recommendedMovies.length && recommendedMovies.map((item) =>
                                        <MoreLikeThisItem item={item} />
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
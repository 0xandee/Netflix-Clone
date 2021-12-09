import React, { useRef, useState, useCallback, useEffect, createRef } from "react";
import { Slider, Footer, NavigationBar } from "../../components";
import { useSelector, useDispatch } from 'react-redux';
import { setMovieTypes, showPopUpInfo } from "../../services/redux/actions";
import { getMoviesByGenreAPI, getMovieTypeAPI } from "../../services/api/movie";
import './Slider.scss';
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"


// import Swiper core and required modules
import SwiperCore, {
    Navigation,
    Pagination
} from 'swiper';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useHistory } from "react-router-dom";

// install Swiper modules
SwiperCore.use([Navigation]);


const Homepage = (props) => {
    const history = useHistory()
    const [genreMovies, setGenreMovies] = useState([]);
    const homePageRef = useRef(null)
    const dispatch = useDispatch();
    let dataTypes = useSelector((state) => state?.rootReducer.movieTypes)
    const [open, setOpen] = useState(false);
    const toggleModal = () => history.push('/signin');

    var movieDataGenres = [];
    useEffect(async () => {
        const response = await getMovieTypeAPI(localStorage.getItem('access_token'))
        console.log("🚀 ~ file: index.js ~ line 39 ~ useEffect ~ response", response)
        if (response.status === 200) {
            let data = await response.json()
            dispatch(setMovieTypes(data))
        }
        else if (response.status == 403) {
            setOpen(true)
        }


    }, [dispatch])

    useEffect(() => {
        dataTypes.map(async (item) => {
            try {
                const res = await getMoviesByGenreAPI(item.id, localStorage.getItem('access_token'))
                console.log("🚀 ~ file: index.js ~ line 50 ~ dataTypes.map ~ res", res)
                if (res.status == 200) {
                    let data = await res.json()
                    var genreMovie = {
                        id: item.id,
                        sliderTitle: item.name,
                        sliderMovieList: data.slice(0, 10)
                    }
                    setGenreMovies(genreMovies => [...genreMovies, genreMovie]);
                    movieDataGenres.push(genreMovie);
                }
                else {
                    if (res.status == 403) {
                        setOpen(true)
                    }
                }
            }
            catch (error) {

            }

        });

    }, [dataTypes])



    return (
        <div className="overflow-x-hidden bg-black" ref={homePageRef}>
            <NavigationBar />
            {/* <div className="">
                <Swiper navigation={true} pagination={true} className="mySwiper swiper-container ">
                    <div>
                        {bannerData.map(item => (
                            <SwiperSlide className="">
                                <a className="thumbTile cursor-pointer" >
                                    <img className="thumbTile__image" src={item.artworkLink} alt={item.movieName}/>
                                </a>
                            </SwiperSlide>
                        ))}
                    </div>
                </Swiper>
            </div> */}
            {/* <BannerSlider bannerData={bannerData} /> */}

            {genreMovies.map(item => (<Slider id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList} />))}
            {/* {movieData.map(item => (<Slider id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList} />))} */}
            <Modal returnFocusAfterClose isOpen={open} className='modal-dialog-centered'  >
                <ModalHeader >
                    <p className="text-danger m-0"> Session Timed out</p>
                </ModalHeader>
                <ModalBody className='text-center '>
                    <h5>Look like your log in session have been timed out.
                    </h5>
                    <h5>So please log in again and sorry for this inconvenience 
                    </h5>
                    <img src='https://cdn-icons-png.flaticon.com/512/1642/1642337.png' alt='apology icon' style={{height:'90px'}} />
                </ModalBody>
                <ModalFooter className="d-flex justify-content-center">
                    <Button color="danger" onClick={toggleModal}>
                        Back to log in page
                    </Button>
                </ModalFooter>
            </Modal>
            <Footer />
        </div>
    );
};

export default Homepage;
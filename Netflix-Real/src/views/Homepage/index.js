import React, { useRef, useState, useCallback, useEffect, createRef } from "react";
import { Slider, Footer, NavigationBar, CustomModal } from "../../components";
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
    const toggleModal = () => {
        localStorage.clear();
        history.push('/signin')
    };

    var movieDataGenres = [];
    useEffect(async () => {
        const response = await getMovieTypeAPI(localStorage.getItem('access_token'))
        console.log("🚀 ~ file: index.js ~ line 39 ~ useEffect ~ response", response)
        if (response.status === 200 && dataTypes.length == 0) {
            const data = await response.json()
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
        <div className="overflow-x-hidden bg-black w-100" ref={homePageRef} style={{ minHeight: '100vh' }}>
            <NavigationBar />
            <div className="h-100" style={{ minHeight: '75vh' }}>
                {genreMovies.map(item => (<Slider id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList} />))}
            </div>
            <CustomModal isOpen={open} onClick={toggleModal} headerText={"Session Timed out"} buttonText='Back to log in page' bodyText=
                {"Look like your log in session have been timed out. So please log in again.\nWe are so sorry for this inconvenience"
                } />
            <Footer />
            {/* <Modal  isOpen={open} className='modal-dialog-centered'  >
                <ModalHeader >
                    <p className="text-danger m-0"> headerText</p>
                </ModalHeader>
                <ModalBody className='text-center '>
                    <h5>bodyText</h5>
                    <img src='https://cdn-icons-png.flaticon.com/512/1642/1642337.png' alt='apology icon' style={{ height: '90px' }} />
                </ModalBody>
                <ModalFooter className="d-flex justify-content-center">
                    <Button color="danger" onClick={toggleModal}>
                        Back to log in page
                    </Button>
                </ModalFooter>
            </Modal> */}

        </div>
    );
};

export default Homepage;
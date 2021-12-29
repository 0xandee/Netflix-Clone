import React, { useRef, useState, useCallback, useEffect, createRef } from "react";
import { Slider, Footer, NavigationBar, CustomModal } from "../../components";
import { useSelector, useDispatch } from 'react-redux';
import { setMovieTypes, showPopUpInfo } from "../../services/redux/actions";
import { getMoviesByGenreAPI, getMoviesByListID, getMovieTypeAPI, getRecommUserMoviesState1 } from "../../services/api/movie";
import './Slider.scss';
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';


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
    const [isFetching, setIsFetching] = useState(true);
    const homePageRef = useRef(null)
    const dispatch = useDispatch();
    let dataTypes = useSelector((state) => state?.rootReducer.movieTypes)
    const [open, setOpen] = useState(false);

    const toggleModal = () => {
        delete_cookie('username')
        delete_cookie('id_user')
        delete_cookie('access_token')
        history.push('/signin')
    };

    var movieDataGenres = [];

    useEffect(async () => {
        try {
            const response = await getMovieTypeAPI(read_cookie('access_token'))
            console.log("🚀 ~ file: index.js ~ line 47 ~ useEffect ~ response", response)
            if (response.status === 200 && dataTypes.length == 0) {
                const data = await response.json()
                dispatch(setMovieTypes(data))
            }
            else if (response.status == 403) {
                setOpen(true)
            }
            else if (response.status === 500) {
                history.push('/maintenance')
            }
        }
        catch {
            history.push('/maintenance')
        }
    }, [])



    useEffect(async () => {
        try {
            const response = await getRecommUserMoviesState1(read_cookie('id_user'))
            console.log("🚀 ~ file: index.js ~ line 39 ~ useEffect ~ response", response)

            if (response.status === 200) {
                const data = await response.json()
                const res = await getMoviesByListID(data.map((key) => key.id), read_cookie('access_token'))
                const data2 = await res.json()
                var genreMovie = {
                    id: 'recommend',
                    sliderTitle: 'Recommend for you',
                    sliderMovieList: data2
                }
                setGenreMovies(genreMovies => [genreMovie, ...genreMovies]);
                setIsFetching(false)

            }
            else if (response.status == 403) {
                setOpen(true)
            }
            // else if (response.status === 500) {
            //     history.push('/maintenance')
            // }
            else {
                setIsFetching(false)
            }
           
        }
        catch {
            // history.push('/maintenance')
        }

    }, [])

    useEffect(() => {

        dataTypes.map(async (item) => {
            try {
                const res = await getMoviesByGenreAPI(item.id, read_cookie('access_token'))
                if (res.status == 200 && !genreMovies.length) {
                    let data = await res.json()
                    var genreMovie = {
                        id: item.id,
                        sliderTitle: item.name,
                        sliderMovieList: data.slice(0, 30)
                    }
                    setGenreMovies(genreMovies => [...genreMovies, genreMovie]);
                    movieDataGenres.push(genreMovie);
                }
                else if (res.status === 500) {
                    history.push('/maintenance')
                }
                else {
                    if (res.status == 403) {
                        setOpen(true)
                    }
                }
            }
            catch {
                history.push('/maintenance')
            }

        });
        console.log("🚀 ~ file: index.js ~ line 104 ~ dataTypes.map ~ dataTypes", dataTypes)

    }, [dataTypes])



    return (
        <div className="overflow-x-hidden bg-black w-100" ref={homePageRef} style={{ minHeight: '100vh' }}>
            <NavigationBar />
            <div className="h-100" style={{ minHeight: '75vh', paddingTop: '5vh' }}>
                {isFetching ?
                    <div style={{ display: 'flex', marginBottom: '10px', width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span className='text-light mb-3' style={{ fontSize: '24px' }}>
                            Personalizing for You
                        </span>
                        <div class="spinner-border" role="status" style={{ height: '5vh', width: '5vh', color: '#e50914' }} />
                    </div>

                    :
                    genreMovies.map(item => (<Slider id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList} />))
                }
            </div>
            <CustomModal isOpen={open} onClick={toggleModal} headerText={"Session Timed out"} buttonText='Back to log in page' bodyText=
                {"Look like your log in session have been timed out. So please log in again.\nWe are so sorry for this inconvenience"
                } />

            <Footer />
        </div>
    );
};

export default Homepage;
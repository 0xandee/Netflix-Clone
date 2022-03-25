import React, { useRef, useState, useEffect } from "react";
import { Slider, Footer, NavigationBar, CustomModal } from "../../components";
import { useSelector, useDispatch } from 'react-redux';
import { setMovieTypes } from "../../services/redux/actions";
import { getMoviesByGenreAPI, getMoviesByListID, getMovieTypeAPI, getRecommUserMoviesState1, getWatchingList } from "../../services/api/movie";
import './Slider.scss';
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"

// import Swiper core and required modules
import SwiperCore, {
    Navigation
} from 'swiper';
import { useHistory } from "react-router-dom";
import { getToken } from "../../services/function";

// install Swiper modules
SwiperCore.use([Navigation]);


const Homepage = () => {
    const history = useHistory()
    const [genreMovies, setGenreMovies] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const homePageRef = useRef(null)
    const dispatch = useDispatch();
    let dataTypes = useSelector((state) => state?.rootReducer.movieTypes)
    const [open, setOpen] = useState(false);

    const toggleModal = () => {
        localStorage.clear()
        history.push('/signin')
    };

    var movieDataGenres = [];

    useEffect(() => {
        async function fetchData() {
            // You can await here
            try {
                const response = await getMovieTypeAPI(getToken())
                if (response.status === 200 && dataTypes.length == 0) {
                    const data = await response.data
                    dispatch(setMovieTypes(data))
                }
                else if (response.status == 403) {
                    setOpen(true)
                }
                else if (response.status === 500) {
                    history.push('/maintenance')
                }
            }
            catch (err) {
                //  history.push('/maintenance')
            }
        }
        fetchData();

    }, [])



    useEffect(() => {
        async function fetchData() {
            // You can await here
            try {
                const response = await getRecommUserMoviesState1(localStorage.getItem('id_user'))
                if (response.status === 200) {
                    const data = await response.json()
                    const res = await getMoviesByListID(data.map((key) => key.id), getToken())
                    const data2 = await res.data
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
                else {
                    setIsFetching(false)
                }

            }
            catch {
                // history.push('/maintenance')
            }
        }
        fetchData();


    }, [])

    useEffect(() => {
        dataTypes.map(async (item) => {
            try {
                const res = await getMoviesByGenreAPI(item.id, getToken())
                if (res.status === 200) {
                    let data = await res.data
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
                    if (res.status === 403) {
                        setOpen(true)
                    }
                }
            }
            catch {
                //   history.push('/maintenance')
            }

        });

    }, [dataTypes])

    useEffect(() => {
        async function fetchData() {
            // You can await here
            try {
                const response = await getWatchingList(getToken())
                if (response.status === 200) {
                    const data = await response.data
                    if (data.length) {
                        var genreMovie = {
                            id: 'Watching',
                            sliderTitle: 'Continue watching',
                            sliderMovieList: data
                        }
                        setGenreMovies(genreMovies => [genreMovie, ...genreMovies]);
                    }

                }
                else if (response.status === 403) {
                    setOpen(true)
                }
                else if (response.status === 500) {
                    history.push('/maintenance')
                }

            }
            catch {
                // history.push('/maintenance')
            }
        }
        fetchData();


    }, [])


    return (
        <div className="overflow-x-hidden bg-black w-100" ref={homePageRef} style={{ minHeight: '100vh' }}>
            <NavigationBar />
            <div className="h-100" style={{ minHeight: '80vh', paddingTop: '5vh' }}>
                {/* <div className='text-light mb-3' onClick={() => localStorage.setItem('access_token', '1')}>
                    REmove token key
                </div> */}
                {isFetching ?
                    <div style={{ display: 'flex', marginBottom: '10px', width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span className='text-light mb-3' style={{ fontSize: '24px' }}>
                            Personalizing for You
                        </span>
                        <div className="spinner-border" role="status" style={{ height: '5vh', width: '5vh', color: '#e50914' }} />
                    </div>

                    :
                    genreMovies.map(item => (<Slider key={`home-${item.id}`} id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList} />))
                }

            </div>
            <CustomModal isOpen={open} onClick={toggleModal} headerText={"Session Timed out"} buttonText='Back to log in page' bodyText=
                {"Look like your log in session have been timed out. So please log in again.\nWe are so sorry for this inconvenience"
                } />
            {/* <div style={{ position: 'absolute', bottom: '0', }}>
                <Footer key='homepage' />
            </div> */}
            <Footer key='homepage' />
        </div>
    );
};

export default Homepage;
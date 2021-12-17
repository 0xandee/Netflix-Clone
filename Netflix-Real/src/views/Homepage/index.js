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
    const homePageRef = useRef(null)
    const dispatch = useDispatch();
    let dataTypes = useSelector((state) => state?.rootReducer.movieTypes)
    const [open, setOpen] = useState(false);
    
    const toggleModal = () => {
        delete_cookie('username')
        delete_cookie('access_token')
        history.push('/signin')
    };

    var movieDataGenres = [];
    useEffect(async () => {
        const response = await getMovieTypeAPI(read_cookie('access_token'))
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
                const res = await getMoviesByGenreAPI(item.id, read_cookie('access_token'))
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
            <div className="h-100" style={{ minHeight: '75vh',paddingTop: '2vh'}}>
                {genreMovies.map(item => (<Slider id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList} />))}
            </div>
            <CustomModal isOpen={open} onClick={toggleModal} headerText={"Session Timed out"} buttonText='Back to log in page' bodyText=
                {"Look like your log in session have been timed out. So please log in again.\nWe are so sorry for this inconvenience"
                } />
            <Footer />
        </div>
    );
};

export default Homepage;
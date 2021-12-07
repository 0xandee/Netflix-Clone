import React, { useRef, useState, useCallback, useEffect, createRef } from "react";
import { BigBanner, Slider, Footer, BannerSlider, NavigationBar } from "../../components";
import { useSelector, useDispatch } from 'react-redux';
import { setMovieTypes, showPopUpInfo } from "../../services/redux/actions";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { getMoviesByGenreAPI, getMovieTypeAPI } from "../../services/api/movie";
import './Slider.scss';
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
import { Swiper, SwiperSlide } from "swiper/react";

import { tokenObj } from '../../services/redux/actions';
import { SignIn } from "../index";

// import Swiper core and required modules
import SwiperCore, {
    Navigation,
    Pagination
} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation]);


const Homepage = (props) => {

    const [genreMovies, setGenreMovies] = useState([]);
    const homePageRef = useRef(null)
    const dispatch = useDispatch();
    let dataTypes = useSelector((state) => state?.rootReducer.movieTypes)

    var movieDataGenres = [];
    useEffect(async () => {
        const response = await getMovieTypeAPI(localStorage.getItem('access_token'))
        if (response.status === 200) {
            let data = await response.json()
            dispatch(setMovieTypes(data))
        }


    }, [dispatch])

    useEffect(() => {
        dataTypes.map(async (item) => {
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
                if (res.status == 400) {

                }
            }
        });

    }, [dataTypes])



    return (
        <div className="overflow-x-hidden bg-black" ref={homePageRef}>
            <NavigationBar />
            {/* <BigBanner handleMoreInfo={handleMoreInfo} /> */}
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
            <br />
            {genreMovies.map(item => (<Slider id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList} />))}
            {/* {movieData.map(item => (<Slider id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList} />))} */}
            <Footer />
        </div>
    );
};

export default Homepage;
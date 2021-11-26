import React, { useRef, useState, useCallback, useEffect, createRef } from "react";
import { BigBanner, Slider, Footer, BannerSlider, NavigationBar } from "../../components";
import { useSelector, useDispatch } from 'react-redux';
import { showPopUpInfo } from "../../services/redux/actions";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { getMoviesByTypeAPI } from "../../services/api/movie";
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

// const bannerData = [{
//     id: 1,
//     movieName: 'Stranger Things',
//     artworkLink: 'https://static.fptplay.net/static/img/share/video/17_08_2021/nu-nhi-nha-ho-kieu-fpt-play-93017-08-2021_21g01-08.jpg?w=1280&mode=scale',
//     movieLink: ''
// }, {
//     id: 2,
//     movieName: `The Queen's Gambit`,
//     artworkLink: 'https://static.fptplay.net/static/img/share/video/02_07_2021/mat-na-hanh-phuc-fpt-play-93002-07-2021_17g56-41.jpg?w=1280&mode=scale',
//     movieLink: ''
// }, {
//     id: 3,
//     movieName: 'Girl from Nowhere',
//     artworkLink: 'https://static.fptplay.net/static/img/share/video/03_08_2021/930-103-08-2021_19g39-21.jpg?w=1280&mode=scale',
//     movieLink: ''
// }];


function getToken() {
    return tokenObj;
}



const Homepage = (props) => {
    const {idGenre} = useParams()
   
    const [genreMovies, setGenreMovies] = useState([]);
    const history = useHistory();
    const homePageRef = useRef(null)
    const dispatch = useDispatch();
    let dataTypes = useSelector((state) => state?.rootReducer.movieTypes)
    
    var movieDataGenres = [];

    useEffect(() => {
        dataTypes.map(item => {
            getMoviesByTypeAPI(item.id, async (res) => {
                if (res.status == 200) {
                    var genreMovie = {
                        id: item.id,
                        sliderTitle: item.t_name,
                        sliderMovieList: res.data.slice(0, 10)
                    }
                    setGenreMovies(genreMovies => [...genreMovies, genreMovie]);
                    movieDataGenres.push(genreMovie);
                }
                else {if (res.status == 400) {}}
            });
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
            <br/>
            {genreMovies.map(item => (<Slider id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList} />))}
            {/* {movieData.map(item => (<Slider id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList} />))} */}
            <Footer />
        </div>
    );
};

export default Homepage;
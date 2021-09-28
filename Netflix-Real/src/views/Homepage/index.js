import React, { useRef, useState, useCallback, useEffect, createRef } from "react";
import { BigBanner, Slider, Footer, BannerSlider } from "../../components";
import { useSelector, useDispatch } from 'react-redux';
import { showPopUpInfo } from "../../services/redux/actions";
import { Link, useHistory, useLocation } from "react-router-dom";
import './Slider.scss';
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import SwiperCore, {
    Navigation,
    Pagination
  } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation]);

const bannerData = [{
    id: 1,
    movieName: 'Stranger Things',
    artworkLink: 'https://static.fptplay.net/static/img/share/video/17_08_2021/nu-nhi-nha-ho-kieu-fpt-play-93017-08-2021_21g01-08.jpg?w=1280&mode=scale',
    movieLink: ''
},{
    id: 2,
    movieName: `The Queen's Gambit`,
    artworkLink: 'https://static.fptplay.net/static/img/share/video/02_07_2021/mat-na-hanh-phuc-fpt-play-93002-07-2021_17g56-41.jpg?w=1280&mode=scale',
    movieLink: ''
},{
    id: 3,
    movieName: 'Girl from Nowhere',
    artworkLink: 'https://static.fptplay.net/static/img/share/video/03_08_2021/930-103-08-2021_19g39-21.jpg?w=1280&mode=scale',
    movieLink: ''
}];

const movieData = [{
    id: 1,
    sliderTitle: 'Recommend For You',
    sliderMovieList: [{
        id: 1,
        movieName: 'Stranger Things',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_01_2020/qwokfcgiolef3km9owva93rywac19-01-2020_15g12-59.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 2,
        movieName: `The Queen's Gambit`,
        artworkLink: 'https://static.fptplay.net/static/img/share/video/26_06_2021/abd2uxiv1jxh8odcpovzlygri8s26-06-2021_11g33-45.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 3,
        movieName: 'Girl from Nowhere',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_08_2021/h8u0akgj52sqeekw4d56rwr2xlx19-08-2021_18g02-5719-08-2021_18g07-36.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 4,
        movieName: 'Sweet Home',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_08_2021/d7vvxps5tg14gyz2czzjoxmggvn19-08-2021_17g50-45.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 5,
        movieName: 'Sweet Tooth',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/10_12_2020/attack-on-titan-ss4-fpt-play-dai-chien-nguoi-khong-lo-phan-4-fpt-play-210-12-2020_15g31-47.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 6,
        movieName: 'Love, Death & Robots',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/04_09_2020/one-punch-man-season-2-fpt-play04-09-2020_01g05-08.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 7,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/14_05_2021/ixvawbxmypk4kzgzk5ggdgfiemx14-05-2021_20g36-12.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 8,
        movieName: 'Money Heist',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/23_02_2021/8vk5w80nasqmy544affdqzi3rrz23-02-2021_15g52-22.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 9,
        movieName: 'Breaking Bad',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/07_04_2021/gia-tien-tvod07-04-2021_10g52-51.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 10,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/24_04_2020/gia-tien-tvod24-04-2020_14g47-34.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 11,
        movieName: 'Godzilla: King of the Monsters',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/28_06_2021/pho-ma-duong-than-yeu-fpt-play-doc-quyen-poster1_28-06-2021_01g22-35.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 12,
        movieName: 'Kingdom: Ashin of the North',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/26_02_2020/poster-126-02-2020_18g55-10.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 13,
        movieName: 'Money Heist',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/23_02_2021/8vk5w80nasqmy544affdqzi3rrz23-02-2021_15g52-22.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 14,
        movieName: 'Breaking Bad',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/07_04_2021/gia-tien-tvod07-04-2021_10g52-51.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 15,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/24_04_2020/gia-tien-tvod24-04-2020_14g47-34.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 16,
        movieName: 'Godzilla: King of the Monsters',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/28_06_2021/pho-ma-duong-than-yeu-fpt-play-doc-quyen-poster1_28-06-2021_01g22-35.jpg?w=282&mode=scale',
        movieLink: ''
    }]
},{
    id: 2,
    sliderTitle: 'Popular Now',
    sliderMovieList: [{
        id: 1,
        movieName: 'Stranger Things',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_01_2020/qwokfcgiolef3km9owva93rywac19-01-2020_15g12-59.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 2,
        movieName: `The Queen's Gambit`,
        artworkLink: 'https://static.fptplay.net/static/img/share/video/26_06_2021/abd2uxiv1jxh8odcpovzlygri8s26-06-2021_11g33-45.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 3,
        movieName: 'Girl from Nowhere',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_08_2021/h8u0akgj52sqeekw4d56rwr2xlx19-08-2021_18g02-5719-08-2021_18g07-36.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 4,
        movieName: 'Sweet Home',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_08_2021/d7vvxps5tg14gyz2czzjoxmggvn19-08-2021_17g50-45.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 5,
        movieName: 'Sweet Tooth',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/10_12_2020/attack-on-titan-ss4-fpt-play-dai-chien-nguoi-khong-lo-phan-4-fpt-play-210-12-2020_15g31-47.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 6,
        movieName: 'Love, Death & Robots',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/04_09_2020/one-punch-man-season-2-fpt-play04-09-2020_01g05-08.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 7,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/14_05_2021/ixvawbxmypk4kzgzk5ggdgfiemx14-05-2021_20g36-12.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 8,
        movieName: 'Money Heist',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/23_02_2021/8vk5w80nasqmy544affdqzi3rrz23-02-2021_15g52-22.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 9,
        movieName: 'Breaking Bad',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/07_04_2021/gia-tien-tvod07-04-2021_10g52-51.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 10,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/24_04_2020/gia-tien-tvod24-04-2020_14g47-34.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 11,
        movieName: 'Godzilla: King of the Monsters',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/28_06_2021/pho-ma-duong-than-yeu-fpt-play-doc-quyen-poster1_28-06-2021_01g22-35.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 12,
        movieName: 'Kingdom: Ashin of the North',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/26_02_2020/poster-126-02-2020_18g55-10.jpg?w=282&mode=scale',
        movieLink: ''
    }]
},{
    id: 3,
    sliderTitle: 'Action & Adventure',
    sliderMovieList: [{
        id: 1,
        movieName: 'Stranger Things',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_01_2020/qwokfcgiolef3km9owva93rywac19-01-2020_15g12-59.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 2,
        movieName: `The Queen's Gambit`,
        artworkLink: 'https://static.fptplay.net/static/img/share/video/26_06_2021/abd2uxiv1jxh8odcpovzlygri8s26-06-2021_11g33-45.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 3,
        movieName: 'Girl from Nowhere',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_08_2021/h8u0akgj52sqeekw4d56rwr2xlx19-08-2021_18g02-5719-08-2021_18g07-36.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 4,
        movieName: 'Sweet Home',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_08_2021/d7vvxps5tg14gyz2czzjoxmggvn19-08-2021_17g50-45.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 5,
        movieName: 'Sweet Tooth',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/10_12_2020/attack-on-titan-ss4-fpt-play-dai-chien-nguoi-khong-lo-phan-4-fpt-play-210-12-2020_15g31-47.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 6,
        movieName: 'Love, Death & Robots',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/04_09_2020/one-punch-man-season-2-fpt-play04-09-2020_01g05-08.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 7,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/14_05_2021/ixvawbxmypk4kzgzk5ggdgfiemx14-05-2021_20g36-12.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 8,
        movieName: 'Money Heist',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/23_02_2021/8vk5w80nasqmy544affdqzi3rrz23-02-2021_15g52-22.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 9,
        movieName: 'Breaking Bad',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/07_04_2021/gia-tien-tvod07-04-2021_10g52-51.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 10,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/24_04_2020/gia-tien-tvod24-04-2020_14g47-34.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 11,
        movieName: 'Godzilla: King of the Monsters',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/28_06_2021/pho-ma-duong-than-yeu-fpt-play-doc-quyen-poster1_28-06-2021_01g22-35.jpg?w=282&mode=scale',
        movieLink: ''
    },{
        id: 12,
        movieName: 'Kingdom: Ashin of the North',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/26_02_2020/poster-126-02-2020_18g55-10.jpg?w=282&mode=scale',
        movieLink: ''
    }]
}]

const Homepage = (props) => {
    //const [showed, setShowed] = useState(false)
    const history = useHistory();
    const showed = useSelector((state) => state.isPopUp)
    const homePageRef = useRef(null)
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const dispatch = useDispatch()
    // const handleMoreInfo = () => {
        // dispatch(showPopUpInfo(!showed))
        // if (!showed) {
        //     homePageRef.current.style.top = -currentScrollY + 'px';
        //     history.push({
        //         pathname: props.match.url,
        //         search: `jbv=${'detailId'}`,
        //         state: { scrollY: currentScrollY }
        //     })
        //     window.scroll(0, 0)
        // }
        // else {
        //     homePageRef.current.style.top = null;
        // }

    // }
    // const styles = ({
    //     fixed: {
    //         position: 'fixed',
    //     },
    //     sticky: {
    //         position: 'static',
    //     }
    // })

    // const handleScroll = useCallback(() => {
    //     setCurrentScrollY(window.scrollY)

    // }, []);

    // const handlePopState = useCallback(() => {
    //     // window.scroll(0, 76)
    //     dispatch(showPopUpInfo(false))
        // console.log("🚀 ~ file: index.js ~ line 84 ~ handlePopState ~ dispatch", showed)

    // }, [dispatch]);

    // useEffect(() => {


    //     window.addEventListener("scroll", handleScroll);
    //     window.addEventListener('popstate', handlePopState);
    //     return () => {

    //         window.removeEventListener("scroll", handleScroll);
    //         window.removeEventListener('onpopstate ', handlePopState);
    //     }

    // }, [handleScroll, handlePopState]);
    return (
        <div className="overflow-x-hidden bg-black" ref={homePageRef}>
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
            <BannerSlider bannerData={bannerData}/>

            {movieData.map(item => (<Slider id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList}/>))}
            <Footer/>
        </div>
    );
};

export default Homepage;
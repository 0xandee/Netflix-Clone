import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
// import Swiper core and required modules
import SwiperCore, {
    Navigation
} from 'swiper/core';
import './Slider.scss';

// install Swiper modules
SwiperCore.use([Navigation]);

const Slider = (props) => {
    
    const itemClicked = (data) => () => {
        props.handleMovieUrlClick(data.m_name);
    }
    return (
    <section className="thumbSection mb-3">
        <h2 className="thumbTitle my-3 ps-5 position-relative cursor-pointer d-inline">{props.sliderTitle}</h2>
        <Swiper spaceBetween={30}
        slidesPerView={3}
        freeMode={true}
        speed={500}
        navigation={true}
        // loop={true}
        breakpoints={{
        "768": {"slidesPerView": 4,"slidesPerGroup": 4,freeMode: false},
        "1024": {"slidesPerView": 8,"slidesPerGroup": 8,freeMode: false}}}
        className="swiper-container mt-3 px-5">  
        <div>
            {props.sliderMovieList.map(item => (
                <SwiperSlide className="swiper-slide slide"  onClick={itemClicked(item)}>
                    <a className="thumbTile cursor-pointer" >
                            <img className="thumbTile__image" src={item.uri_avatar} alt={item.m_name}/>
                    </a>
                    {/* <div className="controlPlayer pl-4em"></div> */}
                </SwiperSlide>))}
        </div>          
        </Swiper>
    </section>
    );
};

export default Slider;
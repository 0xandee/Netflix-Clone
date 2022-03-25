import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
// import Swiper core and required modules
import SwiperCore, {
    Navigation,
} from 'swiper/core';
import './SliderGrid.scss';

// install Swiper modules
SwiperCore.use([Navigation]);

const SliderGrid = (props) => {
    return (
    <section className="thumbSection mb-3">
        <h2 className="thumbTitle my-3 ps-5 position-relative cursor-pointer d-inline">{props.sliderTitle}</h2>
        <Swiper spaceBetween={30}
        grid={3}
        freeMode={true}
        speed={500}
        navigation={true}
        
        breakpoints={{
        "768": {"slidesPerView": 4,"slidesPerGroup": 4,freeMode: false},
        "1024": {"slidesPerView": 9,"slidesPerGroup": 6,freeMode: false}}}
        className="swiper-container mt-3 px-5">  
        <div>
            {props.sliderMovieList.map(item => (
                <SwiperSlide className="swiper-slide slide" onClick={props.handleMoreInfo}>
                    <div className="thumbTile cursor-pointer" >
                        <img className="thumbTile__image" src={item.artworkLink} alt={item.movieName}/>
                    </div>
                    {/* <div className="controlPlayer pl-4em"></div> */}
                </SwiperSlide>))}
        </div>          
        </Swiper>
    </section>
    );
};

export default SliderGrid;
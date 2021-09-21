import React, { useCallback, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
// import Swiper core and required modules
import SwiperCore, {
    Navigation
} from 'swiper/core';
import { Link, useHistory, useLocation } from "react-router-dom";
import './Slider.scss';

// install Swiper modules
SwiperCore.use([Navigation]);

const BannerSlider = (props) => {
    return (
    <div className="bigBanner">
        <Swiper navigation={true} pagination={true} loop={true} className="mySwiper swiper-container ">
            <div>
                {props.bannerData.map(item => (
                    <SwiperSlide className="">
                        <a className="thumbTile cursor-pointer" >
                            <img className="thumbTile__image" src={item.artworkLink} alt={item.movieName}/>
                            <div class="hero-vignette vignette-layer"></div>
                        </a>
                    </SwiperSlide>
                ))}
            </div>
        </Swiper>
    </div>
    );
};

export default BannerSlider;
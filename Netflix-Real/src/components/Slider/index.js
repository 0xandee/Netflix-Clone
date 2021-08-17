import React, { useRef, useState } from "react";
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
import BigBanner from "../BigBanner";

// install Swiper modules
SwiperCore.use([Navigation]);

const Slider = (props) => {
    return (<section className="thumbSection mb-3">
                <h2 className="thumbTitle pb-3 mx-5 position-relative">{props.sliderTitle}</h2>
                <Swiper spaceBetween={5}
                slidesPerView={3}
                // loop={true}
                freeMode={true}
                // loopAdditionalSlides={5}
                speed={500}
                navigation={true}
                breakpoints={{
                "768": {
                    "slidesPerView": 4,
                    "slidesPerGroup": 4,
                    freeMode: false
                },
                "1024": {
                    "slidesPerView": 6,
                    "slidesPerGroup": 6,
                    freeMode: false
                },
                }} className="swiper-container">
                    
                    {props.sliderMovieList.map(item => (
                        <SwiperSlide className="swiper-slide">
                            <a className="thumbTile" href="#">
                                <img className="thumbTile__image"
                                    src={item.artworkLink}
                                    alt={item.movieName}/>
                            </a>
                            <div className="controlPlayer pl-4em"></div>
                        </SwiperSlide>
                    ))}
                    
                </Swiper>
            </section>
    );
};

export default Slider;
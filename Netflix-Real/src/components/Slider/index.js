import React, { useCallback, useEffect, useRef, useState, history } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
// import Swiper core and required modules
import SwiperCore, {
    Navigation
} from 'swiper/core';
import { Link, useHistory, useLocation, NavLink } from "react-router-dom";
import './Slider.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// install Swiper modules
SwiperCore.use([Navigation]);


const Slider = (props) => {
    const history = useHistory();
    const itemClicked = (data) => () => {
        history.push({
            pathname: `/detail/${data.id.toString()}`,
            //search: `jbv=${data.id}`,
            state: { item: data }
        })
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
                    "768": { "slidesPerView": 4, "slidesPerGroup": 4, freeMode: false },
                    "1024": { "slidesPerView": 8, "slidesPerGroup": 8, freeMode: false }
                }}
                className="swiper-container mt-4 px-5">
                <div>
                    {props.sliderMovieList.map(item => {
                       
                        return (
                            item != null && item.uri_avatar != null &&
                            <SwiperSlide className="swiper-slide slide h-100"  onClick={itemClicked(item)}>
                                <a className="thumbTile cursor-pointer h-100" >
                                    <LazyLoadImage effect="blur" className="thumbTile__image" style={{minHeight:'25vh', maxHeight:'25vh'}} src={item.uri_avatar} alt={item.m_name} />
                                </a>
                                {/* <div className="controlPlayer pl-4em"></div> */}
                            </SwiperSlide>)
                    })}
                </div>
            </Swiper>
        </section>
    );
};

export default Slider;
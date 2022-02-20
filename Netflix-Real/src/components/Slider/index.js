import React, {  useState } from "react";
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

import SliderItemForWatching from "../SliderItemForWatching";


// install Swiper modules
SwiperCore.use([Navigation]);


const Slider = (props) => {
    const [movies, setMovies] = useState(props.sliderMovieList)

    const itemRemoveClicked = (data) => async () => {
       
        let updatedData = movies
        try {
            updatedData = updatedData.filter((movie) =>
                data.id !== movie.id
            );
            setMovies(updatedData)
        } catch (error) {

        }
    }

    return ( movies.length &&
        <div className="thumbSection mb-3" key={props.id}>
            <h2 className="thumbTitle my-3 ps-5 position-relative cursor-pointer d-inline">{props.sliderTitle}</h2>
            <Swiper spaceBetween={20}
                slidesPerView={3}
                freeMode={true}
                speed={500}
                navigation={true}
                // loop={true}
                breakpoints={{
                    "100": { "slidesPerView": 2, "slidesPerGroup": 2, freeMode: false },
                    "400": { "slidesPerView": 3, "slidesPerGroup": 3, freeMode: false },
                    "768": { "slidesPerView": 4, "slidesPerGroup": 4, freeMode: false },
                    "1024": { "slidesPerView": 6, "slidesPerGroup": 6, freeMode: false },
                    "1200": { "slidesPerView": 8, "slidesPerGroup": 8, freeMode: false }
                }}
                className="swiper-container mt-4 px-5">
                <div>
                    {movies.map(item => {
                        return (
                            item != null && item.uri_avatar != null && 
                            <SwiperSlide className="swiper-slide slide h-100" key={item.id}>
                                <SliderItemForWatching item={item} id={props.id} itemRemoveClicked={itemRemoveClicked(item)} />
                            </SwiperSlide>)
                    })}
                </div>
            </Swiper>
        </div>
    );
};

export default Slider;
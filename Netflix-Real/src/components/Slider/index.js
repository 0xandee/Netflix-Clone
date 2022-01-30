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
import { LazyLoadImage } from "react-lazy-load-image-component";
import DefaultImage from '../../assets/Images/defaultImage.png'
import { Play, Plus, X } from "react-feather";
import { Tooltip, UncontrolledTooltip } from "reactstrap";
import { favMoviePost } from "../../services/api/user";
import { getToken } from "../../services/function";
import SliderItemForWatching from "../SliderItemForWatching";


// install Swiper modules
SwiperCore.use([Navigation]);


const Slider = (props) => {
    const history = useHistory();
    const [hoverMenu, setHoverMenu] = useState(false);

    const toggleHoverMenu = () => setHoverMenu(!hoverMenu);

    const itemClicked = (data) => () => {
        history.push({
            pathname: `/detail/${data.id.toString()}`,
            //search: `jbv=${data.id}`,
            state: { item: data }
        })
    }

    const itemPlayClicked = (data) => (e) => {
        e.stopPropagation();
        history.push({
            pathname: `/watch/${data.id.toString()}`,
            //search: `jbv=${data.id}`,
            state: { item: data }
        })
    }

    const itemAddClicked = (data) => async (e) => {
        e.stopPropagation();
        try {
            const response = await favMoviePost(data.id.toString(), getToken())
            if (response.status == 500) {
                history.push('/maintenance')
            }
        }
        catch (error) {
            console.log("🚀 ~ file: index.js ~ line 62 ~ itemAddClicked ~ error", error)
            history.push('/maintenance')
        }
    }

    const itemRemoveClicked = (data) => async (e) => {
        e.stopPropagation();
        // try {
        //     const response = await favMoviePost(data.id.toString(), getToken())
        //     if (response.status == 500) {
        //         history.push('/maintenance')
        //     }
        // }
        // catch (error) {
        //     console.log("🚀 ~ file: index.js ~ line 62 ~ itemAddClicked ~ error", error)
        //     history.push('/maintenance')
        // }
    }

    const imageOnErrorHandler = (
        event
    ) => {
        event.currentTarget.src = DefaultImage;

    };
    return (
        <section className="thumbSection mb-3">
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
                    {props.sliderMovieList.map(item => {
                        return (
                            item != null && item.uri_avatar != null &&
                            <SwiperSlide className="swiper-slide slide h-100" >
                                <SliderItemForWatching item={item} id={props.id} />
                                {/* <a className="thumbTile cursor-pointer h-100" >
                                    <img className="thumbTile__image" style={{ minHeight: '25vh', maxHeight: '25vh' }} src={item.uri_avatar} alt={item.m_name}
                                        onError={
                                            (e) => e.currentTarget.src = DefaultImage
                                        } />
                                </a>
                                {props.id == 'Watching' && hoverMenu &&
                                    <div className="w-100 h-100 px-2 position-absolute d-flex justify-content-around align-items-center"
                                        style={{ top: 0, backgroundColor: 'black', opacity: 0.6 }}
                                    >
                                        <div id={`play-${item.id}`} className=' btn-container' onClick={itemPlayClicked(item)}>
                                            <Play />
                                        </div>
                                        <UncontrolledTooltip placement="top" target={`play-${item.id}`} >
                                            Play
                                        </UncontrolledTooltip>
                                        <div id={`add-icon-${item.id}`} className=' btn-container' onClick={itemAddClicked(item)}>
                                            <Plus />
                                        </div>
                                        <UncontrolledTooltip placement="top" target={`add-icon-${item.id}`} >
                                            Add to Playlist
                                        </UncontrolledTooltip>
                                        <div id={`remove-icon-${item.id}`} className=' btn-container bg-danger' onClick={itemRemoveClicked(item)} >
                                            <X />
                                        </div>
                                        <UncontrolledTooltip placement="top" target={`remove-icon-${item.id}`}>
                                            Remove from list
                                        </UncontrolledTooltip>

                                    </div>
                                } */}
                                {/* <div className="controlPlayer pl-4em"></div> */}
                            </SwiperSlide>)
                    })}
                </div>
            </Swiper>
        </section>
    );
};

export default Slider;
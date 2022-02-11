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
import { LazyLoadImage } from "react-lazy-load-image-component";
import DefaultImage from '../../assets/Images/defaultImage.png'
import { Play, Plus, X } from "react-feather";
import { Tooltip, UncontrolledTooltip } from "reactstrap";
import { favMoviePost } from "../../services/api/user";
import { getToken } from "../../services/function";


// install Swiper modules
SwiperCore.use([Navigation]);


const SliderItemForWatching = (props) => {
    const { item } = props;
    const history = useHistory();
    const [hoverMenu, setHoverMenu] = useState(false);

    const onMouseLeave = () => setHoverMenu(false);
    const onMouseEnter = () => setHoverMenu(true);

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

    const itemRemoveClicked = (data) => (e) => {
        console.log("🚀 ~ file: index.js ~ line 65 ~ itemRemoveClicked ~ data", data)
        e.stopPropagation();

        try {      
            props.itemRemoveClicked(data)
        } catch (error) {
            console.log("🚀 ~ file: index.js ~ line 77 ~ itemRemoveClicked ~ error", error)

        }


    }


    return (
        <div className="w-100 h-100" onClick={itemClicked(item)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
            <a className="thumbTile cursor-pointer h-100" >
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

                    <div id={`remove-icon-${item.id}`} className=' btn-container bg-danger'  >
                        <div onClick={itemRemoveClicked(item)}>
                            <X />
                        </div>
                        {/* <UncontrolledTooltip placement="top" target={`remove-icon-${item.id}`}>
                            Remove from list
                        </UncontrolledTooltip> */}
                    </div>



                </div>
            }
        </div>
    );
};

export default SliderItemForWatching;
import React, {  useState } from "react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
// import Swiper core and required modules
import SwiperCore, {
    Navigation
} from 'swiper/core';
import { useHistory} from "react-router-dom";
import DefaultImage from '../../assets/Images/defaultImage.png'
import { Play, Plus, X } from "react-feather";
import {  UncontrolledTooltip } from "reactstrap";
import { favMoviePost } from "../../services/api/user";
import { getToken } from "../../services/function";
import { deleteWatchingList } from "../../services/api/movie";


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
            //history.push('/maintenance')
        }
    }

    const itemRemoveClicked = (data) => async (e) => {
        e.stopPropagation();

        try {
            const response = await deleteWatchingList(data.id)

            if (response.status === 200) {
                props.itemRemoveClicked(data)

            }
            else if (response.status === 500) {
                history.push('/maintenance')
            }
            
        } catch (error) {

        }


    }


    return (
        <div className="w-100 h-100" onClick={itemClicked(item)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} key={props.id} >
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
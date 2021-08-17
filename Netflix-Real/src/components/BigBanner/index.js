import React, { useRef, useState } from "react";
import './BigBanner.scss';
import '../PreviewButtonControl/PreviewButtonControl.scss';
import '../PreviewInfo/PreviewInfo.scss';
import PlayButton from "../PlayButton";
import AddButton from "../AddButton";
import DislikeButton from "../DislikeButton";
import LikeButton from "../LikeButton";
import PreviewPopup from "../PreviewPopup";
import { useSelector, useDispatch } from 'react-redux';
import { showPopUpInfo } from "../../services/redux/actions";
import { Link, useHistory, useLocation } from "react-router-dom";

const BigBanner = () => {
    //const [showed, setShowed] = useState(false)
    const history = useHistory();
    const showed = useSelector((state) => state.isPopUp)
    const homePageRef = useRef(null)
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const dispatch = useDispatch()
    const handleMoreInfo = () => {
        dispatch(showPopUpInfo(!showed))
        if (!showed) {


            homePageRef.current.style.top = -currentScrollY + 'px'


            history.push({
                pathname: props.match.url,
                search: `jbv=${'detailId'}`,
                state: { scrollY: currentScrollY }
            })
            window.scroll(0, 0)
        }
        else {
            homePageRef.current.style.top = -currentScrollY + 'px'


        }

    }
    const styles = ({
        fixed: {
            position: 'fixed',
        },
        sticky: {
            position: 'sticky',
        }
    })

    const handleScroll = useCallback(() => {
        setCurrentScrollY(window.scrollY)

    }, []);

    const handlePopState = useCallback(() => {
        window.scroll(0, 76)
        dispatch(showPopUpInfo(false))
        console.log("🚀 ~ file: index.js ~ line 84 ~ handlePopState ~ dispatch", showed)

    }, [dispatch]);

    useEffect(() => {


        window.addEventListener("scroll", handleScroll);
        window.addEventListener('popstate', handlePopState);
        return () => {

            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener('onpopstate ', handlePopState);
        }

    }, [handleScroll, handlePopState]);
    return (
        <div className="billboard">
            <div className="hero-image-wrapper">
                <img className="hero static-image image-layer" src="https://occ-0-325-58.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABSZMTWqxXA_2n9U7oZdDZ0OfaQEXw9VUuxLP8jy_XGvMgw_iQfWQ_kSluVbIbipIEm_Zq6-F10WO2ItUfThS6mGAYRvx.jpg?r=5ca" alt="aaa" />
                <div class="trailer-vignette vignette-layer"></div>
                <div className="hero-vignette vignette-layer"></div>
            </div>
            <div className="info meta-layer">
                <div className="logo-and-text meta-layer mt-5">
                    <div className="billboard-title">
                        <img className="title-logo" src="https://occ-0-325-58.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABU9xoLxW1h9_3_xksgZXQ0afmEbLKMfP_D2f7BXciH2tpj0vFyEmDli5nKqtQYMDPMxRffV9LJoeneEluBE35pB69Gb_B2mJX2eGpzG4iCtOHYKK0loMG82TapBVIzjSClDAZKkJqzAIjxn2zWhLCtHXi8FynvObiZF5QbstSxfJIg.png?r=e76" title="" alt="aaaa" />
                    </div>
                    <div className="info-wrapper">
                        <div className="synopsis no-supplemental"> Two strangers meet on a train and form a bond that evolves over the years. After a separation, they reconnect and reflect on their love for each other. </div>
                    </div>
                    <div className="billboard-links button-layer forward-leaning">
                        <div className="PreviewButton__container">
                            <PlayButton />
                        </div>
                        <div className="PreviewButton__container" >
                            <span onClick={handleMoreInfo}>More Info</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BigBanner;
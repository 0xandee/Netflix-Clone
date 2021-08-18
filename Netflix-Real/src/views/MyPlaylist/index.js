import React, { useRef, useState, useCallback, useEffect, createRef } from "react";
import './Slider.scss';
import { BigBanner, Slider, Footer } from "../../components";
import { useSelector, useDispatch } from 'react-redux';
import { showPopUpInfo } from "../../services/redux/actions";
import { Link, useHistory, useLocation } from "react-router-dom";

const movieData = [{
    id: 1,
    sliderTitle: '',
    sliderMovieList: [{
        id: 1,
        movieName: 'Stranger Things',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABW0hEyNvRlA9VItn8gFnqsw98MxPkuDFVajE1R4XI-afTllo0E0alvKE1IK_J3IjTmZ0mLYGHItLqzA_CLp-6ygrH-XueNNRhZzN4AuzoRXHBChinBDhypgGGPjO.jpg?r=da1',
        movieLink: ''
    },{
        id: 2,
        movieName: `The Queen's Gambit`,
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABTkLaJLrR7faXhHg_plP0nXDQ4L2Uy4QWERQL58jtuB2yp7l3AoXr41P6QY-XzvkS-lQpOqBqvq21jjipSZ6zHK8IRVKqf2bTJ61Lir5CXBI7Vi-Q3GD4PlAwaZz.jpg?r=93f',
        movieLink: ''
    },{
        id: 3,
        movieName: 'Girl from Nowhere',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABVu0lndH33ByfgLDg-WrwQTvDojoNk8ScnfTqtT7hTkmhrvoNNWxCCNtFzg2HfiZjB-8t8QcXn0o9at8bOj3O0ZGWomJ2uTk19uwyDGrUb-_sPJ-o1DqZ6PqYUuQ.jpg?r=335',
        movieLink: ''
    },{
        id: 4,
        movieName: 'Sweet Home',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABbmGaD5018rVP_nUYVzupsK32kNp9ysby23NrjLdbr8RgbRl6vLcVqAQatGSiowON_vyr43O70NAtytCtQReeE6HWJYfZ4d720L3-g2ULJUhWotqNlL7oGH7Du_-.jpg?r=0e9',
        movieLink: ''
    },{
        id: 5,
        movieName: 'Sweet Tooth',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABSXmhtJ6JRKnBgJFnmvAhKsxeNkf1fqHW5v-ODTpVymAZ4ZGvJQHcsioelP5-GWq7yumfK7TDXvhPskB896I-GtHcF-C9KgFcfQmDsGnFfZ_KfkgPROx9VOl-ChJ.jpg?r=f59',
        movieLink: ''
    },{
        id: 6,
        movieName: 'Love, Death & Robots',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABQvxXNAtHZO0L3elCihVEFr9kUl58LC4hz89kuhtxCpLtRlo099P722G-xO_L3vCpPV9zJt8UwjaLkd0n-j5ZFrWucMP0a-YMLYvO9uO14slVUVj3nZa4t51E2Av.jpg?r=4a1',
        movieLink: ''
    }]
},{
    id: 2,
    sliderTitle: '',
    sliderMovieList: [{
        id: 1,
        movieName: 'Stranger Things',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABW0hEyNvRlA9VItn8gFnqsw98MxPkuDFVajE1R4XI-afTllo0E0alvKE1IK_J3IjTmZ0mLYGHItLqzA_CLp-6ygrH-XueNNRhZzN4AuzoRXHBChinBDhypgGGPjO.jpg?r=da1',
        movieLink: ''
    },{
        id: 2,
        movieName: `The Queen's Gambit`,
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABTkLaJLrR7faXhHg_plP0nXDQ4L2Uy4QWERQL58jtuB2yp7l3AoXr41P6QY-XzvkS-lQpOqBqvq21jjipSZ6zHK8IRVKqf2bTJ61Lir5CXBI7Vi-Q3GD4PlAwaZz.jpg?r=93f',
        movieLink: ''
    },{
        id: 3,
        movieName: 'Girl from Nowhere',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABVu0lndH33ByfgLDg-WrwQTvDojoNk8ScnfTqtT7hTkmhrvoNNWxCCNtFzg2HfiZjB-8t8QcXn0o9at8bOj3O0ZGWomJ2uTk19uwyDGrUb-_sPJ-o1DqZ6PqYUuQ.jpg?r=335',
        movieLink: ''
    },{
        id: 4,
        movieName: 'Sweet Home',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABbmGaD5018rVP_nUYVzupsK32kNp9ysby23NrjLdbr8RgbRl6vLcVqAQatGSiowON_vyr43O70NAtytCtQReeE6HWJYfZ4d720L3-g2ULJUhWotqNlL7oGH7Du_-.jpg?r=0e9',
        movieLink: ''
    },{
        id: 5,
        movieName: 'Sweet Tooth',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABSXmhtJ6JRKnBgJFnmvAhKsxeNkf1fqHW5v-ODTpVymAZ4ZGvJQHcsioelP5-GWq7yumfK7TDXvhPskB896I-GtHcF-C9KgFcfQmDsGnFfZ_KfkgPROx9VOl-ChJ.jpg?r=f59',
        movieLink: ''
    },{
        id: 6,
        movieName: 'Love, Death & Robots',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABQvxXNAtHZO0L3elCihVEFr9kUl58LC4hz89kuhtxCpLtRlo099P722G-xO_L3vCpPV9zJt8UwjaLkd0n-j5ZFrWucMP0a-YMLYvO9uO14slVUVj3nZa4t51E2Av.jpg?r=4a1',
        movieLink: ''
    }]
},{
    id: 2,
    sliderTitle: '',
    sliderMovieList: [{
        id: 1,
        movieName: 'Stranger Things',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABW0hEyNvRlA9VItn8gFnqsw98MxPkuDFVajE1R4XI-afTllo0E0alvKE1IK_J3IjTmZ0mLYGHItLqzA_CLp-6ygrH-XueNNRhZzN4AuzoRXHBChinBDhypgGGPjO.jpg?r=da1',
        movieLink: ''
    },{
        id: 2,
        movieName: `The Queen's Gambit`,
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABTkLaJLrR7faXhHg_plP0nXDQ4L2Uy4QWERQL58jtuB2yp7l3AoXr41P6QY-XzvkS-lQpOqBqvq21jjipSZ6zHK8IRVKqf2bTJ61Lir5CXBI7Vi-Q3GD4PlAwaZz.jpg?r=93f',
        movieLink: ''
    },{
        id: 3,
        movieName: 'Girl from Nowhere',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABVu0lndH33ByfgLDg-WrwQTvDojoNk8ScnfTqtT7hTkmhrvoNNWxCCNtFzg2HfiZjB-8t8QcXn0o9at8bOj3O0ZGWomJ2uTk19uwyDGrUb-_sPJ-o1DqZ6PqYUuQ.jpg?r=335',
        movieLink: ''
    },{
        id: 4,
        movieName: 'Sweet Home',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABbmGaD5018rVP_nUYVzupsK32kNp9ysby23NrjLdbr8RgbRl6vLcVqAQatGSiowON_vyr43O70NAtytCtQReeE6HWJYfZ4d720L3-g2ULJUhWotqNlL7oGH7Du_-.jpg?r=0e9',
        movieLink: ''
    },{
        id: 5,
        movieName: 'Sweet Tooth',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABSXmhtJ6JRKnBgJFnmvAhKsxeNkf1fqHW5v-ODTpVymAZ4ZGvJQHcsioelP5-GWq7yumfK7TDXvhPskB896I-GtHcF-C9KgFcfQmDsGnFfZ_KfkgPROx9VOl-ChJ.jpg?r=f59',
        movieLink: ''
    },{
        id: 6,
        movieName: 'Love, Death & Robots',
        artworkLink: 'https://occ-0-395-325.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABQvxXNAtHZO0L3elCihVEFr9kUl58LC4hz89kuhtxCpLtRlo099P722G-xO_L3vCpPV9zJt8UwjaLkd0n-j5ZFrWucMP0a-YMLYvO9uO14slVUVj3nZa4t51E2Av.jpg?r=4a1',
        movieLink: ''
    }]
}]

const MyPlaylist = (props) => {
    //const [showed, setShowed] = useState(false)
    const history = useHistory();
    const showed = useSelector((state) => state.isPopUp)
    const homePageRef = useRef(null)
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const dispatch = useDispatch()
    const handleMoreInfo = () => {
        dispatch(showPopUpInfo(!showed))
        if (!showed) {
            homePageRef.current.style.top = -currentScrollY + 'px';
            history.push({
                pathname: props.match.url,
                search: `jbv=${'detailId'}`,
                state: { scrollY: currentScrollY }
            })
            window.scroll(0, 0)
        }
        else {
            homePageRef.current.style.top = null;

        }

    }
    const styles = ({
        fixed: {
            position: 'fixed',
        },
        sticky: {
            position: 'static',
        }
    })

    const handleScroll = useCallback(() => {
        setCurrentScrollY(window.scrollY)

    }, []);

    const handlePopState = useCallback(() => {
        // window.scroll(0, 76)
        dispatch(showPopUpInfo(false))
        // console.log("🚀 ~ file: index.js ~ line 84 ~ handlePopState ~ dispatch", showed)

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
        <div className="overflow-x-hidden bg-black" ref={homePageRef} style={showed ? styles.fixed : styles.sticky}>
            <div class="sub-header"><div><div class="sub-header-wrapper"><div class="galleryHeader"><div class="title">My List</div></div></div></div></div>
            {movieData.map(item => (<Slider id={item.id} sliderMovieList={item.sliderMovieList} handleMoreInfo={handleMoreInfo}/>))}
            <Footer/>
        </div>
    );
};

export default MyPlaylist;
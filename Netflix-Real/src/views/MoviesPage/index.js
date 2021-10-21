import React, { useRef, useState, useCallback, useEffect, createRef } from "react";
import './style.scss';
import { BigBanner, Slider, Footer } from "../../components";
import { useSelector, useDispatch } from 'react-redux';
import { showPopUpInfo } from "../../services/redux/actions";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getMovieType } from "../../services/api/movie";
import Select from 'react-select';
const movieData = [{
    id: 1,
    sliderTitle: 'Popular Now',
    sliderMovieList: [{
        id: 1,
        movieName: 'Stranger Things',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_01_2020/qwokfcgiolef3km9owva93rywac19-01-2020_15g12-59.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 2,
        movieName: `The Queen's Gambit`,
        artworkLink: 'https://static.fptplay.net/static/img/share/video/26_06_2021/abd2uxiv1jxh8odcpovzlygri8s26-06-2021_11g33-45.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 3,
        movieName: 'Girl from Nowhere',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_08_2021/h8u0akgj52sqeekw4d56rwr2xlx19-08-2021_18g02-5719-08-2021_18g07-36.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 4,
        movieName: 'Sweet Home',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_08_2021/d7vvxps5tg14gyz2czzjoxmggvn19-08-2021_17g50-45.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 5,
        movieName: 'Sweet Tooth',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/10_12_2020/attack-on-titan-ss4-fpt-play-dai-chien-nguoi-khong-lo-phan-4-fpt-play-210-12-2020_15g31-47.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 6,
        movieName: 'Love, Death & Robots',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/04_09_2020/one-punch-man-season-2-fpt-play04-09-2020_01g05-08.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 7,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/14_05_2021/ixvawbxmypk4kzgzk5ggdgfiemx14-05-2021_20g36-12.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 8,
        movieName: 'Money Heist',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/23_02_2021/8vk5w80nasqmy544affdqzi3rrz23-02-2021_15g52-22.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 9,
        movieName: 'Breaking Bad',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/07_04_2021/gia-tien-tvod07-04-2021_10g52-51.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 10,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/24_04_2020/gia-tien-tvod24-04-2020_14g47-34.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 11,
        movieName: 'Godzilla: King of the Monsters',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/28_06_2021/pho-ma-duong-than-yeu-fpt-play-doc-quyen-poster1_28-06-2021_01g22-35.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 12,
        movieName: 'Kingdom: Ashin of the North',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/26_02_2020/poster-126-02-2020_18g55-10.jpg?w=282&mode=scale',
        movieLink: ''
    }]
}, {
    id: 2,
    sliderTitle: 'Action & Adventure',
    sliderMovieList: [{
        id: 1,
        movieName: 'Stranger Things',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_01_2020/qwokfcgiolef3km9owva93rywac19-01-2020_15g12-59.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 2,
        movieName: `The Queen's Gambit`,
        artworkLink: 'https://static.fptplay.net/static/img/share/video/26_06_2021/abd2uxiv1jxh8odcpovzlygri8s26-06-2021_11g33-45.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 3,
        movieName: 'Girl from Nowhere',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_08_2021/h8u0akgj52sqeekw4d56rwr2xlx19-08-2021_18g02-5719-08-2021_18g07-36.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 4,
        movieName: 'Sweet Home',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_08_2021/d7vvxps5tg14gyz2czzjoxmggvn19-08-2021_17g50-45.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 5,
        movieName: 'Sweet Tooth',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/10_12_2020/attack-on-titan-ss4-fpt-play-dai-chien-nguoi-khong-lo-phan-4-fpt-play-210-12-2020_15g31-47.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 6,
        movieName: 'Love, Death & Robots',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/04_09_2020/one-punch-man-season-2-fpt-play04-09-2020_01g05-08.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 7,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/14_05_2021/ixvawbxmypk4kzgzk5ggdgfiemx14-05-2021_20g36-12.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 8,
        movieName: 'Money Heist',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/23_02_2021/8vk5w80nasqmy544affdqzi3rrz23-02-2021_15g52-22.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 9,
        movieName: 'Breaking Bad',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/07_04_2021/gia-tien-tvod07-04-2021_10g52-51.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 10,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/24_04_2020/gia-tien-tvod24-04-2020_14g47-34.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 11,
        movieName: 'Godzilla: King of the Monsters',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/28_06_2021/pho-ma-duong-than-yeu-fpt-play-doc-quyen-poster1_28-06-2021_01g22-35.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 12,
        movieName: 'Kingdom: Ashin of the North',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/26_02_2020/poster-126-02-2020_18g55-10.jpg?w=282&mode=scale',
        movieLink: ''
    }]
}, {
    id: 2,
    sliderTitle: 'Action & Adventure',
    sliderMovieList: [{
        id: 1,
        movieName: 'Stranger Things',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_01_2020/qwokfcgiolef3km9owva93rywac19-01-2020_15g12-59.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 2,
        movieName: `The Queen's Gambit`,
        artworkLink: 'https://static.fptplay.net/static/img/share/video/26_06_2021/abd2uxiv1jxh8odcpovzlygri8s26-06-2021_11g33-45.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 3,
        movieName: 'Girl from Nowhere',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_08_2021/h8u0akgj52sqeekw4d56rwr2xlx19-08-2021_18g02-5719-08-2021_18g07-36.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 4,
        movieName: 'Sweet Home',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/19_08_2021/d7vvxps5tg14gyz2czzjoxmggvn19-08-2021_17g50-45.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 5,
        movieName: 'Sweet Tooth',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/10_12_2020/attack-on-titan-ss4-fpt-play-dai-chien-nguoi-khong-lo-phan-4-fpt-play-210-12-2020_15g31-47.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 6,
        movieName: 'Love, Death & Robots',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/04_09_2020/one-punch-man-season-2-fpt-play04-09-2020_01g05-08.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 7,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/14_05_2021/ixvawbxmypk4kzgzk5ggdgfiemx14-05-2021_20g36-12.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 8,
        movieName: 'Money Heist',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/23_02_2021/8vk5w80nasqmy544affdqzi3rrz23-02-2021_15g52-22.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 9,
        movieName: 'Breaking Bad',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/07_04_2021/gia-tien-tvod07-04-2021_10g52-51.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 10,
        movieName: 'The Umbrella Academy',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/24_04_2020/gia-tien-tvod24-04-2020_14g47-34.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 11,
        movieName: 'Godzilla: King of the Monsters',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/28_06_2021/pho-ma-duong-than-yeu-fpt-play-doc-quyen-poster1_28-06-2021_01g22-35.jpg?w=282&mode=scale',
        movieLink: ''
    }, {
        id: 12,
        movieName: 'Kingdom: Ashin of the North',
        artworkLink: 'https://static.fptplay.net/static/img/share/video/26_02_2020/poster-126-02-2020_18g55-10.jpg?w=282&mode=scale',
        movieLink: ''
    }]
}]

const MoviesPage = (props) => {
    //const [showed, setShowed] = useState(false)
    const history = useHistory();

    const [currentScrollY, setCurrentScrollY] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const dispatch = useDispatch()
    let dataTypes = useSelector((state) => state?.rootReducer.movieTypes)
  

    const onSelectGenreChange = (e) => {
        setSelectedGenre(e)
    }

    const handleMoreInfo = () => {
        history.push({
            pathname: props.match.url,
            search: `jbv=${'detailId'}`,
            state: { scrollY: currentScrollY }
        })


    }


    const handleScroll = useCallback(() => {
        setCurrentScrollY(window.scrollY)
    }, []);

    const convertDataSelect=()=>{
        dataTypes= dataTypes.map(function (obj) {  
            obj['value']= obj.id
            obj['label']= obj.t_name
            return obj;
        });
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [handleScroll]);
    useEffect(() => { 
        convertDataSelect()
        console.log(dataTypes);
        setSelectedGenre(dataTypes[1])
    }, [])
    return (
        <div id='moviesPage' >

            <div className="movie-page overflow-x-hidden bg-black"  >
                <div class="header-genre">
                    <div class="select-header">
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            value={selectedGenre}
                            isSearchable={false}
                            onChange={onSelectGenreChange}
                            options={dataTypes}
                            styles={{
                                singleValue: (base) => ({
                                    ...base,

                                    color: 'white',
                                }),
                                option: (base) => ({
                                    ...base,
                                    color: 'white',
                                }),
                            }}
                            theme={(theme) => ({
                                ...theme,
                                backgroundColor: 'black',

                                colors: {
                                    ...theme.colors,
                                    primary:'#e50914',
                                    primary25: 'gray',
                                    neutral0: 'black'
                                },
                            })}
                        />
                    </div>


                </div>
                {movieData.map(item => (<Slider id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList} handleMoreInfo={handleMoreInfo} />))}
                <Footer />
            </div>
        </div>
    );
};

export default MoviesPage;
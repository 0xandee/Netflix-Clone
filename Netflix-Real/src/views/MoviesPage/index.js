import React, { useRef, useState, useCallback, useEffect, createRef } from "react";
import './style.scss';
import { BigBanner, Slider, Footer, NavigationBar } from "../../components";
import { to_Decrypt, to_Encrypt } from "../../services/aes256";
import { useSelector, useDispatch } from 'react-redux';
import { showPopUpInfo } from "../../services/redux/actions";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { getMoviesByTypeAPI, getMovieType } from "../../services/api/movie";
import Select, { createFilter } from 'react-select';
import { Spinner } from 'reactstrap'
import DefaultImage from '../../assets/Images/defaultImage.png';


const MoviesPage = (props) => {
    const { idGenre } = useParams()
    const history = useHistory();
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [dataApiGenreMovies, setDataApiGenreMovies] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const dispatch = useDispatch()
    let dataTypes = useSelector((state) => state?.rootReducer.movieTypes)


    const onSelectGenreChange = (e) => {
        //constsetSelectedGenre(e)
        history.push({
            pathname: `/movies/${e.id.toString()}`,
            //search: `jbv=${'detailId'}`,
            state: { scrollY: currentScrollY }
        })
    }

    const itemClicked = (data) => () => {
        history.push({
            pathname: `/detail/${data.id.toString()}`,
            //search: `jbv=${data.id}`,
            state: { item: data }
        })
    }

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
        setIsFetching(true);
    }, []);

    function fetchMoreListItems() {

        setTimeout(() => {
            setGenreMovies(prevState => ([...prevState, ...dataApiGenreMovies.slice(prevState.length, prevState.length + 60)]));
            setIsFetching(false);
        }, 2000);
    }

    const OnErrorImage = (e) => {
        e.targets.src = DefaultImage
    }


    const convertDataSelect = () => {
        dataTypes = dataTypes.map(function (obj) {
            obj['value'] = obj.id
            obj['label'] = obj.t_name
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
        setSelectedGenre(dataTypes.find(item => item.value == idGenre))
    }, [idGenre, dataTypes])

    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
    }, [isFetching]);

    useEffect(() => {
        if (selectedGenre != null)
            getMoviesByTypeAPI(selectedGenre.value, async (res) => {
                console.log("🚀 ~ file: index.js ~ line 85 ~ getMoviesByTypeAPI ~ res", res)
                if (res.status == 200) {
                    setDataApiGenreMovies(res.data)
                    setGenreMovies(res.data.slice(0, 30))
                }
                else {
                    if (res.status == 400) {

                    }
                }
            });


    }, [selectedGenre])

    return (
        <div id='moviesPage' >
            <div className="movie-page overflow-x-hidden bg-black"  >
                <NavigationBar />
                <div class="header-genre bg-black">
                    <div class="select-header">
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            value={selectedGenre}
                            isSearchable={false}
                            onChange={onSelectGenreChange}
                            options={dataTypes}
                            filterOption={createFilter({ ignoreAccents: false })}
                            styles={{
                                singleValue: (base) => ({
                                    ...base,
                                    color: 'white',
                                }),
                                option: (base) => ({
                                    ...base,
                                    color: 'white',
                                }),
                                menuList: (base) => ({
                                    ...base,
                                    "::-webkit-scrollbar": {
                                        display: 'none'
                                    },
                                })

                            }}
                            theme={(theme) => ({
                                ...theme,
                                backgroundColor: 'black',

                                colors: {
                                    ...theme.colors,
                                    primary: '#e50914',
                                    primary25: 'gray',
                                    neutral0: 'black'
                                },
                            })}
                        />
                    </div>


                </div>
                <div className='body-content'>
                    <div className='list-grid'>
                        {genreMovies.map(item =>
                        (item.uri_avatar != null &&
                            <div className='grid-container' onClick={itemClicked(item)}>
                                <div className=' item-grid multi-landing-stack-space-holder w-100 h-100'>
                                    {/* <div className="multi-landing-stack-1"></div>
                                    <div className="multi-landing-stack-2"></div> */}
                                    <img onError={OnErrorImage} style={{ borderRadius: '4px', }} className="title-card w-100 h-100" src={item.uri_avatar != null ? item.uri_avatar : DefaultImage} alt={item.m_name} />
                                </div>
                                <div className='name-label'>
                                    {item.m_name}
                                </div>
                            </div>
                        )
                        )}

                    </div>
                    {isFetching &&
                        <div style={{ display: 'flex', marginBottom: '10px', width: '100%', justifyContent: 'center' }}>
                            <div class="spinner-border spinner-color" role="status">

                            </div>
                        </div>

                    }
                </div>

                <Footer />

            </div>
        </div>
    );
};

export default MoviesPage;
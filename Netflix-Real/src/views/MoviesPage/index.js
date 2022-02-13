import React, { useRef, useState, useCallback, useEffect, createRef } from "react";
import './style.scss';
import { Slider, Footer, NavigationBar, CustomModal } from "../../components";
import { to_Decrypt, to_Encrypt } from "../../services/aes256";
import { useSelector, useDispatch } from 'react-redux';
import { setMovieTypes, showPopUpInfo } from "../../services/redux/actions";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { getMoviesByGenreAPI, getMoviesByTypeAPI, getMovieType, getMovieTypeAPI } from "../../services/api/movie";
import Select, { createFilter } from 'react-select';
import { Spinner } from 'reactstrap'
import DefaultImage from '../../assets/Images/defaultImage.png';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { getToken } from "../../services/function";
import { IconNetflix } from "../../assets/Icon";


const MoviesPage = (props) => {
    const { idGenre } = useParams()
    const history = useHistory();
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [dataApiGenreMovies, setDataApiGenreMovies] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [open, setOpen] = useState(false);
    let dataTypes = useSelector((state) => state?.rootReducer.movieTypes)
    const dispatch = useDispatch();

    const toggleModal = () => {
        localStorage.clear()
        // delete_cookie('username')
        // delete_cookie('id_user')
        // delete_cookie('access_token')
        history.push('/signin')
    };

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

    const fetchMoreListItems = () => {

        setTimeout(() => {
            setGenreMovies(prevState => ([...prevState, ...dataApiGenreMovies.slice(prevState.length, prevState.length + 60)]));
            setIsFetching(false);
        }, 2000);
    }


    const convertDataSelect = () => {
        dataTypes = dataTypes.map(function (obj) {
            obj['value'] = obj.id
            obj['label'] = obj.name
            return obj;
        });
    }
    useEffect(async () => {
        try {
            const response = await getMovieTypeAPI(getToken())
            if (response.status === 200 && dataTypes.length == 0) {
                const data = await response.json()
                dispatch(setMovieTypes(data))
            }
            else if (response.status === 500) {
                history.push('/maintenance')
            }
            else {
                if (response.status == 403) {
                    setOpen(true)
                }
            }
        }
        catch (err) {
            console.log("🚀 ~ file: index.js ~ line 92 ~ useEffect ~ err", err)
            // history.push('/maintenance')
        }


    }, [dispatch])

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

    useEffect(async () => {
        if (selectedGenre != null) {
            try {
                const res = await getMoviesByGenreAPI(selectedGenre.value, getToken())
                if (res.status == 200) {
                    let data = await res.data
                    setDataApiGenreMovies(data)
                    setGenreMovies(data.slice(0, 31))
                }
                else if (res.status === 500) {
                    history.push('/maintenance')
                }
                else {
                    if (res.status == 403) {
                        setOpen(true)
                    }
                }
            }
            catch {
                //  history.push('/maintenance')
            }
        }
    }, [selectedGenre])

    return (
        <div id='moviesPage' >
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}>
                {/* <div class="spinner-border  text-danger" style={{ height: '10vh', width: '10vh', borderWidth: '15px' }} role="status" /> */}
                <div class="text-danger" style={{ height: '20vh', width: '10vh', borderWidth: '15px', fill:'red' }} role="status" >
                    <IconNetflix/>
                </div>

            </div>
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
                            <div className='grid-container w-100 h-100' onClick={itemClicked(item)}>
                                <div className=' item-grid multi-landing-stack-space-holder w-100 h-100'>
                                    {/* <div className="multi-landing-stack-1"></div>
                                    <div className="multi-landing-stack-2"></div> */}
                                    <img onError={
                                        (e) => e.currentTarget.src = DefaultImage
                                    } style={{ borderRadius: '4px', }} className="title-card w-100 h-100" src={item.uri_avatar} alt={item.m_name} />
                                </div>
                                <div className='name-label'>
                                    {item.name}
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
                <CustomModal isOpen={open} onClick={toggleModal} headerText={"Session Timed out"} buttonText='Back to log in page' bodyText=
                    {"Look like your log in session have been timed out. So please log in again.\nWe are so sorry for this inconvenience"
                    } />
                <Footer />

            </div>
        </div>
    );
};

export default MoviesPage;
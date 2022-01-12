import React, { useRef, useState, useCallback, useEffect, createRef } from "react";
import './style.scss';
import { Slider, Footer, NavigationBar, CustomModal } from "../../components";
import { to_Decrypt, to_Encrypt } from "../../services/aes256";
import { useSelector, useDispatch } from 'react-redux';
import { setMovieTypes, showPopUpInfo } from "../../services/redux/actions";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { getMoviesByGenreAPI, getMoviesByListID, getMoviesByTypeAPI, getMovieType, getMovieTypeAPI, getRecommUserMoviesState1 } from "../../services/api/movie";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { getToken } from "../../services/function";


const PopularPage = (props) => {
    const { idGenre } = useParams()
    const history = useHistory();
    const [isStart, setIsStart] = useState(true);
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
            setGenreMovies(prevState => ([...prevState, ...dataApiGenreMovies.slice(prevState.length, prevState.length + 30)]));
            setIsFetching(false);
        }, 2000);
    }

    useEffect(async () => {
        try {
            const response = await getMovieTypeAPI(getToken())
            if (response.status === 200 && dataTypes.length == 0) {
                const data = await response.json()
                dispatch(setMovieTypes(data))
            }
            else if (response.status == 403) {
                setOpen(true)
            }
            else if (response.status == 500) {
                history.push('/maintenance')
            }
        }
        catch (e) {
            history.push('/maintenance')

        }


    }, [dispatch])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [handleScroll]);


    useEffect(() => {
        if (!isFetching) return;
        fetchMoreListItems();
    }, [isFetching]);

    useEffect(async () => {
        try {
            const response = await getRecommUserMoviesState1(localStorage.getItem('id_user'))

            if (response.status === 200) {
                const data = await response.json()
                const res = await getMoviesByListID(data.map((key) => key.id))
                const data2 = await res.json()
                setDataApiGenreMovies(data2)
                setGenreMovies(data2.slice(0, 31))
                setIsStart(false)

            }
            else if (response.status == 403) {
                setOpen(true)
            }
            else if (response.status === 500) {
                history.push('/maintenance')
            }
        }
        catch {
            history.push('/maintenance')
        }
    }, [])

    return (
        <div id='popularPage' >
            <div className="popular-page overflow-x-hidden bg-black"  >
                <NavigationBar />
                <div class="header-genre bg-black">
                    <div class="select-header text-light">
                        Recommended movies for you
                    </div>
                </div>

                <div className='body-content'>
                    {isStart ?
                        <div style={{ display: 'flex', marginBottom: '10px', width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span className='text-light mb-3' style={{ fontSize: '24px' }}>
                                Personalizing for You
                            </span>
                            <div class="spinner-border" role="status" style={{ height: '5vh', width: '5vh', color: '#e50914' }} />
                        </div>

                        :
                        <div>
                            <div className='list-grid'>
                                {genreMovies.map(item =>
                                (item != null && item.uri_avatar != null &&
                                    <div className='grid-container' onClick={itemClicked(item)}>
                                        <div className=' item-grid multi-landing-stack-space-holder w-100 h-100'>
                                            {/* <div className="multi-landing-stack-1"></div>
                                    <div className="multi-landing-stack-2"></div> */}
                                            <LazyLoadImage effect="blur" style={{ borderRadius: '4px', }} className="title-card w-100 h-100" src={item.uri_avatar} alt={item.m_name} />
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

export default PopularPage;
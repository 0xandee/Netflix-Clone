import React, { useRef, useState, useCallback, useEffect, createRef } from "react";
import './style.scss';
import { Slider, Footer, NavigationBar } from "../../components";
import { to_Decrypt, to_Encrypt } from "../../services/aes256";
import { useSelector, useDispatch } from 'react-redux';
import { showPopUpInfo } from "../../services/redux/actions";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { getMoviesByTypeAPI, getMovieType } from "../../services/api/movie";
import Select, { createFilter } from 'react-select';
import { Spinner } from 'reactstrap'
import { searchMovieByNameApi } from "../../services/api/search";

import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const SearchPage = (props) => {
    const query = new URLSearchParams(useLocation().search)
    const history = useHistory();
    const [dataApiMovies, setDataApiMovies] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const dispatch = useDispatch()

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
            setGenreMovies(prevState => ([...prevState, ...dataApiMovies.slice(prevState.length, prevState.length + 60)]));
            setIsFetching(false);
        }, 2000);
    }




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

        if (query.get('value') != null) {
            try {
                const res = await searchMovieByNameApi(query.get('value'), read_cookie('access_token'))
                if (res.status == 200) {
                    let data = await res.json()
                    setDataApiMovies(data)
                    setGenreMovies(data.slice(0, 30))
                }
                else if (res.status === 500) {
                    history.push('/maintenance')
                }
            }
            catch {
                history.push('/maintenance')
            }
        }

    }, [])

    return (
        <div id='searchPage' >
            <div className="search-page overflow-x-hidden bg-black"  >
                <NavigationBar />
                <div class="header-genre bg-black">
                    <div class="select-header">
                        Results with "{query.get('value')}"
                    </div>
                </div>
                <div className='body-content'>
                    <div className='list-grid'>
                        {genreMovies.length > 0 ? genreMovies.map(item =>
                            <div className='grid-container' onClick={itemClicked(item)}>
                                <div className=' item-grid multi-landing-stack-space-holder w-100 h-100'>
                                    {/* <div className="multi-landing-stack-1"></div>
                                    <div className="multi-landing-stack-2"></div> */}
                                    <img style={{ borderRadius: '4px', }} className="title-card w-100 h-100" src={item.uri_avatar} alt={item.m_name} />
                                </div>
                                <div className='name-label'>
                                    {item.m_name}
                                </div>
                            </div>
                        )
                            :
                            <div style={{ color: 'white', fontWeight: "bold", fontSize: '24px' }} >No results found</div>
                        }

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

export default SearchPage;
import React, { useState, useCallback, useEffect } from "react";
import './style.scss';
import { Footer, NavigationBar } from "../../components";

import {  useHistory, useLocation} from "react-router-dom";

import { searchMovieByNameApi } from "../../services/api/search";

import DefaultImage from '../../assets/Images/defaultImage.png';

const SearchPage = (props) => {
    const query = new URLSearchParams(useLocation().search)
    const history = useHistory();
    const [dataApiMovies, setDataApiMovies] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const itemClicked = (data) => () => {

        history.push({
            pathname: `/detail/${data.id.toString()}`,
           
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

    useEffect(() => {
        if (query.get('value') != null) {
            async function fetchData() {
                // You can await here
                try {
                    const res = await searchMovieByNameApi(query.get('value'))
                    if (res.status === 200) {
                        let data = await res.data
                        setDataApiMovies(data)
                        setGenreMovies(data.slice(0, 30))
                    }
                    else if (res.status === 500) {
                        history.push('/maintenance')
                    }
                }
                catch (err) {
                   
                }
            }
            fetchData();

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
                            <div className='grid-container w-100 h-100' onClick={itemClicked(item)}>
                                <div className=' item-grid multi-landing-stack-space-holder w-100 h-100'>
                                    {/* <div className="multi-landing-stack-1"></div>
                                    <div className="multi-landing-stack-2"></div> */}
                                    <img onError={
                                        (e) => e.currentTarget.src = DefaultImage
                                    } style={{ borderRadius: '4px', }} className="title-card w-100 h-100" src={item.uri_avatar} alt={item.m_name} />
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
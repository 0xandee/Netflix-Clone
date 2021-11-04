import React, { useRef, useState, useCallback, useEffect, createRef } from "react";
import './style.scss';
import { BigBanner, Slider, Footer } from "../../components";
import { to_Decrypt, to_Encrypt } from "../../services/aes256";
import { useSelector, useDispatch } from 'react-redux';
import { showPopUpInfo } from "../../services/redux/actions";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { getMoviesByTypeAPI, getMovieType } from "../../services/api/movie";
import Select, { createFilter } from 'react-select';
import { Spinner } from 'reactstrap'
import { searchMovieByNameApi } from "../../services/api/search";


const SearchPage = (props) => {
    const location = useLocation()
    const { idGenre } = useParams()
    const query = new URLSearchParams(useLocation().search)
    const history = useHistory();
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const [dataApiMovies, setDataApiMovies] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const dispatch = useDispatch()

    const itemClicked = (data) => () => {

        history.push({
            pathname: `/detail/${to_Encrypt(data.id.toString())}`,
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

    useEffect(() => {
        if (query.get('value') != null)
            searchMovieByNameApi(query.get('value'), async (res) => {
                console.log("🚀 ~ file: index.js ~ line 85 ~ getMoviesByTypeAPI ~ res", res)
                if (res.status == 200) {
                    setDataApiMovies(res.data)
                    setGenreMovies(res.data.slice(0, 30))
                }
                else {
                    if (res.status == 400) {

                    }
                }
            });


    }, [query])

    return (
        <div id='searchPage' >
            <div className="search-page overflow-x-hidden bg-black"  >
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
                            <div style={{ color: 'white', fontWeight: "bold", fontSize: '24px' }} >You don't have any movie in your playlist yet</div>
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
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
import { requestRefreshToken } from "../../services/api/auth";
import { getUserFavoriteList } from "../../services/api/user";


const MyPlaylistPage = (props) => {
    const location = useLocation()
    const { idGenre } = useParams()
    const query = new URLSearchParams(useLocation().search)
    const history = useHistory();
    const [currentScrollY, setCurrentScrollY] = useState(0);
    const [dataApiMovies, setDataApiMovies] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const access_token = localStorage.getItem("access_token")
    const refresh_token = localStorage.getItem("refresh_token")


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

        getUserFavoriteList(access_token, async (res) => {
            console.log("🚀 ~ file: index.js ~ line 85 ~ getUserFavoriteList ~ res", res)
            if (res.status == 200) {
                setDataApiMovies(res.data)
                setGenreMovies(res.data.slice(0, 30))
            }
            else {
                if (res.status == 403) {
                    
                    requestRefreshToken(refresh_token, async (res) => {
                        console.log("🚀 ~ file: index.js ~ line 84 ~ requestRefreshToken ~ res", res)
                        if(res.status == 200)
                        {
                            localStorage.setItem("access_token", res.data.access_token);                       
                        }
                      
                    })


                }
            }
        });


    }, [access_token])

    return (
        <div id='myPlaylistPage' >
            <div className="myplaylist-page overflow-x-hidden bg-black"  >
                <div className='body-content'>
                    {genreMovies.length > 0 ?
                        <div className='list-grid'>
                            {genreMovies.map(item =>
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
                            }
                        </div>
                        :
                        <div style={{ color: 'white', fontWeight: "bold", fontSize: '24px' }} >You don't have any movie in your playlist yet</div>
                    }
                    {isFetching && genreMovies.length > 0 &&
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

export default MyPlaylistPage;
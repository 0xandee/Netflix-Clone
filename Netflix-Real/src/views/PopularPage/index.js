import React, {  useState, useCallback, useEffect } from "react";
import './style.scss';
import { Footer, NavigationBar, CustomModal } from "../../components";
import { useSelector, useDispatch } from 'react-redux';
import { setMovieTypes } from "../../services/redux/actions";
import {  useHistory } from "react-router-dom";
import {  getMoviesByListID,  getMovieTypeAPI, getRecommUserMoviesState1 } from "../../services/api/movie";
import { getToken } from "../../services/function";
import DefaultImage from '../../assets/Images/defaultImage.png';


const PopularPage = (props) => {
    const history = useHistory();
    const [isStart, setIsStart] = useState(true);
    const [dataApiGenreMovies, setDataApiGenreMovies] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [open, setOpen] = useState(false);

    const toggleModal = () => {
        localStorage.clear()
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
        async function fetchData() {
            // You can await here
            try {
                const response = await getRecommUserMoviesState1(localStorage.getItem('id_user'))

                if (response.status === 200) {
                    const data = await response.json()
                    const res = await getMoviesByListID(data.map((key) => key.id))
                    const data2 = await res.data
                    setDataApiGenreMovies(data2)
                    setGenreMovies(data2.slice(0, 31))
                    setIsStart(false)

                }
                else if (response.status === 403) {
                    setOpen(true)
                }
                else if (response.status === 500) {
                    history.push('/maintenance')
                }
            }
            catch (error) {
                //history.push('/maintenance')
            }
        }
        fetchData();

    }, [])

    return (
        <div id='popularPage' >
            <div className="popular-page overflow-x-hidden bg-black"  >
                <NavigationBar />
                <div className="header-genre bg-black">
                    <div className="select-header text-light">
                        Recommended movies for you
                    </div>
                </div>

                <div className='body-content'>
                    {isStart ?
                        <div style={{ display: 'flex', marginBottom: '10px', width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span className='text-light mb-3' style={{ fontSize: '24px' }}>
                                Personalizing for You
                            </span>
                            <div className="spinner-border" role="status" style={{ height: '5vh', width: '5vh', color: '#e50914' }} />
                        </div>

                        :
                        <div>
                            <div className='list-grid'>
                                {genreMovies.map(item =>
                                (item != null && item.uri_avatar != null &&
                                    <div key={item.id} className='grid-container w-100 h-100' onClick={itemClicked(item)}>
                                        <div className=' item-grid multi-landing-stack-space-holder w-100 h-100'>                                     
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
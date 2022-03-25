import React, { useState, useCallback, useEffect } from "react";
import './style.scss';
import { CustomModal, Footer, NavigationBar } from "../../components";
import { useHistory } from "react-router-dom";
import DefaultImage from '../../assets/Images/defaultImage.png';
import { getUserFavoriteList } from "../../services/api/user";
import { getToken } from "../../services/function";


const MyPlaylistPage = (props) => {
    const history = useHistory();
    const [dataApiMovies, setDataApiMovies] = useState([]);
    const [genreMovies, setGenreMovies] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [accessToken, setAccessToken] = useState(getToken())
    const [open, setOpen] = useState(false);

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
        async function fetchData() {
            // You can await here
            try {
                const res = await getUserFavoriteList(accessToken)
                if (res.status === 200) {
                    let data = await res.json()
                    setDataApiMovies(data)
                    setGenreMovies(data.slice(0, 30))
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
                history.push('/maintenance')
            }
        }
        fetchData();

    }, [accessToken])

    return (
        <div id='myPlaylistPage' >
            <div className="myplaylist-page overflow-x-hidden bg-black"  >
                <NavigationBar />
                <div className='body-content'>
                    {genreMovies.length > 0 ?
                        <div className='list-grid'>
                            {genreMovies.map(item =>
                                <div className='grid-container w-100 h-100' onClick={itemClicked(item)}>
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
                <CustomModal isOpen={open} onClick={toggleModal} headerText={"Session Timed out"} buttonText='Back to log in page' bodyText=
                    {"Look like your log in session have been timed out. So please log in again.\nWe are so sorry for this inconvenience"
                    } />
                <Footer />

            </div>
        </div>
    );
};

export default MyPlaylistPage;
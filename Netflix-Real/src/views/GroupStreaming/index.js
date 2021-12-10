import React, { createRef, useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { SliderStreaming } from "../../components";
import { Row, Col, Container } from 'reactstrap'
import './style.scss';
import VideoPlayer from "../VideoPlayer";
import { IconChevronLeft, IconChevronRight } from "../../assets/Icon";
import AppChat from "../../components/Chat";
import Chat from "../../components/Chat";
import io from "socket.io-client";
import * as Icon from 'react-feather';
import $ from "jquery"
import { getAllMovies } from "../../services/api/movie";

// const socket = io("http://localhost:8000", { transports: ['websocket']});

// This sets the room number on the client
// var username = Math.random().toString(36).substr(2, 12);
// var roomnum = Math.random().toString(36).substr(2, 12);
import { socket } from "../../services/socket/socket"


const GroupStreaming = () => {
  const random = "Andy" + Math.random().toString(36).substr(2, 5);
  const [username, setusername] = useState(random);
  const [roomnum, setroomnum] = useState("26");
  const [openedChatBox, setOpenedChatBox] = useState(false);
  const [dataApiGenreMovies, setDataApiGenreMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showedMovies, setShowedMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const textInput = React.createRef(null);
  const [searchText, setSearchText] = useState('');
  const [openedMovieRecommend, setOpenedMovieRecommend] = useState(true);
  const [movieURL, setMovieURL] = useState('')
  const [isHost, setIsHost] = useState(false);

  const onValueSearchChange = (e) => {
    const value = e.target.value
    let updatedData = []
    setSearchText(value)
    if (value.length) {
      updatedData = movies.filter(item => {
        const startsWith =
          (item.name != null && item.name.toLowerCase().startsWith(value.toLowerCase()))

        const includes =
          (item.m_name != null && item.name.toLowerCase().includes(value.toLowerCase()))
        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredMovies(updatedData)
      setShowedMovies(updatedData.slice(0, 31))
      setSearchText(value)
    }
    else {
      setShowedMovies(movies.slice(0, 31))
    }
  }

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop !== e.target.clientHeight || isFetching) return;
    setIsFetching(true);
  };

  const fetchMoreListItems = () => {
    setTimeout(() => {
      if (searchText.length > 0) {
        setShowedMovies(prevState => ([...prevState, ...filteredMovies.slice(prevState.length, prevState.length + 60)]));
      }
      else {
        setShowedMovies(prevState => ([...prevState, ...movies.slice(prevState.length, prevState.length + 60)]));
      }
      setIsFetching(false);
    }, 2000);
  }

  const handleOpenChatBox = () => {

    setOpenedChatBox(!openedChatBox)
  }

  const handleOpenMovieRecommend = () => {
    setOpenedMovieRecommend(!openedMovieRecommend)
    console.log("openedMovieRecommend", openedMovieRecommend);
  }

  const handleMovieUrlClick = (data) => () => {
    // setMovieURL(data);
    setMovieURL('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    let movieURL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    socket.emit('set movie', { username, roomnum, movieURL });
    handleOpenMovieRecommend(true)
  }

  const onBlurSearchInput = () => {
    textInput.current.blur()
    setIsShown(false)
  }


  const btnSearchClicked = () => {
    if (!isShown) {
      textInput.current.focus()
    }
    setIsShown(!isShown)
  }


  useEffect(async () => {
    const response = await getAllMovies(localStorage.getItem('access_token'))
    let data = await response.json()
    setMovies(data)
    setShowedMovies(data.slice(0, 31))
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);


  useEffect(() => {
    // Join room
    socket.emit("joinRoom", { username, roomnum });
    socket.emit('new room', { username, roomnum });

    socket.on('isHost', function (data) {
      
      if (!data.isHost) {
        handleOpenMovieRecommend(data.isHost)
        setIsHost(data.isHost)
      }
    })

  }, []);
  return (
    <div id='groupStreaming'>
      <div className='position-relative group-streaming h-100 w-100 ' >
        <div className='group-player position-relative '>
          <div className={`icon-chevron--right ${openedChatBox && 'active'}`} onClick={handleOpenChatBox}>
            {!openedChatBox ?
              <IconChevronRight />
              :
              <IconChevronLeft />
            }
          </div>
          <div className=" position-absolute" style={{ top: '0', right: '0', zIndex: '5' }} >

            <div className={`search-box ${isShown && 'input-search'}`} style={{ marginRight: "4rem" }}>
              <div>
                <Icon.Search className='icon-style' size='16px' strokeWidth='4' color='white' onClick={btnSearchClicked} style={{ cursor: 'pointer', marginRight: "1rem" }} />
              </div>
              <React.Fragment>
                <input
                  onBlur={onBlurSearchInput}
                  ref={textInput} value={searchText}
                  type={'text'}
                  name="search"
                  placeholder="Search.."
                  onChange={onValueSearchChange} >
                </input>
              </React.Fragment>
            </div>
          </div>
          {/* {!movieURL.length && !isHost ?
            <div>
              Host is choosing movie. So please wait
            </div>
            : */}
            <VideoPlayer socket={socket} roomnum={roomnum} movieURL={movieURL} />
          
          <div id="movieRecommend" onScroll={handleScroll}
            className={`${openedMovieRecommend ? '' : 'd-none'}`}
            style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#242526', zIndex: 3, overflowX: 'auto', paddingTop: '40px' }}>
            <div className='body-content'>
              <div className='list-grid'>
                {searchText.length && !filteredMovies.length ?
                  <div style={{ color: 'white', fontWeight: "bold", fontSize: '24px' }} >No results found</div>
                  :
                  showedMovies.map(item =>
                  (item.uri_avatar != null &&
                    <div className='grid-container' onClick={handleMovieUrlClick(item)}>
                      <div className=' item-grid multi-landing-stack-space-holder w-100 h-100'>
                        {/* <div className="multi-landing-stack-1"></div>
                                      <div className="multi-landing-stack-2"></div> */}
                        <img style={{ borderRadius: '4px', }} className="title-card w-100 h-100" src={item.uri_avatar} alt={item.m_name} />
                      </div>
                      <div className='name-label'>
                        {item.name}
                      </div>
                    </div>
                  )
                  )
                }

              </div>
              {isFetching &&
                <div style={{ display: 'flex', marginBottom: '10px', width: '100%', justifyContent: 'center' }}>
                  <div class="spinner-border spinner-color" role="status">

                  </div>
                </div>

              }
            </div>
          </div>

        </div>

        <div className={`group-chat-box ${!openedChatBox && 'active'}`} >

          <Chat
            username={username}
            roomnum={roomnum}
            socket={socket}
            handleOpenMovieRecommend={handleOpenMovieRecommend}

          />
        </div>


      </div>

    </div>
  )
}

export default GroupStreaming;
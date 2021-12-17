import React, { createRef, useCallback, useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { CustomModal } from "../../components";
import { Row, Col, Container } from 'reactstrap'
import './style.scss';
import VideoPlayer from "../VideoPlayer";
import { IconChevronLeft, IconChevronRight } from "../../assets/Icon";
import AppChat from "../../components/Chat";
import Chat from "../../components/Chat";
import io from "socket.io-client";
import * as Icon from 'react-feather';
import { getAllMovies } from "../../services/api/movie";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

//  const socket = io("http://localhost:8000", { transports: ['websocket']});

// This sets the room number on the client
// var username = Math.random().toString(36).substr(2, 12);
// var roomnum = Math.random().toString(36).substr(2, 12);
// import { socket } from "../../services/socket/socket"


const GroupStreaming = () => {
  // Choose whenever JOIN room or CREATE new room
  let { idgroup } = useParams();
  let tempRoom = null;
  let currentUsername = read_cookie('username');
  if (idgroup != currentUsername) {
    // JOIN
    tempRoom = idgroup;
  }
  else {
    // CREATE
    tempRoom = currentUsername;
  }

  const [username, setusername] = useState(currentUsername);
  const [roomnum, setroomnum] = useState(tempRoom);
  const [socket, setSocket] = useState(null);

  const history = useHistory()
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
  const [open, setOpen] = useState(false);
  const [hostModal, setHostModal] = useState(false);
  const toggleModal = () => {
    history.push('/home')
  };

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

  useEffect(() => {

  }, [setSocket]);

  useEffect(async () => {
    const response = await getAllMovies(read_cookie('access_token'))
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
    const newSocket = io("http://localhost:8000", { transports: ['websocket'] });
    setSocket(newSocket);
    if (newSocket) {
      if (username != roomnum)
        newSocket.emit("joinRoom", { username, roomnum });
      newSocket.emit('new room', { username, roomnum });
    }

    return () => {
      console.log('disconnect')
      newSocket.close()
    }
  }, [setSocket]);

  useEffect(() => {
    if (socket != undefined) {
      socket.on("hostDisconnect", () => {
        setOpen(true)
        setOpenedMovieRecommend(false)
      })
    }
  }, [socket])

  useEffect(() => {
    if (socket != undefined) {
      socket.on("hostAgain", () => {
        setHostModal(true)
        setOpenedMovieRecommend(false)
      })
    }
  }, [socket])
  return (
    <div id='groupStreaming'>
      {socket &&
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

              <div className={`search-box ${isShown && 'input-search'} ${openedMovieRecommend ? '' : 'd-none'}`} style={{ marginRight: "4rem" }}>
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

          <CustomModal isOpen={open} onClick={toggleModal} headerText={"Host disconnected"} buttonText='Back to home page' bodyText=
            {"Look like host is disconnect.\n So please press below button to back to home page."
            } />
          <CustomModal isOpen={hostModal} onClick={toggleModal} headerText={"Host connect second time"} buttonText='Back to home page' bodyText=
            {"Sorry but you can only have one room active at a time.\n So please close this page or press below button to back to home page."
            } />
        </div>
      }
    </div>
  )
}

export default GroupStreaming;
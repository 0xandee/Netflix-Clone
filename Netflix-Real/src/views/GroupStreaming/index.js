import React, { createRef, useCallback, useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { CustomModal } from "../../components";
import { Row, Col, Container, Button, Tooltip } from 'reactstrap'
import './style.scss';
import VideoPlayer from "../VideoPlayer";
import { IconChevronLeft, IconChevronRight } from "../../assets/Icon";
import AppChat from "../../components/Chat";
import Chat from "../../components/Chat";
import io from "socket.io-client";
import * as Icon from 'react-feather';
import { getAllMovies, getMoviesByListID, getRecommGroupMoviesState1 } from "../../services/api/movie";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { getToken } from "../../services/function";

//  const socket = io("http://localhost:8000", { transports: ['websocket']});

// This sets the room number on the client
// var username = Math.random().toString(36).substr(2, 12);
// var roomnum = Math.random().toString(36).substr(2, 12);
// import { socket } from "../../services/socket/socket"


const GroupStreaming = () => {
  // Choose whenever JOIN room or CREATE new room
  let { idgroup } = useParams();
  let tempRoom = null;
  let currentUsername = localStorage.getItem('username');
  if (idgroup != currentUsername) {
    // JOIN
    tempRoom = idgroup;
  }
  else {
    // CREATE
    tempRoom = currentUsername;
  }
  const [username, setusername] = useState(currentUsername);
  const [userid, setuserid] = useState(localStorage.getItem('id_user'));
  const [roomnum, setroomnum] = useState(tempRoom);
  const [socket, setSocket] = useState(null);

  // const [username, setusername] = useState(Math.random().toString(36).substr(2, 12));
  // const [userid, setuserid] = useState(Math.random());
  // const [roomnum, setroomnum] = useState(tempRoom);
  // const [socket, setSocket] = useState(null);

  const history = useHistory()
  const [openedChatBox, setOpenedChatBox] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
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
  const [isHost, setIsHost] = useState(false);
  const [isFetchingApi, setIsFetchingApi] = useState(false);
  const [members, setMembers] = useState([localStorage.getItem('id_user')]);
  const [btnRefresh, setBtnRefresh] = useState(false);

  const toggleRefresh = () => setBtnRefresh(!btnRefresh);
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
      setShowedMovies(recommendedMovies.slice(0, 31))
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
        setShowedMovies(prevState => ([...prevState, ...recommendedMovies.slice(prevState.length, prevState.length + 60)]));
      }
      setIsFetching(false);
    }, 2000);
  }

  const handleOpenChatBox = () => {
    setOpenedChatBox(!openedChatBox)
  }

  const handleOpenMovieRecommend = useCallback((data) => {
    if (data == true || data == false)
      setOpenedMovieRecommend(data)
    else
      if (movieURL.length) {
        setOpenedMovieRecommend(!openedMovieRecommend)
      }

  }, [movieURL, openedMovieRecommend])

  const handleMovieUrlClick = (data) => () => {
    // setMovieURL(data);
    if (isHost) {
      setMovieURL('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
      let movieURL = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      socket.emit('set movie', { username, roomnum, movieURL });
      handleOpenMovieRecommend(false)
    }

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

  const handleRefreshButton = async () => {
    try {
      setIsFetchingApi(true)
      // const res = await getRecommGroupMoviesState1(members.join("&id="))
      // console.log("🚀 ~ file: index.js ~ line 156 ~ handleRefreshButton ~ res", res)
      // if (res.status === 200) {
      //   let dataRecommend = await res.json()
      //   const temp = await getMoviesByListID(dataRecommend.map((key) => key.id), getToken())
      //   let data2 = await temp.json()
      //   console.log("🚀 ~ file: index.js ~ line 196 ~ useEffect ~ data2")
      //   setRecommendedMovies(data2)
      //   setShowedMovies(data2.slice(0, 31))
      //   setIsFetchingApi(false)
      // }

      // else {
        if (!movies.length) {
          const response = await getAllMovies(getToken())
          console.log("🚀 ~ file: index.js ~ line 171 ~ handleRefreshButton ~ response", response)
          if (response.status === 200) {
            let data = await response.json()
            setMovies(data)
            setShowedMovies(data.slice(0, 31))
          }
          else if (response.status == 500) {
            history.push('/maintenance')
          }
        }
        setIsFetchingApi(false)
      // }

    }
    catch {
      history.push('/maintenance')
    }
  }

  useEffect(() => {
    // Join room
    const newSocket = io("http://localhost:8000", { transports: ['websocket'] });
    setSocket(newSocket);
    if (newSocket) {
      newSocket.emit("joinRoom", { username, roomnum });
      newSocket.emit('new room', { username, roomnum, userid });
    }

    return () => {
      newSocket.close()
    }
  }, [setSocket]);

  useEffect(() => {
    if (socket != undefined) {
      socket.on("hostDisconnect", () => {
        setOpen(true)
        setOpenedMovieRecommend(false)
      })
      socket.on('isHost', function (data) {
        console.log("🚀 ~ file: index.js ~ line 197 ~ data", data)
        setIsHost(data.isHost)
      })

      socket.on('getData', function (data) {
        console.log("🚀 ~ file: index.js ~ line 200 ~ data", data)
        setMembers(data)
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

  useEffect(() => {
    handleRefreshButton()
  }, []);


  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);


  return (
    <div id='groupStreaming'>
      {socket &&
        <div className='position-relative group-streaming h-100 w-100 ' >
          {isFetchingApi &&
            <div className='position-absolute bg-dark' style={{
              display: 'flex',
              height: '100vh',
              width: '80vw',
              justifyContent: 'center', flexDirection: 'column', alignItems: 'center'
              , zIndex: '6'
            }}>
              <span className='text-light mb-3' style={{ fontSize: '24px' }}>
                Personalizing for Your Group
              </span>
              <div class="spinner-border" role="status" style={{ height: '5vh', width: '5vh', color: '#e50914' }} />
            </div>

          }
          <div className='group-player position-relative '>
            <div className={`icon-chevron--right ${openedChatBox && 'active'}`} onClick={handleOpenChatBox}>
              {!openedChatBox ?
                <IconChevronRight />
                :
                <IconChevronLeft />
              }
            </div>



            <VideoPlayer socket={socket} roomnum={roomnum} movieURL={movieURL} handleOpenMovieRecommend={handleOpenMovieRecommend} />

            <div id="movieRecommend" onScroll={handleScroll}
              className={`${openedMovieRecommend ? '' : 'd-none'}`}
              style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#242526', zIndex: 3, overflowX: 'auto', paddingTop: '40px' }}>
              <div className=" position-absolute d-flex justify-content-end" style={{ top: '0', zIndex: '5', width: '100%', backgroundColor: '#242526' }} >
                <div className={`search-box ${isShown && 'input-search'} ${openedMovieRecommend ? '' : 'd-none'}`} style={{ marginRight: "7rem" }}>
                  <div >
                    <Button
                      disabled={members.length < 2}
                      id='btnRefresh'
                      style={{ marginRight: "1rem", fontSize: "1rem", fontWeight: "bold", paddingRight: "0.5rem", float: "right", borderRadius: "8px", backgroundColor: "rgb(183, 7, 16)", padding: "12px 12px", border: "none", color: 'white' }}
                      onClick={handleRefreshButton}>
                      Refresh
                    </Button>
                    <Tooltip placement="bottom" isOpen={btnRefresh} target="btnRefresh" toggle={toggleRefresh}>
                      Refresh list movies base on group members
                    </Tooltip>
                  </div>
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
              isHost={isHost}
              handleOpenMovieRecommend={handleOpenMovieRecommend}
            />
          </div>

          <CustomModal isOpen={open} onClick={toggleModal} headerText={"Host disconnected"} buttonText='Back to home page' bodyText=
            {"Look like host is disconnect.\n So please press below button to back to home page."
            } />
          <CustomModal isOpen={hostModal} onClick={toggleModal} headerText={"Host enter room"} buttonText='Back to home page' bodyText=
            {"Sorry but you can only create one room at a time.\n So please close this page or press below button to back to home page."
            } />

        </div>

      }
    </div>
  )
}

export default GroupStreaming;
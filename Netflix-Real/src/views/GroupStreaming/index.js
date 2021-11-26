import React, { createRef, useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { MoreLikeThis, Slider } from "../../components";
import { Row, Col, Container } from 'reactstrap'
import './style.scss';
import VideoPlayer from "../VideoPlayer";
import { IconChevronLeft, IconChevronRight } from "../../assets/Icon";
import AppChat from "../../components/Chat";
import Chat from "../../components/Chat";
import io from "socket.io-client";

import { getMoviesByTypeAPI } from "../../services/api/movie";

// const socket = io("http://localhost:8000", { transports: ['websocket']});

// This sets the room number on the client
// var username = Math.random().toString(36).substr(2, 12);
// var roomnum = Math.random().toString(36).substr(2, 12);
import {socket} from "../../services/socket/socket"

const GroupStreaming = () => {
  const [username, setusername] = useState("Andy - " + Math.random().toString(36).substr(2, 5));
  const [roomnum, setroomnum] = useState("22");
  const [openedChatBox, setOpenedChatBox] = useState(false);

  const [openedMovieRecommend, setOpenedMovieRecommend] = useState(true);
  const [genreMovies, setGenreMovies] = useState([]);

  let dataTypes = useSelector((state) => state?.rootReducer.movieTypes)
  var movieDataGenres = [];
  useEffect(() => {
      dataTypes.slice(0, 4).map(item => {
          getMoviesByTypeAPI(item.id, async (res) => {
              if (res.status == 200) {
                  var genreMovie = {
                      id: item.id,
                      sliderTitle: item.t_name,
                      sliderMovieList: res.data.slice(0, 10)
                  }
                  setGenreMovies(genreMovies => [...genreMovies, genreMovie]);
                  movieDataGenres.push(genreMovie);
              }
              else {if (res.status == 400) {}}
          });
      });
  }, [dataTypes])

  const handleOpenChatBox = () => {
    setOpenedChatBox(!openedChatBox)
  }
  const handleOpenMovieRecommend = () => {
    setOpenedMovieRecommend(!openedMovieRecommend)
    console.log("openedMovieRecommend", openedMovieRecommend);
  }
  useEffect(() => {
    // Join room
    console.log("roomnum", roomnum);
    socket.emit("joinRoom", { username, roomnum });
    socket.emit('new room', { username, roomnum }, function(data) {
        // // This should only call back if the client is the host
        // console.log("data", data);
        if (data) {
            console.log("Host is syncing the new socket!")
            // syncVideo(roomnum)
        }
    });

  
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

          <VideoPlayer socket={socket} roomnum={roomnum}/>

          <div id="movieRecommend"
            className={`${openedMovieRecommend ? '' : 'd-none'}`}
            style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: '#242526', zIndex: 3, overflowX: 'hidden', paddingTop: '40px'}}>
              {genreMovies.map(item => (<Slider id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList} />))}
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
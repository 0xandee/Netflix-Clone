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

const GroupStreaming = ({ socket }) => {
  const [username, setusername] = useState( Math.random());
  const [roomname, setroomname] = useState("idgroup");
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
    const socket = io("localhost:8000", { transports: ["websocket"] });
    socket.emit("joinRoom", { username, roomname });
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

          <VideoPlayer/>

          <div id="movieRecommend"
            className={`${openedMovieRecommend ? '' : 'd-none'}`}
            style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: '#242526', zIndex: 3, overflowX: 'hidden', paddingTop: '40px'}}>
              {genreMovies.map(item => (<Slider id={item.id} sliderTitle={item.sliderTitle} sliderMovieList={item.sliderMovieList} />))}
          </div>

        </div>

        <div className={`group-chat-box ${!openedChatBox && 'active'}`} >

          <Chat
            username={username}
            roomname={roomname}
            socket={socket}
            handleOpenMovieRecommend={handleOpenMovieRecommend}
          />
        </div>
       

      </div>

    </div>
  )
}

export default GroupStreaming;